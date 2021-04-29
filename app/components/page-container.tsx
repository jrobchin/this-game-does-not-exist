import { Container, ContainerProps } from "@chakra-ui/layout";
import { FC } from "react";

const PageContainer: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxW="4xl" px={{ base: "10px", md: "50px" }} {...props}>
    {children}
  </Container>
);

export default PageContainer;
