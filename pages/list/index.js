
import React, { useState, useEffect } from 'react';



const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [user, setUser]=useState([]);
  const [posts, setPosts]=useState([]);

    async function getPosts (id) {
      try {
        const url = 'http://localhost:3000/api/clients/' + id;
        const res = await fetch(url, { 
        })
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        
        const json = await res.json()
        let updatedValue = json;
        setPosts(oldArray => [...oldArray, updatedValue]);
      }
      catch (err) {
        console.log(err);
      }
    }

  var countRSP = 0;
  useEffect(async () => {
    var seconds = 1;
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

      if(seconds === 2){
            clearInterval(interval);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function fundCodeFormula(fundcode){
    if (fundcode === "005") {
        return `=ROUNDDOWN(('Daily Unit'!C3) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "015") {
        return `=ROUNDDOWN(('Daily Unit'!C4) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "084") {
        return `=ROUNDDOWN(('Daily Unit'!C5) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "013") {
        return `=ROUNDDOWN(('Daily Unit'!C6) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "044") {
        return `=ROUNDDOWN(('Daily Unit'!C7) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "008") {
        return `=ROUNDDOWN(('Daily Unit'!C11) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "073") {
        return `=ROUNDDOWN(('Daily Unit'!C12) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "025") {
        return `=ROUNDDOWN(('Daily Unit'!C16) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "073") {
        return `=ROUNDDOWN(('Daily Unit'!C17) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "039") {
        return `=ROUNDDOWN(('Daily Unit'!C18) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "168") {
        return `=ROUNDDOWN(('Daily Unit'!C22) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "248") {
        return `=ROUNDDOWN(('Daily Unit'!C23) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "282") {
        return `=ROUNDDOWN(('Daily Unit'!C24) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "045") {
        return `=ROUNDDOWN(('Daily Unit'!C25) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "026") {
        return `=ROUNDDOWN(('Daily Unit'!C26) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "290") {
        return `=ROUNDDOWN(('Daily Unit'!C27) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "291") {
        return `=ROUNDDOWN(('Daily Unit'!C28) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else if (fundcode === "292") {
        return `=ROUNDDOWN(('Daily Unit'!C29) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
    }
    else {
        return `Fund not found.`
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        {posts.map((post,index) =>
          <>
            <div style={{fontWeight: 'bold'}}>{index+1}. {user[index].FullName}</div>

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
                  {post.response.map((d,index3) => (
                      <div key={index3}>
                        {d.totalNetAssetValue != 0 ?
                          <table style={{borderWidth: 1}}>
                            <tbody>
                              <tr style={{borderWidth: 1}}>
                                {d.partnerAccountType == 'CS'? <td rowSpan="3" style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>Cash </td>: null }
                                {d.partnerAccountType == 'KW'? <td rowSpan="3" style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>{d.partnerDistributorCode  == 'EMIS'? 'eKWSP' : 'KWSP' }</td>: null }
                          
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                    (<td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>{product.partnerProductId}</td>) : null
                                )}
                              </tr>

                              <tr style={{borderWidth: 1}}>
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                    (<td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{product.units}</td>) : null
                                )}
                              </tr>

                              <tr style={{borderWidth: 1}}>
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                    (<td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white'}}>{fundCodeFormula(product.partnerProductId)}</td>) : null
                                )}
                              </tr>

                              <tr  style={{borderWidth: 1, display:'none'}}>
                                {d.productbreakdown.map((product,index4) => (
                                  <td key={index4} >
                                  {product.rspMaxAmount !== null ?  <span >Count RSP: { countRSP = countRSP+1 }</span> : null }
                                  </td>
                                ))}
                              </tr>
                              <tr style={{borderWidth: 1}}>
                                {countRSP > 1 ? <td style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', fontWeight: 'bold'}}>RSP (RM) </td> : null}
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                  (<td key={index4} style={{borderWidth: 1, width: 100, textAlign: 'center', background: 'white', display: countRSP > 1 ? 'table-cell' : 'none'}}>
                                    {countRSP > 1 ? <span>{product.rspMaxAmount}</span>  : null }
                                  </td>) : null
                                )} 
                              </tr>
                              <tr style={{'display': 'none'}}><td>{ countRSP = 0 }</td></tr>
                            </tbody>
                          </table>
                          : null
                        }
                      </div>
                    ))}
                </>
            }
            <div>&nbsp;</div><br></br>
            <div>&nbsp;</div>

          </>
        )}
      </header>
    </div>
  );
};

export default IntervalExample;