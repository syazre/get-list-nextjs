import { ListItem, Image, Flex, Text, Stack, Heading } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useTable } from 'react-table';

/* export const getStaticProps = async () => {

  const res = await fetch('https://syazre.free.beeceptor.com/my/api/client/' + {customerId});
  const clientListRes = await res.json();



  return {
    props: {
      clientsList: clientListRes
    }
  }
} */

const Client = ({ customerId, FullName, email, KWAccountStatus, CSAccountStatus }) => (
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
      <Text>{email}</Text>
      <Text>{KWAccountStatus}</Text>
      <Text>{CSAccountStatus}</Text>
  </ListItem>
);

export default Client;
