import * as React from 'react';
import { useEffect, useState } from 'react';
import { Heading, Box, Text, VStack, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/Navbar';
import { Container } from '../components/Container';
import ethereum_address from 'ethereum-address';
import axios from 'axios';

const NETLIFY_FN_ENDPOINT = '/.netlify/functions';

export default function Profile() {
  let params = useParams();

  const [address, setAddress] = useState();

  const [tokens, setTokens] = useState<any[]>();

  useEffect(() => {
    const getTokens = async () => {
      if (params.address && ethereum_address.isAddress(params.address)) {
        const res = await axios.get(`${NETLIFY_FN_ENDPOINT}/tokens?address=${params.address}`);
        setTokens(res.data);
      }
    };
    getTokens();
  }, []);

  const truncatedAddress = `${params.address?.slice(0, 6)}...`;
  return (
    <Container>
      <NavBar />

      <VStack spacing={7} width="100%">
        <Flex>
          <Heading fontSize={'4xl'} fontWeight="600" textAlign={'left'}>
            {`${truncatedAddress}'s Collection`}
          </Heading>
        </Flex>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {tokens &&
            tokens.map((item) => (
              <Box rounded={'lg'} maxW={'240px'} w={'full'} boxShadow={'2xl'}>
                <Box height={'230px'}>
                  <Image rounded={'lg'} height={240} width={240} src={item.image} />
                </Box>
                <Box my={0} p={4} textAlign={'center'}>
                  <Heading fontSize={'2xl'} fontWeight={500}>
                    {`${item.name} #${item.id}`}
                  </Heading>
                  <Text color={'gray.500'} fontSize={'sm'} mt={2}>
                    {item.description}
                  </Text>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
        <Flex></Flex>
      </VStack>
    </Container>
  );
}
