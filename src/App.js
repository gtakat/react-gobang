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
  constructor() {
    super();

    let squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }

    this.state = {
      squares
    }
  }

  render() {
    return (
      <Goban squares={this.state.squares} />
    );
  }
}

class Goban extends Component {
  render() {
    let squares = [];

    for (let i=0; i<19; i++) {
      for(let j=0; j<19; j++) {
        const key = `${i}_${j}`;
        let masu = <Masu key={key} row={i} col={j} />;
        squares.push(masu);
      }
    }
    return (
      <div id="App-goban">
        <div>{squares}</div>
      </div>
    );
  }
}

class Masu extends Component {
  constructor() {
    super();
    this.state = {
      row: null,
      col: null
    }
  }
  render() {
    console.log(`(${this.props.row},${this.props.col})`);
    return (
      <div className="App-masu">
        <div className="App-goishi-black" />
      </div>
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
