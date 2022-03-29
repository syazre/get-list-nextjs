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
          <ListItem key={index} p = {5} my={2} bg='white'>
            <Heading>{ book[1].name }</Heading>
            {chapters.slice(index, index+1).map((chapter,index2) =>
              <>
                <Text><b>Total Books:</b> { Object.keys(chapter.book).length }</Text>
                <Text><b>Total Chapter:</b> { Object.keys(chapter.book[1].chapter).length }</Text>

                { Object.keys(chapter.book[1].chapter).map((versez,index3) => 
                <Text><b>Verse {chapter.book[1].chapter[index3+1].verse_nr}:</b> { chapter.book[1].chapter[index3+1].verse }</Text>
                  )}
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}


export default Clients;
