import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { FC } from "react";
import { Game } from "../../types";
import { getAllGames, getGame } from "../../util/games";
import { Box, Flex, Heading, Text, Spacer } from "@chakra-ui/react";
import GamePageNav from "../../components/games/page-nav";
import GameBreadcrumb from "../../components/games/breadcrumb";
import Head from "next/head";
import ScreenshotGallery from "../../components/games/screenshot-gallery";
import PageContainer from "../../components/page-container";

const logGameDataOnBrowser = (gameData: Game) => {
  if (typeof window !== "undefined") {
    console.log(
      "Hey, if you're interested in what the game data looks like, here it is. " +
        "\nIf you're into software development and data science, you should check out " +
        "my YouTube channel:\nhttps://www.youtube.com/channel/UCtt7TyXKcSN7_gchU4lEyRQ"
    );
    console.log(gameData);
  }
};

const GameImages: FC<{ gameData: Game }> = ({ gameData }) => (
  <Flex direction={{ base: "column", md: "row" }}>
    <Box position="relative" w={{ base: "100%" }} minH="200px" p={2}>
      <Image
        src={`/images/headers/${gameData.header_img}.jpg`}
        layout="fill"
        objectFit="contain"
      />
    </Box>
    <Spacer minW={10} minH={10} />
    <ScreenshotGallery screenshots={gameData.screenshot_img} />
  </Flex>
);

function descriptionLines(description: string): string[] {
  let lines: string[] = [];

  // Split and new line on points and dashes
  let points = description
    .split(/[\-\*•] /i)
    .map((val, index) => (index > 0 ? `- ${val}` : val));
  lines.push(...points);

  // letter-punctuation-letter should probably be a new line and point
  return lines;
}

type Props = {
  gameData: Game;
  releaseDate: string;
  prevId: string | null;
  nextId: string | null;
};

const GamePage: FC<Props> = ({ gameData, releaseDate, prevId, nextId }) => {
  logGameDataOnBrowser(gameData);

  return (
    <div>
      <Head>
        <title>{gameData.name} - THIS GAME DOES NOT EXIST</title>
      </Head>

      <PageContainer>
        <GameBreadcrumb genre={gameData.genres[0]} name={gameData.name} />

        <Heading mb={3}>{gameData.name}</Heading>

        <GameImages gameData={gameData} />

        <Flex my={5} direction={{ base: "column", md: "row" }}>
          <Box p={5} borderRadius="lg" shadow="lg" minW={{ base: 0, md: "sm" }}>
            <Text>
              <b>Release Date:</b> {releaseDate}
            </Text>
            <Text>
              <b>Developer:</b> {gameData.developer}
            </Text>
            <Text>
              <b>Publisher:</b> {gameData.publisher}
            </Text>
          </Box>

          <Spacer minW="20px" />

          <Box p={5} borderRadius="lg" shadow="lg" minW={{ base: 0, md: "sm" }}>
            <Text>
              <b>Genres:</b> {gameData.genres.join(", ")}
            </Text>
            <Text>
              <b>Platforms:</b> {gameData.platforms.join(", ")}
            </Text>
            <Text>
              <b>Categories:</b> {gameData.categories.join(", ")}
            </Text>
          </Box>
        </Flex>

        <Box my={5} />

        <Box p={5} borderRadius="lg" shadow="lg">
          <Heading size="md">About</Heading>
          {descriptionLines(gameData.description).map((line) => (
            <Text>{line}</Text>
          ))}
        </Box>

        <GamePageNav my={5} prevId={prevId} nextId={nextId} />
      </PageContainer>
    </div>
  );
};

export default GamePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const games = getAllGames();
  const paths = games.map((game) => ({
    params: { id: game._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gameData = getGame(params?.id as string);

  const games = getAllGames();
  const gameIds: string[] = games.map((value) => value._id);
  const idIndex: number = gameIds.indexOf(gameData._id);
  const prevId = gameIds[idIndex - 1] || null;
  const nextId = gameIds[idIndex + 1] || null;

  // Generated data does not contain release data so we generate it here.
  // Should be static per build though.
  const releaseDate = randomDate(new Date(1998, 0, 1), new Date());
  const releaseDateString = `${releaseDate.getDate()} ${
    MONTHS[releaseDate.getMonth()]
  }, ${releaseDate.getFullYear()}`;

  return {
    props: {
      gameData,
      releaseDate: releaseDateString,
      prevId,
      nextId,
    },
  };
};
