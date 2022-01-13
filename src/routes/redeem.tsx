import * as React from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { Container } from '../components/Container';
import { NavBar } from '../components/Navbar';

export default function Redeem() {
  return (
    <Container>
      <NavBar />
      <VStack spacing={7} width="100%">
        <Flex direction="column" alignItems="center" justifyContent="center" minHeight="60vh">
          <Heading fontSize={'5xl'} fontWeight="600" textAlign={'center'}>
            Redeem your NFT
          </Heading>
        </Flex>
      </VStack>
    </Container>
  );
}
