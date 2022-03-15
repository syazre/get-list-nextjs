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
    </>
  );
}


export default Clients;
