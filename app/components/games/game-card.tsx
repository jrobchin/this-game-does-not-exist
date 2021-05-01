import React, { FC } from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Link,
  Tag,
  VStack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Game } from "../../types";
import Image from "next/image";

const GameLink: FC<{ game: Game }> = ({ game, children, ...props }) => (
  <Link href={`/games/${game._id}`} {...props}>
    {children}
  </Link>
);

type Props = {
  game: Game;
} & BoxProps;

const GameCard: FC<Props> = ({ game, ...props }) => (
  <Box borderRadius="lg" shadow="md" overflow="hidden" p={2} {...props}>
    <Flex direction={{ base: "column", md: "row" }}>
      <Box
        w={{ base: "100%", md: "40%" }}
        minH={{ base: "150px", sm: "200px", md: "120px" }}
        position="relative"
        borderRadius="md"
        overflow="hidden"
      >
        <GameLink game={game}>
          <Image
            src={`/images/headers/${game.header_img}.jpg`}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </GameLink>
      </Box>

      <VStack alignItems="left" w={{ base: "100%", md: "60%" }} p="20px">
        <Heading fontSize="xl">
          <GameLink game={game}>{game.name}</GameLink>
        </Heading>
        <Text>
          <b>Developer:</b> {game.developer}
        </Text>
        <Text>
          <b>Publisher:</b> {game.publisher}
        </Text>
        <Wrap>
          {game.genres.map((genre, index) => (
            <WrapItem key={index}>
              <Tag>{genre}</Tag>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Flex>
  </Box>
);

export default GameCard;
