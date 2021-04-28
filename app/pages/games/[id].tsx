import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FC } from "react";
import { Game } from "../../types";
import { getAllGames, getGame } from "../../util/games";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import GamePageNav from "../../components/games/page-nav";
import GameBreadcrumb from "../../components/games/breadcrumb";
import Head from "next/head";
import ScreenshotGallery from "../../components/games/screenshot-gallery";

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
  <Flex direction={{ base: "column-reverse", md: "row" }} minH="215px">
    <Box position="relative" w="60%">
      <Image
        src={`/images/headers/${gameData.header_img}.jpg`}
        layout="fill"
        objectFit="contain"
      />
    </Box>
    <ScreenshotGallery screenshots={gameData.screenshot_img} flexGrow={1} />
  </Flex>
);

type Props = {
  gameData: Game;
  releaseDate: string;
  prevId: string | null;
  nextId: string | null;
};

const GamePage: FC<Props> = ({ gameData, releaseDate, prevId, nextId }) => {
  logGameDataOnBrowser(gameData);
  console.log(releaseDate);

  return (
    <div>
      <Head>
        <title>{gameData.name} - THIS GAME DOES NOT EXIST</title>
      </Head>

      <Container maxW="4xl" px={{ base: "10px", md: "50px" }}>
        <GameBreadcrumb genre={gameData.genres[0]} name={gameData.name} />

        <Heading mb={3}>{gameData.name}</Heading>

        <GameImages gameData={gameData} />

        <Box my={5} />

        <Text>Release Date: {releaseDate}</Text>

        <p>{JSON.stringify(gameData)}</p>

        <GamePageNav my={5} prevId={prevId} nextId={nextId} />
      </Container>
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

  // Generated data does not contain release data so we generate it here
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
