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

const GagakuLayout = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      <audio ref={audioRef} loop src="/music/gagaku.mp3" />
      <Flex as="nav" bg="white" shadow="sm" p={4}>
        <Container maxW="container.xl">
          <List display="flex" gap={8}>
            <ListItem>
              <ChakraLink as={Link} to="/" _hover={{ color: "blue.500" }}>
                Home
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink as={Link} to="/gagaku" _hover={{ color: "blue.500" }}>
                雅楽
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                as={Link}
                to="/weather_atomic"
                _hover={{ color: "blue.500" }}
              >
                Weather
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                as={Link}
                to="/funeral"
                _hover={{ color: "blue.500" }}
              >
                お通夜
              </ChakraLink>
            </ListItem>
          </List>
        </Container>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default GagakuLayout;
