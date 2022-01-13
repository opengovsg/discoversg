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

export const App = () => {
  const Section = (props: any) => {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center" minHeight="60vh" maxWidth="80%">
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

  const FAQs = () => {
    return (
      <Accordion defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left" fontSize={'21px'} fontWeight={'500'}>
              What is the idea behind DiscoverSG?
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left" fontSize={'21px'} fontWeight={'500'}>
              Are DiscoverSG NFTs environmentally-friendly?
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left" fontSize={'21px'} fontWeight={'500'}>
              Are DiscoverSG NFTs environmentally-friendly?
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left" fontSize={'21px'} fontWeight={'500'}>
              Are DiscoverSG NFTs environmentally-friendly?
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <VStack spacing={7} width="100%">
      <Section>
        <Text fontSize={'6xl'} fontWeight="600" textAlign={'center'}>
          Welcome to DiscoverSG
        </Text>
        <Text fontSize={'3xl'} textAlign={'center'} mt="48px">
          A collection of uniquely Singaporean NFTs that can only be redeemed by exploring local attractions!
        </Text>
        <ButtonGroup variant="solid" colorScheme="teal" mt={'48px'}>
          <HashLink to="#attractions">
            <Button
              variant="outline"
              borderRadius="8px"
              fontSize={'21px'}
              p={8}
              mr={6}
              // onClick={}
            >
              View Attractions
            </Button>
            <Button
              borderRadius="8px"
              fontSize={'21px'}
              p={8}
              // onClick={}
            >
              Redeem NFT
            </Button>
          </HashLink>
        </ButtonGroup>
      </Section>
      <Section>
        <Heading fontSize={'5xl'} fontWeight="600" textAlign={'center'}>
          About DiscoverSG
        </Heading>
        <Text fontSize={'2xl'} textAlign={'center'} mt="48px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at efficitur tortor. Donec et tempus odio.
          Pellentesque consequat, nulla in finibus volutpat, tortor felis porta purus, nec gravida erat tortor at metus.
          Nunc ac molestie libero. Maecenas eros leo, vestibulum in elementum in, aliquam eu enim. Aenean sed lacus
          arcu. Pellentesque non accumsan odio. Vivamus augue lorem, consequat cursus ultrices a, varius vel lacus.
          Pellentesque fermentum eget arcu eget volutpat. Etiam sed rhoncus massa. Maecenas et pharetra justo.
        </Text>
      </Section>
      <Section>
        <Heading fontSize={'5xl'} fontWeight="600" textAlign={'center'} id="attractions">
          Attractions
        </Heading>

        <HStack spacing={16} mt={12}>
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
        </HStack>
      </Section>
      <Section>
        <Heading fontSize={'5xl'} fontWeight="600" textAlign={'center'}>
          FAQs
        </Heading>
        <FAQs />
      </Section>
      {/* <Link to="/profile">Profile</Link>
        <Link to="/redeem">Redeem</Link> */}
    </VStack>
  );
};
