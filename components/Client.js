import { List, ListItem, Image, Flex, Text, Stack, Heading } from '@chakra-ui/core';
import { getClientbyId } from "../lib/api";
import NextLink from 'next/link';
import { useTable } from 'react-table';


const Client = ({ id, name}) => (
  <ListItem
    p = {5}
    my={2}
    bg='white'
  >
      <Flex as='a'>
          <Heading size='lg' fontWeight='500'>
            {id} - {name}
          </Heading>
      </Flex>
      
      
  </ListItem>
);

export default Client;
