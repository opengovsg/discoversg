import * as React from 'react';
import { Flex, Heading, VStack, Stack, Button, Box, Input, FormLabel } from '@chakra-ui/react';
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
          <Stack mt={16} spacing={8} width={'400px'}>
            <Box>
              <FormLabel fontSize={'20px'}>Redemption Code</FormLabel>
              <Input placeholder="i.e. 1EB4AO9" size="lg" textAlign={'center'} />
            </Box>
            <Box>
              <FormLabel fontSize={'20px'}>Wallet Address</FormLabel>
              <Input placeholder="i.e. 0x1a2e04..." size="lg" textAlign={'center'} />
            </Box>
            <Button
              colorScheme="teal"
              variant="solid"
              borderRadius="8px"
              fontSize={'21px'}
              p={7}
              // onClick={}
            >
              Redeem NFT
            </Button>
          </Stack>
        </Flex>
      </VStack>
    </Container>
  );
}
