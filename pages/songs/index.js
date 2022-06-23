
import React, { useState, useEffect } from 'react';

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [posts, setPosts]=useState([])

    async function getPosts (id) {
        const url = 'https://jsonplaceholder.typicode.com/posts/' + id;
        const res = await fetch(url)
        //const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
        
        const json = await res.json()
        setPosts(json)
    }

  useEffect(() => {
    var seconds = 1;
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      getPosts(seconds);
      seconds++;

      if(seconds === 20){
            clearInterval(interval);
        }
    }, 1000);
    getPosts(1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed since mounting. {' '}
        {posts.title}
      </header>
    </div>
  );
};

export default IntervalExample;