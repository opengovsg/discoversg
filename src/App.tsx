import * as React from 'react';
import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Flex,
  HStack,
  Input,
  Link,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

export const App = () => {

  return (
    <ChakraProvider theme={theme}>
      {/* Navbar */}
      <Flex
        width="100%"
        height="64px"
        flexDirection="row"
        justify="start"
        alignItems="center"
        px="2rem"
      >
        <Flex height="100%" justifyContent="center" alignItems="center" fontWeight="500">
          <Text fontSize="22px" fontWeight="600">
            DiscoverSG
          </Text>
        </Flex>
      </Flex>
      {/* Main */}
      <Flex minH="80vh" mt={5} p={3} spacing={8} justifyContent="center">
        <VStack spacing={7} flex={1} maxWidth="400px">
          <Box fontSize="20px" width="100%" maxWidth="320px">
            <Input
              placeholder="Enter a username i.e. 0xAlice"
              size="lg"
              variant="flushed"
              fontSize="22px"
              textAligh="center"
            />
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};
