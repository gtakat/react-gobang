import { expect } from 'chai';
import Judgement from './Judgement';

describe('Judgement', () => {
  let squares;
  let judgement;

  beforeAll(() => {
    judgement = new Judgement;
  });

  beforeEach(() => {
    squares = Array(19);
    for (let i=0; i<squares.length; i++) {
      squares[i] = Array(19).fill(null);
    }
  });

  describe('validatesHit', () => {

    it('Can hit if not exists', () => {
      const state = {
        squares
      }
      expect(judgement.validatesHit(state, 1, 2)).to.be.true;
    });

    it('Can not hit if it already exists', () => {
      squares[1][2] = "black";
      const state = {
        squares
      };
      expect(judgement.validatesHit(state, 1, 2)).to.be.false;
    });
  });

  describe('first hit', () => {
    let state;
    beforeAll(() => {
      state = {
        squares,
        step: 1
      };
    });

    it('first hit is center only', () => {
      expect(judgement.validatesHit(state, 9, 9)).to.be.true;
    });

    it('not center', () => {
      expect(judgement.validatesHit(state, 1, 2)).to.be.false;
    })
  });

  describe('second hit', () => {
    let state;
    beforeAll(() => {
      squares[9][9] = "black";
      state = {
        squares,
        step: 2
      };
    });

    it('second hit is around center', () => {
      expect(judgement.validatesHit(state, 8, 8)).to.be.true;
    });

    it('not arround', () => {
      expect(judgement.validatesHit(state, 1, 2)).to.be.false;
    });
  })
});