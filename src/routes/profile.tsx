import * as React from 'react';
import { useEffect, useState } from 'react';
import { Heading, Box, Text, VStack, Flex, Image, SimpleGrid, Tag, TagLabel } from '@chakra-ui/react';
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
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Flex width="100%" justifyContent="start" mt={16}>
          <Heading fontSize={'5xl'} fontWeight="400">
            {`${truncatedAddress}'s Collection`}
          </Heading>
        </Flex>
        <SimpleGrid columns={[1, null, 3]} spacing="40px" mt={16}>
          {tokens &&
            tokens.map((item, index) => (
              <Box rounded={'lg'} maxW={'280px'} w={'full'} boxShadow={'lg'}>
                <Box height={'280px'}>
                  <Image rounded={'2xl'} height={280} width={280} p={2} pb={0} src={item.image} />
                </Box>
                <Box p={4} textAlign={'left'}>
                  <Heading fontSize={'xl'} fontWeight={500}>
                    {`${item.name}`}
                  </Heading>
                  <Text color={'gray.500'} fontSize={'sm'} mt={2}>
                    {item.description}
                  </Text>
                  <Tag mt={3} key={index} borderRadius="full" variant="solid" colorScheme="green" py={2} px={4}>
                    <TagLabel>{item.attributes[0].value}</TagLabel>
                  </Tag>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
}
