import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Judgement from './Judgement';
import Sound from './Sound';

const Header = () => (
  <div className="App-header">
   <h2>React Gobang</h2>
  </div>
);

const Footer = () => (
  <div className="App-footer">
  Powered by http://www.din.or.jp/~k_inoue/stone/data20040513/download.html
  </div>
);

class Gameinfo extends Component {
  render() {
    let informations = "";
    if (this.props.winner) {
      informations =
        <ul>
          <li id="App-game-info-left">Winner! :</li>
          <li id="App-game-info-right">{renderGoishi(this.props.winner)}</li>
        </ul>
    } else {
      informations =
        <ul>
          <li id="App-game-info-left">Next player:</li>
          <li id="App-game-info-right">{renderGoishi(this.props.current)}</li>
        </ul>
    }
    return (
      <div id="App-game-info">
        {informations}
      </div>
    );
  }
}

class Game extends Component {
  constructor() {
    super();

    this.judgement = new Judgement();
    this.sound = new Sound();

    let squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    // squares[9][9] = "black";

    this.state = {
      squares,
      current: "black",
      step: 1,
      winner: null,
    }
  }

  render() {
    return (
      <div id="App-game">
        <Gameinfo current={this.state.current} winner={this.state.winner} />
        <Goban squares={this.state.squares} onClick={(row, col) => this.handleClick(row, col)} />
      </div>
    );
  }

  handleClick(row, col) {

    // game end check
    if (this.state.winner) {
      return;
    }

    // check valid hit
    if (!this.judgement.validatesHit(this.state, row, col)) {
      return;
    }

    // sound play
    this.sound.play(this.state.current);

    // console.log(`(${row}, ${col})`);
    let newSquares = this.state.squares.slice(0);
    newSquares[row][col] = this.state.current;

    let current = this.state.current;
    let nextCurrent = this.state.current === "black" ? "white" : "black";

    this.setState({
      squares: newSquares,
      current: nextCurrent,
      step: this.state.step + 1
    });

    // check winner
    let isWin = this.judgement.calculateWinner(this.state.squares, current, row, col);
    if (isWin) {
      this.setState({
        winner: current
      });
    }
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

const Masu = (props) => (
  <div className="App-masu" onClick={() => props.onClick()}>
    {renderGoishi(props.color)}
  </div>
);

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
