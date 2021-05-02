import {
  Box,
  Code,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";
import HyperLink from "../components/hyperlink";
import PageContainer from "../components/page-container";

const Home: FC = () => {
  return (
    <div>
      <PageContainer mt={10}>
        <VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={5} rowGap={10}>
            {/* INTRO */}
            <Heading textAlign="center">THIS GAME DOES NOT EXIST</Heading>
            <Text py={4}>
              THIS GAME DOES NOT EXIST is an experiment in generative artificial
              intelligence. This site contains 130 video game pages that were
              generated using an implementation of OpenAI's{" "}
              <HyperLink href="https://openai.com/blog/better-language-models/">
                Generative Pre-trained Transformer 2 (GPT-2)
              </HyperLink>{" "}
              to generate text and a simple implementation of generative
              adversarial networks (GAN) to generate header images and
              "screenshots".
            </Text>

            {/* GENERATING TEXT */}
            <Box>
              <Heading textAlign="center" mb={2}>
                Generating Text
              </Heading>
              <Box position="relative" h="120px" w="100%">
                <Image
                  src="/images/gpt-2.gif"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </Box>
              <Text fontSize="xs">
                <i>
                  From Jay Alammar's{" "}
                  <HyperLink href="https://jalammar.github.io/illustrated-gpt2/">
                    The Illustrated GPT-2 (Visualizing Transformer Language
                    Models)
                  </HyperLink>
                </i>
              </Text>
            </Box>
            <Box py={4}>
              To generate the names, descriptions, publishers, and developers of
              the games I finetuned the{" "}
              <HyperLink href="https://huggingface.co/transformers/index.html">
                HuggingFace
              </HyperLink>{" "}
              implementation of GPT-2. I used the{" "}
              <HyperLink href="https://www.kaggle.com/nikdavis/steam-store-games">
                Steam Store Games (Clean dataset)
              </HyperLink>{" "}
              from Kaggle with slight modifications and preprocessing.
              <Spacer my={2} />
              Here is what one training sample looks like:
              <Spacer my={2} />
              <Text fontSize="sm" fontStyle="italic">
                <Code>
                  {
                    "<|game|><|name|>Half-Life<|developer|>Valve <|publisher|>Valve<|description|>Named Game of the Year by over 50 publications, Valve's debut title blends action and adventure with award-winning technology to create a frighteningly realistic world where players must think to survive. Also includes an exciting multiplayer mode that allows you to play against friends and enemies around the world.<|endoftext|>"
                  }
                </Code>
              </Text>
              <Spacer my={2} />
              The model uses the tokens (e.g. <Code>{"<|game|>"}</Code> and{" "}
              <Code>{"<|description|>"}</Code>) to prompt each class of data
              while keeping context during the entire generation.
            </Box>

            {/* GENERATING TEXT */}
            <Box>
              <Heading textAlign="center" mb={2}>
                Generating Images
              </Heading>
              <Box position="relative" h="200px" w="100%">
                <Image
                  src="/images/nvidiafacegan.gif"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </Box>
              <Text fontSize="xs">
                <i>
                  NVIDIA's celebrity face GAN from{" "}
                  <HyperLink href="https://research.nvidia.com/publication/2017-10_Progressive-Growing-of">
                    Progressive Growing of GANs for Improved Quality, Stability,
                    and Variation
                  </HyperLink>
                </i>
              </Text>
              <Spacer py={2} />
              <Box position="relative" h="170px" w="100%">
                <Image
                  src="/images/halflifeheader.jpg"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </Box>
              <Text fontSize="xs">
                <i>
                  The header image of Valve's{" "}
                  <HyperLink href="https://store.steampowered.com/app/70/HalfLife/">
                    Half-Life
                  </HyperLink>
                </i>
              </Text>
              <Spacer py={2} />
              <Box position="relative" h="200px" w="100%">
                <Image
                  src="/images/headers/760503582b2b410caefc7b622f9a0a19.jpg"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </Box>
              <Text fontSize="xs">
                <i>
                  One of the headers that my model generated, looking to draw
                  "text" in the header.
                </i>
              </Text>
            </Box>
            <Box py={4}>
              Image generation was done by training a custom GAN very similar to
              the architecture seen in the PyTorch{" "}
              <HyperLink href="https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html">
                DCGAN Tutorial
              </HyperLink>{" "}
              which was built to generate faces. I created two models for this
              site: one for generating the header images and one for generating
              multiple screenshots for each game.
              <Spacer my={2} />
              To assemble the dataset I wrote a script that downloads the images
              from the URLs in the{" "}
              <HyperLink href="https://www.kaggle.com/nikdavis/steam-store-games">
                Steam Store Games (Clean dataset)
              </HyperLink>{" "}
              dataset.
              <Spacer my={2} />
              Due to my lack of resources and time to put into this project, the
              image generation is less than ideal. You may notice though, that
              the header image model will generate artifacts in images that look
              like the titles of games, and the screenshot image model with
              generate what looks like levels of a 2D platformer.
            </Box>
          </SimpleGrid>
          <Text fontSize="sm" p={5} fontStyle="italic">
            <b>DISCLAIMER:</b> I have not reviewed 99% of the model's output.
            Although unlikely, it is possible that offensive or triggering
            material may be found in the generated descriptions of the games.
            Please be aware of this when browsing the games and read at your own
            risk.
          </Text>
        </VStack>
      </PageContainer>
    </div>
  );
};

export default Home;
