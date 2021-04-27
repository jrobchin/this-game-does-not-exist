import { FC } from "react";
import Footer from "./footer";
import Nav from "./nav";

const Layout: FC = (props) => {
  return (
    <div>
      <Nav />

      {props.children}

      <Footer />
    </div>
  );
};

export default Layout;
