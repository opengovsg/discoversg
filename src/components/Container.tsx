import * as React from 'react';
import { Flex } from '@chakra-ui/react';

export const Container = (props: any) => {
  return (
    <Flex minHeight="100vh" direction="column" justifyContent="start" alignItems="center">
      <Flex
        width="100%"
        maxWidth="1200px"
        justifyContent="center"
        alignItems="center"
        direction="column"
        bg="base.100"
        color="primary.600"
        {...props}
      />
    </Flex>
  );
};
