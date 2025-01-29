import React, { useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";

const FuneralLayout = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <Box minH="100vh" bg="gray.900" color="white">
      <audio ref={audioRef} loop src="/music/funeral.mp3" />
      <Flex as="nav" bg="blackAlpha.400" p={4}>
        <Container maxW="container.xl">
          <List display="flex" gap={8}>
            <ListItem>
              <ChakraLink as={Link} to="/gagaku" _hover={{ color: "gray.300" }}>
                雅楽へ戻る
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                as={Link}
                to="/funeral"
                _hover={{ color: "gray.300" }}
              >
                追悼
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                as={Link}
                to="/weather"
                _hover={{ color: "gray.300" }}
              >
                Weather
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                as={Link}
                to="/weather2"
                _hover={{ color: "gray.300" }}
              >
                Weather2
              </ChakraLink>
            </ListItem>
          </List>
        </Container>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default FuneralLayout;
