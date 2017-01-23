import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import { Header, Footer, Game, Gameinfo, Goban, Masu } from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.containsAllMatchingElements([
    <Header />,
    <Game />,
    <Footer />
  ])).to.equal(true);
});

describe('<Gameinfo> display winner', () => {
  it('win white', () => {
    const wrapper = shallow(<Gameinfo winner="white" />);
    const goishi = <div className="App-goishi-white" />;
    expect(wrapper.contains(goishi)).to.equal(true);
  });

  it('win black', () => {
    const wrapper = shallow(<Gameinfo winner="black" />);
    const goishi = <div className="App-goishi-black" />;
    expect(wrapper.contains(goishi)).to.equal(true);
  });
});

describe('<Game>', () => {
  it('renders gameinfo and goban', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.containsAllMatchingElements([
      <Gameinfo />,
      <Goban />
    ])).to.equal(true);
  });
});

describe('<Goban>', () => {
  it('renders goban', () => {
    let squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
    const wrapper = shallow(<Goban squares={squares} />);
    expect(wrapper.find(Masu)).to.have.length(19*19);
  });
});