import Link from "next/link";

import { Box, Flex, Container, Button } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box>
      <Container maxW="container.xl">
        <Flex mt="4" align="center">
          <Box mr="10">Axie Space Guild</Box>
          <Link href="/">
            <a>
              <Button mr="4">Leaderboard</Button>
            </a>
          </Link>
          <Link href="/manage">
            <a>
              <Button mr="4">Manage Scholar</Button>
            </a>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
