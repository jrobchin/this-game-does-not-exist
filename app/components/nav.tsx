import { FC } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Spacer,
  BoxProps,
  VStack,
  Divider,
  useDisclosure,
  Collapse,
  LinkProps,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const NavLink: FC<{ to?: string } & LinkProps> = ({
  children,
  to = "/",
  ...props
}) => (
  <Link href={to} fontWeight={600} paddingX={5} {...props}>
    {children}
  </Link>
);

const NavToggle: FC<{ toggle: () => void; isOpen: boolean } & BoxProps> = ({
  toggle,
  isOpen,
  ...props
}) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle} {...props}>
    {isOpen ? <CloseIcon /> : <AddIcon />}
  </Box>
);

const MobileNav: FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Flex padding={5} alignItems="center">
        <Link href="/" fontSize="md" fontWeight={600} color="gray.600">
          THIS GAME DOES NOT EXIST
        </Link>
        <Spacer />
        <NavToggle toggle={onToggle} isOpen={isOpen} paddingX={5} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <VStack marginBottom={5}>
          <NavLink to="/games" color="gray.600">
            VIEW ALL GAMES
          </NavLink>
          <Box paddingY={2} w="100%">
            <Divider />
          </Box>
          <NavLink
            to="https://www.youtube.com/channel/UCtt7TyXKcSN7_gchU4lEyRQ"
            color="red.500"
          >
            YouTube
          </NavLink>
          <NavLink to="https://github.com/jrobchin/tgdne" color="gray.600">
            Code
          </NavLink>
        </VStack>
      </Collapse>
    </Box>
  );
};

const DesktopNav: FC = () => (
  <Flex display={{ base: "none", md: "flex" }} my={5}>
    <HStack>
      <NavLink color="gray.600">THIS GAME DOES NOT EXIST</NavLink>
      <NavLink to="/games" color="gray.600">
        VIEW ALL GAMES
      </NavLink>
    </HStack>
    <Spacer />
    <HStack>
      <NavLink
        to="https://www.youtube.com/channel/UCtt7TyXKcSN7_gchU4lEyRQ"
        color="red.500"
      >
        YouTube
      </NavLink>
      <NavLink to="https://github.com/jrobchin/tgdne" color="gray.600">
        Code
      </NavLink>
    </HStack>
  </Flex>
);

const Nav: FC = () => {
  return (
    <Container maxW="4xl">
      <DesktopNav />
      <MobileNav />
    </Container>
  );
};

export default Nav;
