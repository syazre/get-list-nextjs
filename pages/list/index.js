
import React, { useState, useEffect } from 'react';



const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [user, setUser]=useState([]);
  const [posts, setPosts]=useState([]);

    async function getPosts (id) {
      try {
        const url = 'http://localhost:3000/api/clients/' + id;
        const res = await fetch(url)
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

      if(seconds === 5){
            clearInterval(interval);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function fundCodeFormula(fundcode){
    if (fundcode === "005") {
        // return `=ROUNDDOWN(('Daily Unit'!D3) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V005`
    }
    else if (fundcode === "015") {
        // return `=ROUNDDOWN(('Daily Unit'!D4) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V015`
    }
    else if (fundcode === "084") {
        // return `=ROUNDDOWN(('Daily Unit'!D5) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V084`
    }
    else if (fundcode === "013") {
        // return `=ROUNDDOWN(('Daily Unit'!D6) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V013`
    }
    else if (fundcode === "044") {
        // return `=ROUNDDOWN(('Daily Unit'!D7) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V044`
    }
    else if (fundcode === "008") {
        // return `=ROUNDDOWN(('Daily Unit'!D11) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V008`
    }
    else if (fundcode === "073") {
        // return `=ROUNDDOWN(('Daily Unit'!D12) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V073`
    }
    else if (fundcode === "025") {
        // return `=ROUNDDOWN(('Daily Unit'!D16) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V025`
    }
    else if (fundcode === "076") {
        // return `=ROUNDDOWN(('Daily Unit'!D17) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V076`
    }
    else if (fundcode === "039") {
        // return `=ROUNDDOWN(('Daily Unit'!D18) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V039`
    }
    else if (fundcode === "168") {
        // return `=ROUNDDOWN(('Daily Unit'!D22) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V168`
    }
    else if (fundcode === "248") {
        // return `=ROUNDDOWN(('Daily Unit'!D23) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V248`
    }
    else if (fundcode === "282") {
        // return `=ROUNDDOWN(('Daily Unit'!D24) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V282`
    }
    else if (fundcode === "045") {
        // return `=ROUNDDOWN(('Daily Unit'!D25) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V045`
    }
    else if (fundcode === "026") {
        // return `=ROUNDDOWN(('Daily Unit'!D26) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V026`
    }
    else if (fundcode === "290") {
        // return `=ROUNDDOWN(('Daily Unit'!D27) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V290`
    }
    else if (fundcode === "291") {
        // return `=ROUNDDOWN(('Daily Unit'!D28) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V291`
    }
    else if (fundcode === "292") {
        // return `=ROUNDDOWN(('Daily Unit'!D29) * INDIRECT(ADDRESS(ROW()-1,COLUMN())),2)`
        return `V292`
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
                <table style={{borderWidth: 1, borderColor: '#aaaaaa'}}>
                  <tbody>
                    <tr style={{borderWidth: 1, borderColor: '#aaaaaa'}}>
                      <td style={{borderWidth: 1, borderColor: '#aaaaaa', padding: 10, width: 100, textAlign: 'center', background: 'white'}}><div  style={{fontWeight: 'bold'}}>Null</div></td>
                    </tr>
                  </tbody>
                </table>
                :
                <>
                  {post.response.map((d,index3) => (
                      <div key={index3}>
                        {d.totalNetAssetValue != 0 ?
                          <table style={{}}>
                            <tbody>
                              <tr style={{borderWidth: 1, borderColor: '#aaaaaa'}}>
                                {d.partnerAccountType == 'CS'? <td style={{borderWidth: 1, borderColor: '#0076cf', width: 200, textAlign: 'center', background: '#0076cf', color: '#fff', fontWeight: 'bold'}}>CASH </td>: null }
                                {d.partnerAccountType == 'KW'? <td style={{borderWidth: 1, borderColor: '#EC1C24', width: 200, textAlign: 'center', background: '#EC1C24', color: '#fff', fontWeight: 'bold'}}>{d.partnerDistributorCode  == 'EMIS'? 'eKWSP' : 'KWSP' }</td>: null }
                          
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                    (<td className='fundcode' colSpan='2' key={index4} style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: '#e5e7eb', fontWeight: 'bold'}}>‎ {product.partnerProductId}</td>) : null
                                )}
                                <td colSpan='2' style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: '#e5e7eb', fontWeight: 'bold', width: 200}}>Total Invested (RM)</td>
                              </tr>

                              <tr style={{borderWidth: 1, borderColor: '#aaaaaa'}}>
                                <td style={{borderWidth: 1, borderColor: '#f0f0f0', width: 200, textAlign: 'center', background: '#e5e7eb', fontWeight: 'bold'}}>Units/Cur Value (RM)</td>
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                  <>
                                    <td key={index4} style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: 'white'}}>{product.units}</td>
                                    <td key={index4} style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: 'white'}}>{fundCodeFormula(product.partnerProductId)}</td></> : null
                                )}
                                <td colSpan='2' style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: 'white', width: 200}}>{d.totalInvested} </td>
                              </tr>

                              <tr style={{display:'none'}}>
                                {d.productbreakdown.map((product,index4) => (
                                  <td key={index4} >
                                  {product.rspMaxAmount !== null && product.rspMaxAmount !== 0 ?  <span >Count RSP: { countRSP = countRSP+1 }</span> : null }
                                  </td>
                                ))}
                              </tr>
                              <tr style={{  }}>
                                {countRSP >= 1 ? <td style={{borderWidth: 1, borderColor: '#FFBF00', width: 200, textAlign: 'center', background: '#FFBF00', fontWeight: 'bold'}}>RSP (RM) </td> : null}
                                {d.productbreakdown.map((product,index4) => (product.units !== null && product.units !== 0) ?
                                  (<td colSpan='2' key={index4} style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: 'white', display: countRSP >= 1 ? 'table-cell' : 'none'}}>
                                    {countRSP >= 1 ? <>{product.rspMaxAmount}</>  : null }
                                  </td>) : null
                                )} 
                                {countRSP >= 1 ? <td colSpan='2' style={{borderWidth: 1, borderColor: '#aaaaaa', width: 100, textAlign: 'center', background: 'white', width: 200}}>&nbsp; </td> : null}
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