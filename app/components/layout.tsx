import { Box } from "@chakra-ui/layout";
import { FC } from "react";
import Footer from "./footer";
import Nav from "./nav";

const Layout: FC = (props) => {
  return (
    <div>
      <Nav />

      {props.children}

      <Box height="100px" />

      <Footer />
    </div>
  );
};

export default Layout;
