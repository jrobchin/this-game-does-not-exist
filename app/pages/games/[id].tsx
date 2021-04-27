import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FC } from "react";
import { Game } from "../../types";
import { getAllGames, getGame } from "../../util/games";

const GamePage: FC<{ gameData: Game }> = ({ gameData }) => {
  return (
    <div>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gameData = getGame(params?.id as string);
  return {
    props: {
      gameData,
    },
  };
};
