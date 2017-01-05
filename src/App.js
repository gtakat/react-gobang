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
      squares,
      current: "black"
    }
  }

  render() {
    return (
      <Goban squares={this.state.squares} onClick={(row, col) => this.handleClick(row, col)} />
    );
  }

  handleClick(row, col) {
    // console.log(`(${row}, ${col})`);
    let newSquares = this.state.squares.slice(0);
    newSquares[row][col] = this.state.current;

    let nextCurrent = this.state.current === "black" ? "white" : "black";

    this.setState({
      squares: newSquares,
      current: nextCurrent
    });
  }
}

class Goban extends Component {
  render() {
    let squares = [];

    for (let i=0; i<19; i++) {
      for(let j=0; j<19; j++) {
        const key = `${i}_${j}`;
        let masu = <Masu key={key}
                         row={i}
                         col={j}
                         color={this.props.squares[i][j]}
                         onClick={() => this.props.onClick(i, j)} />;
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
      col: null,
      color: null
    }
  }
  render() {
    // console.log(`(${this.props.row},${this.props.col})`);
    let goishi = "";
    if (this.props.color === "black") {
      goishi = <div className="App-goishi-black" />
    } else if (this.props.color === "white") {
      goishi = <div className="App-goishi-white" />
    }
    return (
      <div className="App-masu" onClick={() => this.props.onClick()}>
        {goishi}
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
