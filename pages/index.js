import { List, Heading } from '@chakra-ui/core';

import Client from '../components/Client';

export const getStaticProps = async () => {

  const res = await fetch('https://syazre.free.beeceptor.com/my/api/client');
  const client = await res.json();
  


  return {
    props: {
      clients: client
    }
  }
}

const Clients = ({clients}) => {
  return (
    <>
    <Heading mt={8} mb={4} fontWeight='800'>My Client</Heading>
    <List>
      {clients.map(client => (
        <Client key={client.customerId} {...client} />
      ))}
    </List>
    </>
  );
}


export default Clients;
