
import React, { useState, useEffect } from 'react';

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [posts, setPosts]=useState([])

    async function getPosts (id) {
        const url = 'http://localhost:3000/api/clients/' + id;
        const res = await fetch(url)
        //const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
        
        const json = await res.json()
        let updatedValue = json;
        setPosts(oldArray => [...oldArray, updatedValue]);
        console.log(updatedValue);
    }

  useEffect(async () => {
    var seconds = 1;
    // const url = 'https://jsonplaceholder.typicode.com/posts/';
    const url = 'http://localhost:3000/api/clients-3';
    const res = await fetch(url)
    const json = await res.json(); 
    const objson = Object.entries(json); 
    //console.log(objson[0][1].data);
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      getPosts(objson[0][1].data[seconds-1].customerId);
      seconds++;

      if(seconds === 4){
            clearInterval(interval);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed since mounting. {' '}
        {posts.map(post =>
          <div key={post.response[0].id}>{post.response[0].portfolioValue.toFixed(2)}</div>
        )}
      </header>
    </div>
  );
};

export default IntervalExample;