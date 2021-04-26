import { FC } from "react";
import { Box, Link } from "@chakra-ui/react";

const Layout: FC = (props) => {
  return (
    <div>
      {props.children}
      <Box
        position="fixed"
        left={0}
        bottom={0}
        width="100%"
        textAlign="center"
        padding={5}
        borderTop="1px"
        borderTopColor="grey"
      >
        <span>
          Made with {"<"}3 by{" "}
          <Link
            href="https://www.youtube.com/channel/UCtt7TyXKcSN7_gchU4lEyRQ"
            isExternal
            color="pink.500"
          >
            Jason Chin
          </Link>
          . Find the code{" "}
          <Link href="https://github.com/jrobchin" isExternal color="cyan.500">
            here
          </Link>
          .
        </span>
      </Box>
    </div>
  );
};

export default Layout;
