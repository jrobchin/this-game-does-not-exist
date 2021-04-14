"""
The purpose of this script is to generate data using the trained models to populate
the database.
"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("connection_string", help="Connection string to MongoDB instance to store generated data.")
    parser.add_argument("text_model_dir", help="Path to the directory of the text generation model.")
    parser.add_argument("header_model_pth", help="Path to the state dict of the header model.")
    parser.add_argument("screenshot_model_pth", help="Path to state dict of the screenshot model.")
    args = parser.parse_args()

    


if __name__ == "__main__":
    main()