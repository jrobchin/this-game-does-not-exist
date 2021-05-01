import { Box } from "@chakra-ui/layout";
import React, { FC } from "react";
import Footer from "./footer";
import Nav from "./nav";
import Head from "next/head";

const Layout: FC = (props) => {
  return (
    <div>
      <Head>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/softbank/145/video-game_1f3ae.png"
        ></link>
        <title>This Game Does Not Exist</title>
      </Head>
      <Nav />
      {props.children}
      <Box height="100px" />
      <Footer />
    </div>
  );
};

export default Layout;
