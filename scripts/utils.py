import random
random.seed(42)
from typing import Tuple, List, Optional
from enum import Enum
from dataclasses import dataclass
import logging

import pandas as pd
from transformers import GPT2LMHeadModel, GPT2TokenizerFast

@dataclass
class Game:
    name: str
    developer: str
    publisher: str
    description: str
    genres: List[str]
    platforms: List[str]
    categories: List[str]
    header_img: Optional[str] # ID of the image
    screenshot_img: Optional[str] # ID of the image


class TOKENS(Enum):
    NAME = "<|name|>"
    DEVELOPER = "<|developer|>"
    PUBLISHER = "<|publisher|>"
    DESCRIPTION = "<|description|>"
    GENRES = "<|genres|>"
    GAME = "<|game|>"
    ENDOFTEXT = "<|endoftext|>"


def load_tokenizer_and_model(model_path: str, device, eval=True) -> Tuple[GPT2TokenizerFast, GPT2LMHeadModel]:
    tokenizer = GPT2TokenizerFast.from_pretrained(model_path)
    model = GPT2LMHeadModel.from_pretrained(model_path, pad_token_id=tokenizer.eos_token_id)
    model.to(device)

    if eval:
        model.eval()

    return tokenizer, model


def generate_text(tokenizer: GPT2TokenizerFast, model: GPT2LMHeadModel, start_token: str, **gen_kwargs) -> str:
    """Generate a single output of text. A different function would be needed to batch generation."""
    
    prompt_encoded = tokenizer.encode(start_token, return_tensors="pt").to(model.device)
    
    output = model.generate(
        prompt_encoded,
        do_sample=True, 
        top_k=50, 
        top_p=0.95,
        no_repeat_ngram_size=5,
        **gen_kwargs
    )
    output_decoded = tokenizer.decode(output[0])

    return output_decoded
    

def generate_game_text(tokenizer: GPT2TokenizerFast, model: GPT2LMHeadModel, dataset: pd.DataFrame) -> Game:
    game_text: str = generate_text(tokenizer, model, TOKENS.GAME.value, max_length=1000)
    logging.info(game_text)

    if not any(token.value in game_text for token in [TOKENS.GAME, TOKENS.DEVELOPER, TOKENS.PUBLISHER, TOKENS.DESCRIPTION, TOKENS.ENDOFTEXT]):
        raise ValueError(f"Tokens missing from game text: {game_text}")

    # Parse game text fields (yeah I know I could have used regex)
    name: str = game_text.split(TOKENS.GAME.value)[-1].split(TOKENS.DEVELOPER.value)[0]
    developer: str = game_text.split(TOKENS.DEVELOPER.value)[-1].split(TOKENS.PUBLISHER.value)[0]
    publisher: str = game_text.split(TOKENS.PUBLISHER.value)[-1].split(TOKENS.DESCRIPTION.value)[0]
    description: str = game_text.split(TOKENS.DESCRIPTION.value)[-1].split(TOKENS.ENDOFTEXT.value)[0]

    # Temporarily sample random fields from dataset
    sample: pd.Series = dataset.sample(1).iloc[0]
    genres: List[str] = sample.genres.split(";")
    platforms: List[str] = sample.platforms.split(";")
    categories: List[str] = sample.categories.split(";")

    return Game(
        name=name,
        developer=developer,
        publisher=publisher,
        description=description,
        genres=genres,
        platforms=platforms,
        categories=categories,
        header_img=None,
        screenshot_img=None
    )
