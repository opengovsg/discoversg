import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Text, VStack, theme, Flex, HStack, Input, Stack } from '@chakra-ui/react';
import { App } from './App';
import Profile from './routes/profile';
import Redeem from './routes/redeem';
import Discover from './routes/discover';
import { Container } from './components/Container';
import { NavBar } from './components/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>
      <Stack maxW="100%" minHeight="calc(100vh - 64px)">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile/:address" element={<Profile />} />
            <Route path="redeem" element={<Redeem />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
