import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// const judgement = require('./Judgement');
import Judgement from './Judgement';

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
    squares[9][9] = "black";

    this.state = {
      squares,
      current: "white",
      step: 1
    }
  }

  render() {
    return (
      <div id="App-game">
        <Gameinfo current={this.state.current} />
        <Goban squares={this.state.squares} onClick={(row, col) => this.handleClick(row, col)} />
      </div>
    );
  }

  handleClick(row, col) {
    // Can not hit if it already exists
    if (Judgement.validFirstHit(this.state.squares, row, col)) {
    // if (this.state.squares[row][col]) {
      return;
    }

    // console.log(`(${row}, ${col})`);
    let newSquares = this.state.squares.slice(0);
    newSquares[row][col] = this.state.current;

    let nextCurrent = this.state.current === "black" ? "white" : "black";

    this.setState({
      squares: newSquares,
      current: nextCurrent,
      step: this.state.step + 1
    });
  }
}

class Gameinfo extends Component {
  render() {
    return (
      <div id="App-game-info">
        <ul>
          <li id="App-game-info-left">Next player:</li>
          <li id="App-game-info-right">{renderGoishi(this.props.current)}</li>
        </ul>
      </div>
    );
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
  render() {
    return (
      <div className="App-masu" onClick={() => this.props.onClick()}>
        {renderGoishi(this.props.color)}
      </div>
    );
  }
}

function renderGoishi(color) {
  let goishi = "";
  if (color === "black") {
    goishi = <div className="App-goishi-black" />
  } else if (color === "white") {
    goishi = <div className="App-goishi-white" />
  }
  return goishi;
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
