import * as React from 'react';
import { useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { Container } from '../components/Container';
import { NavBar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import ethereum_address from 'ethereum-address';
import axios from 'axios';
import { NETLIFY_FN_ENDPOINT } from '../constants';

export default function Redeem() {
  const [code, setCode] = useState('');
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [address, setAddress] = useState('');
  const [addressInvalid, setAddressInvalid] = useState(false);
  const redeemNFT = async () => {
    setCodeInvalid(false);
    if (!ethereum_address.isAddress(address)) {
      setAddressInvalid(true);
      return;
    }
    setAddressInvalid(false);
    try {
      const res = await axios.post(`${NETLIFY_FN_ENDPOINT}/redeem`, { code, address });

      if (res.data.address) {
        window.location.replace(`/profile/${res.data.address}`);
      }
    } catch (err: any) {
      if (err.response && err.response.status && err.response.status === 403) {
        setCodeInvalid(true);
      }
    }
  };
  return (
    <Container>
      <NavBar />
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading fontSize={'6xl'} fontWeight="400" textAlign={'center'} mt={24}>
          Redeem your NFT
        </Heading>
        <Text fontSize={'lg'} textAlign={'center'} mt="32px" maxWidth="400px">
          Redeem your NFT with a redemption code to your wallet address. Alternatively, you may reserve your NFT by
          registering an email address.
        </Text>
        <Flex direction={'column'} width="400px" mt={8} spacing={4} textAlign={'center'}>
          <FormControl isInvalid={codeInvalid}>
            <Text fontSize={'xl'} fontWeight={'600'}>
              Redemption Code
            </Text>
            <Input
              name="code"
              placeholder="B17ED8A4Q"
              fontSize={'xl'}
              size="lg"
              width="100%"
              textAlign={'center'}
              onChange={(event: any) => setCode(event.target.value)}
            />
            {codeInvalid && (
              <FormErrorMessage textAlign={'center'} fontSize={'lg'}>
                Code is invalid.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={addressInvalid}>
            <Text fontSize={'xl'} fontWeight={'600'} mt={8}>
              Wallet Address
            </Text>
            <Input
              name="address"
              placeholder="0x3cd1a2e..."
              fontSize={'xl'}
              size="lg"
              width="100%"
              textAlign={'center'}
              onChange={(event: any) => setAddress(event.target.value)}
            />
            {addressInvalid && (
              <FormErrorMessage textAlign={'center'} fontSize={'lg'}>
                Wallet address is invalid.
              </FormErrorMessage>
            )}
            <Link to="/">
              <Text fontSize={'lg'} textDecorationLine={'underline'} mt={2} mb={8}>
                What's a wallet address?
              </Text>
            </Link>
          </FormControl>

          <Button
            backgroundColor={'#0085FF'}
            color="white"
            size={'lg'}
            width="100%"
            fontWeight="500"
            fontSize="21px"
            py={7}
            disabled={address === '' || code === ''}
            onClick={redeemNFT}
          >
            Redeem
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
