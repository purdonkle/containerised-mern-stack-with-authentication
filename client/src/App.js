import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('/ping')
    .then(response => response.json())
    .then(data => console.log(data));
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
