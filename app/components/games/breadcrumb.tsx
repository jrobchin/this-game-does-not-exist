import React, { FC } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";

type Props = {
  genre: string;
  name: string;
} & BreadcrumbProps;

const GameBreadcrumb: FC<Props> = ({ genre, name, ...props }) => (
  <Breadcrumb
    as="div"
    display="inline-block"
    px="15px"
    py="5px"
    borderRadius="lg"
    mb="15px"
    shadow="md"
    spacing="8px"
    separator={<ChevronRightIcon color="gray.500" />}
    {...props}
  >
    <BreadcrumbItem>
      <BreadcrumbLink href="/games">All Games</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href={`/games/${genre}`}>{genre}</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink _hover={{ textDecoration: "none", cursor: "default" }}>
        {name}
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export default GameBreadcrumb;
