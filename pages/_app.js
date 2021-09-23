import "../styles/globals.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import ScholarsProvider from "../providers/ScholarsProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ScholarsProvider>
      <ChakraProvider>
        <Navbar />
        <Container maxW="container.xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ScholarsProvider>
  );
}

export default MyApp;
