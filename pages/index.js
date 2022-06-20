import { List, Heading, Link, ListItem, Text} from '@chakra-ui/core';

import Client from '../components/Client';

async function getClients () {
  //const res = await fetch('http://localhost:3000/api/clients-3')
  const res = await fetch('https://apimocha.com/syazre/clients')
  const json = await res.json()
  return Object.entries(json)
}

async function getDetails (x) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const details = await Promise.all(
    x.map(async (item,index) => {
      await sleep(index * 1000)
      // const url = 'http://localhost:3000/api/clients/' + item.customerId;
      const url = 'https://apimocha.com/syazre/clients/' + item.customerId;
      const res = await fetch(url)
      const json = await res.json()
      return json
    })
  )

  return details

}

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
  var countRSP = 0;
  return (
    <>
      {<List>
        {clients.map((client,index) => (
          <ListItem key={index} p = {5} my={2} >
           { client.FullName }
            {details.slice(index, index+1).map((detail,index2) => (
              <div key={index2}>

              {detail.response.map((d,index3) => (
                <div key={index3}>
                  <table style={{borderWidth: 1}}>
                    <tbody>
                      <tr style={{borderWidth: 1}}>
                        {d.partnerAccountType == 'CS'? <td rowSpan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><Text style={{fontWeight: 'bold'}}>Cash</Text></td>: null }
                        {d.partnerAccountType == 'KW'? <td rowSpan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><Text style={{fontWeight: 'bold'}}>KWSP</Text></td>: null }
                        <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>Total</td>
                  
                        {d.productbreakdown.map((product,index4) => (
                            <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.partnerProductId}</td>
                        ))}
                      </tr>

                      <tr style={{borderWidth: 1}}>
                        <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{d.totalNetAssetValue.toFixed(2)}</td>
                        {d.productbreakdown.map((product,index4) => (
                            <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.value.toFixed(2)}</td>
                        ))}
                      </tr>
                      <tr style={{borderWidth: 1}}>
                        {d.productbreakdown.map((product,index4) => (
                          <td key={index4} style={{ display: "none" }}>
                          {product.rspMaxAmount !== null ?  <span>{ countRSP = countRSP+1 }</span> : null }
                          </td>
                        ))}
                        {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>RSP </td> : null}
                        {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}> </td> : null}
                        {d.productbreakdown.map((product,index4) => (
                          <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', display: countRSP > 1 ? 'table-cell' : 'none'}}>
                            {countRSP > 1 ? <span>{product.rspMaxAmount}</span>  : null }
                          </td>
                        ))} 
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              </div>
            ))}
          </ListItem>
        ))}
      </List>}
    </>
  );
}


export default Clients;
