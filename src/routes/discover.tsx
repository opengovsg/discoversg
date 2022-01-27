import * as React from 'react';
import { useEffect, useState } from 'react';
import { Heading, Box, Text, VStack, Flex, Image, SimpleGrid, Tag, TagLabel } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/Navbar';
import { Container } from '../components/Container';
import axios from 'axios';
import { NETLIFY_FN_ENDPOINT } from '../constants';

export default function Profile() {
  const [highlighted, setHighlighted] = useState<any[]>([
    {
      id: 1,
      uri: 'https://ipfs.io/ipfs/QmfMQ1UWvYGwgRrHtu3qAgRutS8huZbMuYKNeiB4HjhanR',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'Esplanade Theatres',
      description: 'Visited the Esplanade Theatres',
      image: 'https://gateway.pinata.cloud/ipfs/QmUcVK3mGEnWiHT5tdA1m16JBomCB393Mo2sKYP8MijMm3',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Venues',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
    {
      id: 2,
      uri: 'https://ipfs.io/ipfs/QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'Satay by the Bay',
      description: 'Visited Satay by the Bay',
      image: 'https://gateway.pinata.cloud/ipfs/QmUytAd8WfoYRkKjLwHPwfFr7BxXMvMhbU8UFub4m8KiPD',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Eats',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
    {
      id: 3,
      uri: 'https://ipfs.io/ipfs/QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'Sentosa',
      description: 'Visited Sentosa',
      image: 'https://gateway.pinata.cloud/ipfs/QmRen2kXQ7at1Aen4CrS7inCJ9JG4LGwzNZDNzvsU4b6Tp',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Venues',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
  ]);

  const [otherNFTs, setOtherNFTs] = useState<any[]>([
    {
      id: 1,
      uri: 'https://ipfs.io/ipfs/QmfMQ1UWvYGwgRrHtu3qAgRutS8huZbMuYKNeiB4HjhanR',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'National Gallery',
      description: '',
      image: 'https://gateway.pinata.cloud/ipfs/QmdY5uyeqp5Gn6q43ZcM6VHzGiBHohcgdzT2P1q5bRSXZC',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Venues',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },

    {
      id: 3,
      uri: 'https://ipfs.io/ipfs/QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'Singapore Zoo',
      description: '',
      image: 'https://gateway.pinata.cloud/ipfs/QmVTyCUfTREjkaKVHHv9xdNjxhzJEB67TwE4L3o887ormg',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Venues',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
    {
      id: 2,
      uri: 'https://ipfs.io/ipfs/QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'Sembawang Confectionary',
      description: '',
      image: 'https://gateway.pinata.cloud/ipfs/Qmavp4MpGsPZnfWJUq5QoAYJ15JWJ8bPLF6Crq4bjhFuLF',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Eats',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
    {
      id: 4,
      uri: 'https://ipfs.io/ipfs/QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu',
      owner: '0xA00F36889e25249492f93e00852Ba183776DC747',
      name: 'National Day Parade 2022',
      description: '',
      image: 'https://gateway.pinata.cloud/ipfs/QmSYu6vre4XxqHrktwF9Ln51A1SqB4ExeeiVW8DRRZPo81',
      attributes: [
        {
          trait_type: 'Category',
          value: 'discoverSG_Events',
        },
        {
          trait_type: 'Edition',
          value: '2022',
        },
      ],
    },
  ]);

  return (
    <Container>
      <NavBar />
      <VStack spacing={7} width="100%">
        <Flex direction="column" alignItems="center" justifyContent="center" minHeight="25vh" maxWidth="80%">
          <Heading fontSize={'6xl'} fontWeight="400" textAlign={'center'}>
            Discover Singapore with NFTs
          </Heading>
          <Text fontSize={'xl'} textAlign={'center'} mt="32px" maxWidth="600px">
            Find out where you can redeem your NFTs! Here’s the list of places you can visit and redeem your NFTs. Have
            fun exploring!
          </Text>
        </Flex>
        <Flex maxWidth="80%" direction="column" alignItems="center" justifyContent="center">
          <Heading fontSize={'4xl'} fontWeight="500" textAlign={'center'}>
            Notable Drops
          </Heading>
          <SimpleGrid columns={[1, null, 3]} spacing="40px" mt={6}>
            {highlighted &&
              highlighted.map((item, index) => {
                let tagColor = '#05B88B';
                if (item.attributes[0].value === 'discoverSG_Eats') tagColor = '#417E98';
                else if (item.attributes[0].value === 'discoverSG_Events') tagColor = '#F66F23';
                return (
                  <Box rounded={'lg'} maxW={'240px'} w={'full'} boxShadow={'lg'}>
                    <Box height={'240px'}>
                      <Image rounded={'2xl'} height={240} width={240} p={2} pb={0} src={item.image} />
                    </Box>
                    <Box p={4} textAlign={'left'}>
                      <Heading fontSize={'xl'} fontWeight={500}>
                        {`${item.name}`}
                      </Heading>
                      <Text color={'gray.500'} fontSize={'sm'} mt={2}>
                        {item.description}
                      </Text>
                      <Tag
                        mt={3}
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        backgroundColor={tagColor}
                        color={'white'}
                        py={2}
                        px={4}
                      >
                        <TagLabel>{item.attributes[0].value}</TagLabel>
                      </Tag>
                    </Box>
                  </Box>
                );
              })}
          </SimpleGrid>
        </Flex>
        <Flex maxWidth="80%" direction="column" alignItems="start" justifyContent="center">
          <Heading fontSize={'3xl'} fontWeight="500" mt={12}>
            Discover more
          </Heading>
          <SimpleGrid columns={[2, null, 4]} spacing="40px" mt={8} mb={32}>
            {otherNFTs &&
              otherNFTs.map((item, index) => {
                let tagColor = '#05B88B';
                if (item.attributes[0].value === 'discoverSG_Eats') tagColor = '#417E98';
                else if (item.attributes[0].value === 'discoverSG_Events') tagColor = '#F66F23';
                return (
                  <Box rounded={'lg'} maxW={'210px'} w={'full'} boxShadow={'lg'}>
                    <Box height={'210px'}>
                      <Image rounded={'2xl'} height={210} width={210} p={2} pb={0} src={item.image} />
                    </Box>
                    <Box p={4} textAlign={'left'}>
                      <Heading fontSize={'xl'} fontWeight={500}>
                        {`${item.name}`}
                      </Heading>
                      <Text color={'gray.500'} fontSize={'sm'} mt={2}>
                        {item.description}
                      </Text>
                      <Tag
                        mt={3}
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        backgroundColor={tagColor}
                        color={'white'}
                        py={2}
                        px={4}
                      >
                        <TagLabel>{item.attributes[0].value}</TagLabel>
                      </Tag>
                    </Box>
                  </Box>
                );
              })}
          </SimpleGrid>
        </Flex>
      </VStack>
    </Container>
  );
}
