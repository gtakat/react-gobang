import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
// import Button from './Button';
// import Welcome from './Welcome';

// storiesOf('Welcome', module)
//   .add('to Storybook', () => (
//     <Welcome showApp={linkTo('Button')}/>
//   ));
//
// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));

import '../index.css';
import App from '../App';
import { Header, Footer, Gameinfo, Goban, Masu } from '../App';

storiesOf('App', module)
  .add('default view', () => (
    <App />
  ))

storiesOf('Header', module)
  .add('default view', () => (
    <Header />
  ));

storiesOf('Footer', module)
  .add('default view', () => (
    <Footer />
  ));

storiesOf('Gameinfo', module)
  .add('default view (first player is black)', () => (
    <Gameinfo current="black" />
  ))
  .add('player whire', () => (
    <Gameinfo current="white" />
  ))
  .add('black win', () => (
    <Gameinfo winner="black" />
  ))
  .add('white win', () => (
    <Gameinfo winner="white" />
  ))
storiesOf('Goban', module)
  .add('default view', () => {
    const squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    return <Goban squares={squares} />
  })
  .add('first hit', () => {
    const squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    squares[9][9] = "black";
    return <Goban squares={squares} />
  })
  .add('second hit', () => {
    const squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    squares[9][9] = "black";
    squares[9][10] = "white";
    return <Goban squares={squares} />
  })
  .add('black win pattern', () => {
    const squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    squares[9][9] = "black";
    squares[9][10] = "white";
    squares[8][9] = "black";
    squares[8][11] = "white";
    squares[7][9] = "black";
    squares[7][12] = "white";
    squares[6][9] = "black";
    squares[6][13] = "white";
    squares[5][9] = "black";
    return <Goban squares={squares} />
  })

storiesOf('Masu', module)
  .add('default view', () => (
    <Masu row="9" col="9" onClick={action('empty masu clicked')} />
  ))
  .add('hit black', () => (
    <Masu row="9" col="9" color="black" />
  ))
  .add('hit white', () => (
    <Masu row="9" col="9" color="white" />
  ))
