import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function Header() {
  return (
    <div className="App-header">
      <h2>React Gobang</h2>
    </div>
  );
}

class Footer extends Component {
  render() {
    return (
      <div className="App-footer">
      Powered by http://www.din.or.jp/~k_inoue/stone/data20040513/download.html
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div id="App-goban"></div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Game />
        <Footer />
      </div>
    );
  }
}

export default App;
