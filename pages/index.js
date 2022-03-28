import { List, Heading, Link, ListItem, Text} from '@chakra-ui/core';

import Client from '../components/Client';

/* export const getServerSideProps = async () => {

  const res = await fetch('https://fortnite-api.com/v2/cosmetics/br/new');
  const data = await res.json();
  
  return {
    props: {
      clients: data
    }
  }
} */

async function getBooks () {
  const res = await fetch('https://getbible.net/v1/web/books.json')
  const json = await res.json()
  return Object.entries(json)
}

async function getChapters (books) {
  const chapters = await Promise.all(
    books.map(async (item) => {
      const url = item[1].url
      const res = await fetch(url)
      const json = await res.json()
      return json
    })
  )

  return chapters
}

export async function getStaticProps() {
  const books = await getBooks()
  const chapters = await getChapters(books)

  return {
    props: {
      books,
      chapters,
    },
  }
}



const Clients = ({books, chapters}) => {


  return (
    <>
      <List>
        {books.map((book,index) => (
          <ListItem key={index}>
            <Heading>{ book[1].name }</Heading>
            {chapters.slice(index, index+1).map((chapter,index2) =>
              <>
                <Text key={index2}>{chapter.book[1].chapter[1].verse}</Text>
              </>
            )}
          </ListItem>
        ))}
      </List>


    {/* <List>
      {clients.data.items.map((result, index) => (
        // <Client key={result.id} {...result}
        <ListItem key={result.id} className="column" mb={4} p = {5}  bg='white'>
            <Heading>{index + 1}. {result.name}</Heading>
            <List>
              {result.gameplayTags.map((gameplayTag, index) => (
                <ListItem key={index}>
                  <Text>{gameplayTag}</Text>
                </ListItem>
                ))}
            </List>
        </ListItem>
      ))}
    </List> */}
    </>
  );
}


export default Clients;
