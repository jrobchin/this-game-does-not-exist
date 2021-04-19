"""
The purpose of this script is to generate data using the trained models to populate
the database.
"""

import argparse
import logging
from dataclasses import asdict

from pymongo import MongoClient
import pandas as pd

from scripts.utils import load_tokenizer_and_model, generate_game_text, Game

logging.basicConfig(filename="generate_database.log", filemode="w", level=logging.INFO)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("text_model_dir", help="Path to the directory of the text generation model.")
    parser.add_argument("--sample_data", "-d", default="data/steam/steam.csv", help="Path to sample data.")
    parser.add_argument("--max_games", "-m", default=100, help="The target number of games to generate in the database.")
    parser.add_argument("--connection_string", "-s", default="mongodb://localhost:27017/", help="Connection string to MongoDB instance to store generated data.")
    parser.add_argument("--dbname", default="tgdne", help="The name of the database to use.")
    parser.add_argument("--collectionname", "-c", default="games", help="The name of the collection to insert records to.")
    args = parser.parse_args()

    # Connect to MongoDB
    client = MongoClient(args.connection_string)
    db = client[args.dbname]
    coll = db[args.collectionname]
    logging.info("Connected to database")

    logging.info(f"Documents in database: {coll.count_documents(filter={})}")

    # Load all models
    tokenizer, text_model = load_tokenizer_and_model(args.text_model_dir)
    logging.info("Loaded tokenizer and model")

    # Generate games and insert into database
    sample_data: pd.DataFrame = pd.read_csv(args.sample_data)
    num_games = coll.count_documents(filter={})
    while num_games < args.max_games:
        logging.info(f"Number of games: {num_games}")

        game: Game = generate_game_text(tokenizer, text_model, sample_data)
        game_dict: dict = asdict(game)

        logging.info(f"Game generated: {game}")

        coll.insert_one(game_dict)

        num_games = coll.count_documents(filter={})





if __name__ == "__main__":
    main()