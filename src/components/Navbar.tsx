import * as React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const NavBar = (props: any) => {
  return (
    <Flex width="100%" height="64px" flexDirection="row" justify="start" alignItems="center" px="2rem">
      <Flex height="100%" justifyContent="center" alignItems="center" fontWeight="500">
        <Text fontSize="22px" fontWeight="600">
          DiscoverSG
        </Text>
      </Flex>
    </Flex>
  );
};
