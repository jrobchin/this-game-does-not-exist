import { Link, LinkProps } from "@chakra-ui/layout";
import { FC } from "react";

const HyperLink: FC<LinkProps> = ({ children, ...props }) => (
  <Link color="pink.400" {...props}>
    {children}
  </Link>
);

export default HyperLink;
