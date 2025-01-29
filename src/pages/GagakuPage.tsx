import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const GagakuPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Box
          w="100%"
          h="60vh"
          bgImage="url('/images/temple-garden.jpg')"
          bgSize="cover"
          bgPosition="center"
          borderRadius="lg"
          position="relative"
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            bg="blackAlpha.600"
            p={8}
            borderRadius="md"
          >
            <Heading
              fontFamily="'游明朝', YuMincho, serif"
              mb={4}
              textColor={"white"}
            >
              雅楽の世界へようこそ
            </Heading>
            <Text
              fontSize="xl"
              fontFamily="'游明朝', YuMincho, serif"
              textColor={"white"}
            >
              古来より伝わる日本の伝統音楽
            </Text>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default GagakuPage;
