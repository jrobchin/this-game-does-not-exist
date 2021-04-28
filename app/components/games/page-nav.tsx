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

type Props = {
  prevId: string | null;
  nextId: string | null;
} & CenterProps;

const GamePageNav: FC<Props> = ({ prevId, nextId, ...props }) => (
  <Center {...props}>
    <Box
      py={3}
      px={10}
      w={{ base: "100%", md: "60%" }}
      mb={5}
      borderRadius="md"
    >
      <Flex spacing="30px">
        {prevId ? (
          <NavLink href={`/games/${prevId}`}>
            <ChevronLeftIcon paddingBottom={1} /> Previous
          </NavLink>
        ) : (
          ""
        )}
        <Spacer />
        {nextId ? (
          <NavLink href={`/games/${nextId}`}>
            Next <ChevronRightIcon paddingBottom={1} />
          </NavLink>
        ) : (
          ""
        )}
      </Flex>
    </Box>
  </Center>
);

export default GamePageNav;
