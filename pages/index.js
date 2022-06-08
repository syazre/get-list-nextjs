import { List, Heading, Link, ListItem, Text} from '@chakra-ui/core';

import Client from '../components/Client';

/* async function getBooks () {
  const res = await fetch('http://localhost:3000/api/books')
  const json = await res.json()
  return Object.entries(json)
} */

async function getClientsOld () {
  const res = await fetch('http://localhost:3000/api/clients')
  const json = await res.json()
  return Object.entries(json)
}
async function getClients () {
  const res = await fetch('http://localhost:3000/api/clients-3')
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
    
    clients.map(async (item,index) => {
      const url = 'http://localhost:3000/api/clients/' + item.customerId;
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
  const details = await getDetails(clients[0][1].data)
  

  return {
    props: {
      clients: clients[0][1].data,
      details,
    },
  }
}



const Clients = ({clients, details}) => {
  console.log(details)
  var countRSP = 0;
  return (
    <>
      <List>
        {clients.map((client,index) => (
          <ListItem key={index} p = {5} my={2} >
           { client.FullName }
            {details.slice(index, index+1).map((detail,index2) => (
              <>

              {detail.response.map((d,index3) => (
                <>
                <table style={{borderWidth: 1}}>
                    <tr style={{borderWidth: 1}}>
                      {d.partnerAccountType == 'CS'? <td rowspan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><Text style={{fontWeight: 'bold'}}>Cash</Text></td>: null }
                      {d.partnerAccountType == 'KW'? <td rowspan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><Text style={{fontWeight: 'bold'}}>KWSP</Text></td>: null }
                      <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>Total</td>
                
                      {d.productbreakdown.map((product,index4) => (
                        <>
                          <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.partnerProductId}</td>
                        </>
                      ))}
                    </tr>

                    <tr style={{borderWidth: 1}}>
                      <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{d.totalNetAssetValue.toFixed(2)}</td>
                      {d.productbreakdown.map((product,index4) => (
                        <>
                          <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.value.toFixed(2)}</td>
                        </>
                      ))}
                    </tr>
                    <tr style={{borderWidth: 1}}>
                      {d.productbreakdown.map((product,index4) => (
                        <>
                        {product.rspMaxAmount !== null ? <span style={{ display: "none" }}> { countRSP = countRSP+1 }</span> : null }
                        </>
                      ))}
                      {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>RSP </td> : null}
                      {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}> </td> : null}
                      {d.productbreakdown.map((product,index4) => (
                        <>
                          {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.rspMaxAmount} </td> : null }
                        </>
                      ))} 
                    </tr>
                </table>
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
