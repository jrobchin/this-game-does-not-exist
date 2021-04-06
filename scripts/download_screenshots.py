"""
This script is used to download the header images from the dataset. Downloaded images are named with the app ID
they are associated with. 
"""

import os
import json
import shutil
import logging
import argparse
import threading
import concurrent.futures
import queue
from typing import List

import requests
import pandas as pd
from tqdm import tqdm


logging.basicConfig(filename="download_screenshots.log", filemode="w", level=logging.INFO)


def worker(queue: queue.Queue, stop_event: threading.Event, dest_dir: str):
    logging.info("WORKER: Starting worker...")
    while not queue.empty() or not stop_event.is_set():
        try:
            appid, screenshots = queue.get()
        except Exception as e:
            logging.error(f"WORKER: Failed to get")

        try:
            screenshots_formatted = screenshots.replace("'", "\"")
            screenshots_list = json.loads(screenshots_formatted)
        except Exception as e:
            logging.error(f"WORKER: Failed to parse JSON: {e}")

        logging.info(f"WORKER: Downloading {len(screenshots_list)} screenshots for {appid}")

        for screenshot in screenshots_list:
            sc_id = screenshot["id"]
            img_url = screenshot["path_thumbnail"]

            logging.info(f"WORKER: Downloading {appid} from {img_url}..")
            try:
                fpath: str = download_image(dest_dir, appid, sc_id, img_url)
                logging.info(f"WORKER: Successfully downloaded image for {appid} at {img_url} to {fpath}.")
            except Exception as e:
                logging.error(f"WORKER: Unable to download image for {appid} with url {img_url} due to exception: {e}.")


def download_image(dest_dir: str, appid: str, screenshotid: str, img_url: str) -> str:
    fpath = os.path.join(dest_dir, f"{appid}-{screenshotid}.jpg")

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
    logging.info("MAIN: Reading dataset...")
    dataset = pd.read_csv(args.dataset_path)
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.nworkers) as executor:
        dl_queue = queue.Queue(maxsize=20)
        stop_event = threading.Event()

        logging.info("MAIN: Submitting workers...")
        for _ in range(args.nworkers):
            executor.submit(worker, dl_queue, stop_event, args.dest_dir)

        logging.info("MAIN: Queuing jobs...")
        for _, row in tqdm(dataset.iterrows(), total=len(dataset)):
            appid = row.steam_appid
            screenshots = row.screenshots

            logging.info(f"MAIN: Queued {appid}")

            dl_queue.put((appid, screenshots))

        stop_event.set() 


if __name__ == "__main__":
    main()
