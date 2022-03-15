import { List, Heading, Link, ListItem, Text} from '@chakra-ui/core';

import Client from '../components/Client';

export const getServerSideProps = async () => {

  const res = await fetch('https://swapi.dev/api/people');
  const data = await res.json();
  
  return {
    props: {
      data
    }
  }
}



const Clients = ({data}) => {
  return (
    <>
    <List>
      {data.results.map((result) => (
        <ListItem key={result.episode_id} className="column" mb={4}>
            <Heading>{result.name}</Heading>
            <List>
              {result.films.map((film, index) => (
                <ListItem key={index}>
                  <Text>{index + 1 }. {film}</Text>
                </ListItem>
                ))}
            </List>
        </ListItem>
      ))}
    </List>
    {/* <Heading mt={8} mb={4} fontWeight='800'>My Client</Heading>
    <Heading>
      {clients.results.map(client => (
        <ListItem key={client.id}
          p = {5}
          my={2}
          bg='white'
        >
            <Flex as='a'>
                <Heading size='lg' fontWeight='500'>
                  {client.name} 
                </Heading>
            </Flex>
            
            
        </ListItem>
      ))}
    </Heading> */}
    </>
  );
}


export default Clients;
