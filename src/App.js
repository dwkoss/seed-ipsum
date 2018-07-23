import React, { Component } from 'react';
import Generator from './components/Generator';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="App-nav">
            <a href="/about">About</a>
          </nav>
          <h1>Seed Ipsum</h1>
          <p>Ipsum generated from the relevent seed text of your choosing.</p>
        </header>
        <div className="container">
          <Generator />
        </div>
      </div>
    );
  }
}

export default App;
