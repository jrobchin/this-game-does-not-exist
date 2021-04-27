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
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const NavLink: FC<{ to?: string }> = ({ children, to = "/", ...props }) => (
  <Link href={to} fontWeight={600} marginY={5} paddingX={5} {...props}>
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
        <Link href="/" fontSize="md" fontWeight={600}>
          THIS GAME DOES NOT EXIST
        </Link>
        <Spacer />
        <NavToggle toggle={onToggle} isOpen={isOpen} paddingX={5} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <VStack marginBottom={5}>
          <Link>VIEW ALL GAMES</Link>
          <Box paddingY={2} w="100%">
            <Divider />
          </Box>
          <Link>YouTube</Link>
          <Link>Source Code</Link>
        </VStack>
      </Collapse>
    </Box>
  );
};

const DesktopNav: FC = () => (
  <Flex display={{ base: "none", md: "flex" }}>
    <HStack>
      <NavLink>THIS GAME DOES NOT EXIST</NavLink>
      <NavLink to="/games">VIEW ALL GAMES</NavLink>
    </HStack>
    <Spacer />
    <HStack>
      <NavLink to="https://www.youtube.com/channel/UCtt7TyXKcSN7_gchU4lEyRQ">
        YouTube
      </NavLink>
      <NavLink to="https://github.com/jrobchin/tgdne">Code</NavLink>
    </HStack>
  </Flex>
);

const Nav: FC = () => {
  return (
    <Container maxW="6xl">
      <DesktopNav />
      <MobileNav />
    </Container>
  );
};

export default Nav;
