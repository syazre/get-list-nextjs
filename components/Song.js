import { ListItem, Image, Flex, Text, Stack, Heading } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useTable } from 'react-table';

const Song = ({ customerId, FullName, email, KWAccountStatus, CSAccountStatus }) => (
  <ListItem
    p = {5}
    my={2}
    bg='white'
  >
      <Flex as='a'>
          <Heading size='lg' fontWeight='500'>
            {FullName} 
          </Heading>
      </Flex>
  </ListItem>
);

export default Song;
