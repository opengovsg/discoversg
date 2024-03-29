import * as React from 'react';
import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Flex,
  HStack,
  Input,
  Button,
  ButtonGroup,
  Center,
  Image,
  Stack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from './components/Container';
import { NavBar } from './components/Navbar';

export const App = () => {
  const Section = (props: any) => {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center" minHeight="35vh" maxWidth="80%">
        {props.children}
      </Flex>
    );
  };

  const AttractionCard = (props: any) => {
    return (
      <Center py={12}>
        <Box maxW={'240px'} w={'full'} boxShadow={'2xl'}>
          <Box rounded={'lg'} height={'230px'}>
            <Image
              rounded={'lg'}
              height={240}
              width={240}
              src={'https://gateway.pinata.cloud/ipfs/QmPFRJQkLiHRXpdezkfKYPmfdZpW83niuLKHNBYqk9VCCV'}
            />
          </Box>
          <Box mt={4} p={4} textAlign={'center'}>
            <Heading fontSize={'2xl'} fontWeight={500}>
              Art Science Museum
            </Heading>
            <Text color={'gray.500'} fontSize={'sm'}>
              Lorem ipsum dolor sit amet, consectet
            </Text>
          </Box>
        </Box>
      </Center>
    );
  };

  return (
    <Container>
      <NavBar />
      <VStack spacing={7} width="100%">
        <Flex direction="column" alignItems="center" justifyContent="center" minHeight="30vh" maxWidth="80%">
          <Box width={'100%'}>
            <Image src="/images/landing.png" alt="Discover Redeem Collect" />
          </Box>
        </Flex>
        <Section>
          <Heading fontSize={'4xl'} fontWeight="400" textAlign={'center'}>
            What is discoverSG?
          </Heading>
          <Text fontSize={'xl'} textAlign={'center'} mt="32px" maxWidth="600px">
            DiscoverSG’s vision is to create a more tangible connection between local establishments and our citizens
            while giving government agencies a platform to build digital campaigns on in the future, to boost footfalls
            to any place in Singapore.
          </Text>
          <Link to="/redeem">
            <Button
              mt="24px"
              backgroundColor={'#0085FF'}
              color="white"
              size={'lg'}
              borderRadius="24px"
              fontWeight="500"
              fontSize="18px"
            >
              Discover
            </Button>
          </Link>
        </Section>
        <Section>
          <Heading fontSize={'4xl'} fontWeight="400" textAlign={'center'}>
            What is an NFT?
          </Heading>
          <Text fontSize={'xl'} textAlign={'center'} mt="32px" maxWidth="600px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae fringilla ante. Curabitur nec consectetur
            nisl. Vestibulum ac commodo dui, ac imperdiet est. In hac habitasse platea dictumst. Vivamus mollis ut
            tortor eu cursus. Etiam hendrerit lorem quis mi tincidunt consequat. Let’s demistify NFT and cryptocurrency!
          </Text>
          <Link to="/redeem">
            <Button
              mt="24px"
              backgroundColor={'#0085FF'}
              color="white"
              size={'lg'}
              borderRadius="24px"
              fontWeight="500"
              fontSize="18px"
            >
              Learn more
            </Button>
          </Link>
        </Section>
        <Section>
          <Heading fontSize={'4xl'} fontWeight="400" textAlign={'center'}>
            Get started in a few minutes
          </Heading>
          <Text fontSize={'xl'} textAlign={'center'} mt="32px" maxWidth="600px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Box width={'100%'} mt="32px">
            <Image src="/images/gettingstarted.png" alt="Getting started" />
          </Box>
        </Section>
      </VStack>
    </Container>
  );
};
