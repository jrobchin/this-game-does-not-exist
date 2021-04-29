import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, ButtonGroup, StackProps, VStack } from "@chakra-ui/react";

type Props = {
  screenshots: string[];
} & StackProps;

const ScreenshotGallery: FC<Props> = ({ screenshots, ...props }) => {
  const [isCycling, setIsCycling] = useState(true);
  const [currScreenshot, setCurrScreenshot] = useState(0);

  useEffect(() => {
    if (!isCycling) return;

    const timeout = setTimeout(() => {
      setCurrScreenshot((currScreenshot + 1) % screenshots.length);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currScreenshot]);

  return (
    <VStack {...props}>
      <Box position="relative" minH="300px" minW="300px" h="90%" w="100%">
        <Image
          src={`/images/screenshots/${screenshots[currScreenshot]}.jpg`}
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <ButtonGroup variant="outline" isAttached>
        {screenshots.map((_, index) => (
          <Button
            key={index}
            h="20px"
            fontSize="sm"
            variant={index === currScreenshot ? "solid" : "outline"}
            onClick={() => {
              setIsCycling(false);
              setCurrScreenshot(index);
            }}
          >
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>
    </VStack>
  );
};

export default ScreenshotGallery;
