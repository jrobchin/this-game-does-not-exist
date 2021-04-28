import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FC } from "react";
import { Game } from "../../types";
import { getAllGames, getGame } from "../../util/games";
import { Container } from "@chakra-ui/react";
import GamePageNav from "./page-nav";

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

type Props = {
  gameData: Game;
  prevId: string | null;
  nextId: string | null;
};

const GamePage: FC<Props> = ({ gameData, prevId, nextId }) => {
  logGameDataOnBrowser(gameData);

  return (
    <Container maxW="4xl">
      <p>{JSON.stringify(gameData)}</p>
      <Image
        src={`/images/headers/${gameData.header_img}.jpg`}
        width="460"
        height="215"
      />
      {gameData.screenshot_img.map((img, index) => {
        return (
          <Image
            src={`/images/screenshots/${img}.jpg`}
            width="255"
            height="169"
            key={index}
          />
        );
      })}
      <GamePageNav marginY={5} prevId={prevId} nextId={nextId} />
    </Container>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gameData = getGame(params?.id as string);

  const games = getAllGames();
  const gameIds: string[] = games.map((value) => value._id);
  const idIndex: number = gameIds.indexOf(gameData._id);
  const prevId = gameIds[idIndex - 1] || null;
  const nextId = gameIds[idIndex + 1] || null;

  return {
    props: {
      gameData,
      prevId,
      nextId,
    },
  };
};
