import { playlist } from '../data';
import { List, Heading } from '@chakra-ui/core';

import Song from '../components/Song';

export const getStaticProps = async () => {
  return {
    props: {
      playlistLists: playlist,
    },
  };
};

const PlaylistListz = ({ playlistLists }) => (
  <>
    <Heading mt={8} mb={4} fontWeight='800'>
      My Client
    </Heading>
    <List>
      {playlistLists.map((playlistList) => (
        <Song key={playlistList.customerId} {...playlistList} />
      ))}
    </List>
  </>
);

export default PlaylistListz;
