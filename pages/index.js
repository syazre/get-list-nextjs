import { List, Heading, Link, ListItem, Text} from '@chakra-ui/core';

import Client from '../components/Client';

/* async function getBooks () {
  const res = await fetch('http://localhost:3000/api/books')
  const json = await res.json()
  return Object.entries(json)
} */

async function getClients () {
  const res = await fetch('http://localhost:3000/api/clients')
  const json = await res.json()
  return Object.entries(json)
}

/* async function getChapters (books) {
  const chapters = await Promise.all(
    books.map(async (item) => {
      const url = item[1].url
      const res = await fetch(url)
      const json = await res.json()
      return json
    })
  )

  return chapters
} */

async function getDetails (clients) {
  const details = await Promise.all(
    clients.map(async (item) => {
      const url = 'http://localhost:3000/api/clients/' + item[1].customerId;
      const res = await fetch(url)
      const json = await res.json()
      return json
    })
  )

  return details
}

/* export async function getStaticProps() {
  const books = await getBooks()
  const chapters = await getChapters(books)

  return {
    props: {
      books,
      chapters,
    },
  }
} */

export async function getStaticProps() {
  const clients = await getClients()
  const details = await getDetails(clients)
  

  return {
    props: {
      clients,
      details,
    },
  }
}



const Clients = ({clients, details}) => {
  console.log(details);
  return (
    <>
      <List>
        {clients.map((client,index) => (
          <ListItem key={index} p = {5} my={2}  >
            <Text>{ client[1].FullName }</Text>
            {details.slice(index, index+1).map((detail,index2) => (
              <>
              {detail.map((d,index3) => (
                <>
                {d.partnerAccountType == 'CS'? <Text>Cash</Text>: null }
                {d.partnerAccountType == 'KW'? <Text>KWSP</Text>: null }
                {d.productbreakdown.map((product,index4) => (
                  <>
                    <Text>{product.partnerProductId} - {product.units}</Text>
                  </>
                ))}
                </>
              ))}
              </>
            ))}
          </ListItem>
        ))}
      </List>
    </>
  );
  /* return (
    <>
      <List>
        {books.map((book,index) => (
          <ListItem key={index} p = {5} my={2}  bg='white' >
            <Heading>{ book[1].name }</Heading>
            {chapters.slice(index, index+1).map((chapter,index2) =>
              <>
                <Text><b>Total Books:</b> { Object.keys(chapter.book).length }</Text>
                { Object.values(chapter.book).map((chapz,index3) =>
                <>
                  <Text pl = {3}  mt = {3} ><b>Total Verse {index3+1}:</b> { Object.keys(chapz.chapter).length }</Text>
                  { Object.values(chapz.chapter).map((chapx,index4) =>
                    <Text pl = {6} ><b>Verse {index4+1}:</b> { chapx.verse }</Text>
                  )}
                </>
                )}
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  ); */
}


export default Clients;
