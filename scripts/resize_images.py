import os
import argparse

from PIL import Image


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=str, help="Input directory for images")
    parser.add_argument("output", type=str, help="Output directory for images")
    parser.add_argument("width", type=int, help="Output image width")
    parser.add_argument("height", type=int, help="Output image height")
    args = parser.parse_args()

    images: list = os.listdir(args.input)
    for image in images:
        image_fpath = os.path.join(args.input, image)
        out_path: str = os.path.join(args.output, image)

        im = Image.open(image_fpath)
        resized_im = im.resize((args.width, args.height), Image.BICUBIC)

        resized_im.save(out_path)
    




if __name__ == "__main__":
    main()