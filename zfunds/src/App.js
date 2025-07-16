import React, { useState, useEffect } from 'react';
import './App.css';

function App(){
  const [data, setData] = useState(0);
  useEffect(() => {
   const interval = setInterval(() => {
      setData(data => data + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="App">
      <div className="App-header">
        { `${data} times called` }
      </div>
    </div>
  );
}

export default App;
