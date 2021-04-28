import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CenterProps,
  Flex,
  Link,
  LinkProps,
  Spacer,
} from "@chakra-ui/layout";
import { FC } from "react";

const NavLink: FC<LinkProps> = ({ children, ...props }) => (
  <Link fontWeight={800} color="gray.800" {...props}>
    {children}
  </Link>
);

const GamePageNav: FC<{ prevId: string; nextId: string } & CenterProps> = ({
  prevId,
  nextId,
  ...props
}) => (
  <Center {...props}>
    <Box
      paddingY={3}
      paddingX={10}
      w={{ base: "100%", md: "60%" }}
      marginBottom={5}
      borderRadius="md"
    >
      <Flex spacing="30px">
        <NavLink href={`/games/${prevId}`}>
          <ChevronLeftIcon paddingBottom={1} /> Previous
        </NavLink>
        <Spacer />
        <NavLink href={`/games/${nextId}`}>
          Next <ChevronRightIcon paddingBottom={1} />
        </NavLink>
      </Flex>
    </Box>
  </Center>
);

export default GamePageNav;
