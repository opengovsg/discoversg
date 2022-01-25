import * as React from 'react';
import { Button, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { Container } from '../components/Container';
import { NavBar } from '../components/Navbar';
import { Link } from 'react-router-dom';
export default function Redeem() {
  return (
    <Container>
      <NavBar />
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading fontSize={'6xl'} fontWeight="400" textAlign={'center'} mt={24}>
          Redeem your NFT
        </Heading>
        <Text fontSize={'lg'} textAlign={'center'} mt="32px" maxWidth="400px">
          Lorem ipsum dolor sit amet? You can choose to redeem your NFT with a redemption code via your wallet or choose
          to reserve with your email.
        </Text>
        <Flex direction={'column'} width="400px" mt={8} spacing={4} textAlign={'center'}>
          <Text fontSize={'xl'} fontWeight={'600'}>
            Redemption Code
          </Text>
          <Input name="nric" placeholder="B17ED8A4Q" fontSize={'xl'} size="lg" width="100%" textAlign={'center'} />
          <Text fontSize={'xl'} fontWeight={'600'} mt={8}>
            Wallet Address
          </Text>
          <Input name="nric" placeholder="0x3cd1a2e..." fontSize={'xl'} size="lg" width="100%" textAlign={'center'} />
          <Link to="/">
            <Text fontSize={'lg'} textDecorationLine={'underline'} mt={2} mb={8}>
              What's a wallet address?
            </Text>
          </Link>
          <Button
            backgroundColor={'#0085FF'}
            color="white"
            size={'lg'}
            width="100%"
            fontWeight="500"
            fontSize="21px"
            py={7}
          >
            Redeem
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
