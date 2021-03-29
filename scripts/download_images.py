"""
This script is used to download the header images from the dataset. Downloaded images are named with the app ID
they are associated with. 
"""

import os
import shutil
import logging
import argparse
import threading
import concurrent.futures
import queue

import requests
import pandas as pd


logging.basicConfig(filename="download_images.log", filemode="w", level=logging.INFO)


def worker(queue: queue.Queue, stop_event: threading.Event, dest_dir: str):
    logging.info(f"Starting worker...")
    while not queue.empty() and not stop_event.is_set():
        appid, img_url = queue.get()
        logging.info(f"Downloading {appid} from {img_url}...")
        try:
            fpath: str = download_image(dest_dir, appid, img_url)
            logging.info(f"Successfully downloaded image for {appid} at {img_url} to {fpath}.")
        except Exception as e:
            logging.error(f"Unable to download image for {appid} with url {img_url} due to exception: {e}.")


def download_image(dest_dir: str, appid: str, img_url: str) -> str:
    fpath = os.path.join(dest_dir, f"{appid}.jpg")

    r = requests.get(img_url, stream=True)

    r.raw.decode_content = True
    with open(fpath, 'wb') as f:
        shutil.copyfileobj(r.raw, f)
    
    return fpath


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset_path", help="Path to the dataset CSV to download images for.")
    parser.add_argument("dest_dir", help="Path to the directory to save the images to.")
    parser.add_argument("--nworkers", default=4, help="The number of workers to download asynchronously.")
    args = parser.parse_args()

    # Read the dataset file    
    logging.info("Reading dataset...")
    dataset = pd.read_csv(args.dataset_path)
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.nworkers) as executor:
        dl_queue = queue.Queue(maxsize=20)
        stop_event = threading.Event()

        logging.info("Submitting workers...")
        for _ in range(args.nworkers):
            executor.submit(worker, dl_queue, stop_event, args.dest_dir)

        logging.info("Queuing jobs...")
        for _, row in dataset.iterrows():
            appid = row.appid
            img_url = row.header_image
            
            logging.info(f"Queued {appid} {img_url}")

            dl_queue.put((appid, img_url))

        stop_event.set() 


if __name__ == "__main__":
    main()
