import os
import uuid
import argparse
import logging

import numpy as np
import torch
from pymongo import MongoClient
from PIL import Image

from scripts.utils import generate_header, HeaderGenerator, torch_device


logging.basicConfig(filename="generate_header.log", filemode="w", level=logging.INFO)


def get_game_without_header(coll) -> dict:
    return coll.find_one({"header_img": None})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("generator_state_dict", help="Path to state dict for generator.")
    parser.add_argument("output", help="Output directory of header images.")
    parser.add_argument("--ngpu", default=1, help="The number of GPUs on the system.")
    parser.add_argument("--connection_string", "-s", default="mongodb://localhost:27017/", help="Connection string to MongoDB instance to store generated data.")
    parser.add_argument("--dbname", default="tgdne", help="The name of the database to use.")
    parser.add_argument("--collectionname", "-c", default="games", help="The name of the collection to insert records to.")
    args = parser.parse_args()

    # Load model
    model = HeaderGenerator(args.ngpu).to(torch_device)
    model.load_state_dict(torch.load(args.generator_state_dict))
    model.eval()
    logging.info("Loaded model")

    # Connect to db
    client = MongoClient(args.connection_string)
    db = client[args.dbname]
    coll = db[args.collectionname]
    logging.info("Connected to database")

    # Get a list of documents without headers
    game = get_game_without_header(coll)
    while game is not None:
        header_id: str = uuid.uuid4().hex
        out_path: str = os.path.join(args.output, header_id + ".jpg")

        header_image: Image = generate_header(model)
        header_image.save(out_path)

        logging.info(f"Generated header: {game['_id']}, {out_path}")
        
        game["header_img"] = header_id
        coll.replace_one({"_id": game["_id"]}, game)

        game = get_game_without_header(coll)
    

if __name__ == "__main__":
    main()