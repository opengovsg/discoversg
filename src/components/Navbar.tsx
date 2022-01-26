import * as React from 'react';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
export const NavBar = (props: any) => {
  return (
    <Flex width="100%" height="64px" flexDirection={'row'} justify="space-between" alignItems="center" px="2rem">
      <Link href="/">
        <Text fontSize="24px">discoverSG</Text>
      </Link>
      <HStack spacing={8}>
        <Link href="/redeem">
          <Text fontSize="18px">Redeem</Text>
        </Link>
        <Link href="/discover">
          <Text fontSize="18px">Discover</Text>
        </Link>
        <Link href="/">
          <Text fontSize="18px">Learn</Text>
        </Link>
        <Link href="/">
          <Text fontSize="18px">About</Text>
        </Link>
      </HStack>
      <Button
        size={'md'}
        fontWeight="500"
        fontSize="16px"
        backgroundColor={'#0085FF'}
        color="white"
        borderRadius="24px"
        onClick={() => {}}
      >
        Connect Wallet
      </Button>
    </Flex>
  );
};
