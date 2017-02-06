import React from 'react';
import { shallow, mount } from 'enzyme';
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

describe('<Header>', () => {
  it('render header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.is('.App-header')).to.equal(true);
  });
});

describe('<Footer>', () => {
  it('render footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.is('.App-footer')).to.equal(true);
  });
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

  describe('click masu', () => {
    it('click masu for win', () => {
      let squares = Array(19);
      for (let i=0; i<squares.length; i++) {
        squares[i] = Array(19).fill(null);
      }

      const wrapper = mount(<Game />);

      wrapper.find('#App-masu-9-9').simulate('click');  // black
      wrapper.find('#App-masu-9-10').simulate('click'); // white
      wrapper.find('#App-masu-8-9').simulate('click');  // black
      wrapper.find('#App-masu-9-11').simulate('click'); // white
      wrapper.find('#App-masu-7-9').simulate('click');  // black
      wrapper.find('#App-masu-11-2').simulate('click'); // white
      wrapper.find('#App-masu-6-9').simulate('click');  // black
      wrapper.find('#App-masu-13-2').simulate('click'); // white
      wrapper.find('#App-masu-5-9').simulate('click');  // black (win)

      expect(wrapper.find('#App-game-info-left').text()).to.equal('Winner! :');
    })
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

describe('<Masu>', () => {
  it('render masu black', () => {
    const wrapper = shallow(<Masu color="black" />);
    expect(wrapper.contains(<div className="App-goishi-black" />)).to.equal(true);
  });

  it('render masu white', () => {
    const wrapper = shallow(<Masu color="white" />);
    expect(wrapper.contains(<div className="App-goishi-white" />)).to.equal(true);
  });

  it('render masu none', () => {
    const wrapper = shallow(<Masu />);
    expect(wrapper.find(".App-goishi-black").exists()).to.be.false;
    expect(wrapper.find(".App-goishi-white").exists()).to.be.false;
  });
});