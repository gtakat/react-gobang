import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Header, Gameinfo } from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  const header = <Header />;
  expect(wrapper.contains(header)).toEqual(true);
});

describe('<Gameinfo> display winner', () => {
  it('win white', () => {
    const wrapper = shallow(<Gameinfo winner="white" />);
    const goishi = <div className="App-goishi-white" />;
    expect(wrapper.contains(goishi)).toEqual(true);
  });

  it('win black', () => {
    const wrapper = shallow(<Gameinfo winner="black" />);
    const goishi = <div className="App-goishi-black" />;
    expect(wrapper.contains(goishi)).toEqual(true);
  });
});