
import React, { useState, useEffect } from 'react';

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [user, setUser]=useState([]);
  const [posts, setPosts]=useState([]);

    async function getPosts (id) {
        const url = 'http://localhost:3000/api/clients/' + id;
        const res = await fetch(url)
        //const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
        
        const json = await res.json()
        let updatedValue = json;
        setPosts(oldArray => [...oldArray, updatedValue]);
        console.log(updatedValue);
    }

  var countRSP = 0;
  useEffect(async () => {
    var seconds = 1;
    // const url = 'https://jsonplaceholder.typicode.com/posts/';
    const url = 'http://localhost:3000/api/clients-3';
    const res = await fetch(url)
    const json = await res.json(); 
    const objson = Object.entries(json); 
    
    //console.log(objson[0][1].data);
    const interval = setInterval(() => {
      let userRow = objson[0][1].data[seconds-1];
      setSeconds(seconds => seconds + 1);
      setUser(arrUserRow => [...arrUserRow, userRow]);
      getPosts(objson[0][1].data[seconds-1].customerId);
      seconds++;
      console.log(userRow);

      if(seconds === 5){
            clearInterval(interval);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed since mounting. {' '}
        
        {posts.map((post,index) =>
          <>
            <div>{user[index].FullName}</div>
            <div key={post.response[0].id}>{post.response[0].portfolioValue}</div>

            {((user[index].CStotalNetAssetValue == 0 || user[index].CStotalNetAssetValue == null) && (user[index].KWtotalNetAssetValue == 0 || user[index].KWtotalNetAssetValue == null)) ?
                <table style={{borderWidth: 1}}>
                  <tbody>
                    <tr style={{borderWidth: 1}}>
                      <td style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><div  style={{fontWeight: 'bold'}}>Null</div></td>
                    </tr>
                  </tbody>
                </table>
                :
                <>
                  {post.response[0].totalNetAssetValue != 0 ?
                          <table style={{borderWidth: 1}}>
                            <tbody>
                              <tr style={{borderWidth: 1}}>
                                {post.response[0].partnerAccountType == 'CS'? <td rowSpan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><div style={{fontWeight: 'bold'}}>Cash</div></td>: null }
                                {post.response[0].partnerAccountType == 'KW'? <td rowSpan="2" style={{borderWidth: 1, padding: 10, width: 100, textAlign: 'center', background: 'white'}}><div style={{fontWeight: 'bold'}}>KWSP</div></td>: null }
                                <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>Total</td>
                          
                                {post.response[0].productbreakdown.map((product,index4) => (
                                    <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.partnerProductId}</td>
                                ))}
                              </tr>

                              <tr style={{borderWidth: 1}}>
                                <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{post.response[0].totalNetAssetValue.toFixed(2)}</td>
                                {post.response[0].productbreakdown.map((product,index4) => (
                                    <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.value.toFixed(2)}</td>
                                ))}
                              </tr>
                              <tr  style={{borderWidth: 1, display:'none'}}>
                                {post.response[0].productbreakdown.map((product,index4) => (
                                  <td key={index4} >
                                  {product.rspMaxAmount !== null ?  <span >Count RSP: { countRSP = countRSP+1 }</span> : null }
                                  </td>
                                ))}
                              </tr>
                              <tr style={{borderWidth: 1}}>
                                {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>RSP </td> : null}
                                {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}> </td> : null}
                                {post.response[0].productbreakdown.map((product,index4) => (
                                  <td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', display: countRSP > 1 ? 'table-cell' : 'none'}}>
                                    {countRSP > 1 ? <span>{product.rspMaxAmount}</span>  : null }
                                  </td>
                                ))} 
                              </tr>
                              <tr style={{'display': 'none'}}><td>{ countRSP = 0 }</td></tr>
                            </tbody>
                          </table>
                          : null
                        }
                </>
            }


          </>
        )}
      </header>
    </div>
  );
};

export default IntervalExample;