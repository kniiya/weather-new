import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const FuneralPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Box
          w="100%"
          h="60vh"
          bgImage="linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/funeral-temple.jpg')"
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
            bg="blackAlpha.700"
            p={8}
            borderRadius="md"
          >
            <Heading
              fontFamily="'游明朝', YuMincho, serif"
              mb={4}
              color="white"
            >
              追悼の間
            </Heading>
            <Text
              fontSize="xl"
              fontFamily="'游明朝', YuMincho, serif"
              color="white"
            >
              安らかなる時間
            </Text>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default FuneralPage;
