import * as React from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/Navbar';
import { Container } from '../components/Container';

export default function Profile() {
  let params = useParams();
  return (
    <Container>
      <NavBar />
      <VStack spacing={7} width="100%">
        <Flex direction="column" alignItems="center" justifyContent="center" minHeight="60vh">
          <Heading fontSize={'5xl'} fontWeight="600" textAlign={'center'}>
            Profile of {params.address}
          </Heading>
        </Flex>
      </VStack>
    </Container>
  );
}
