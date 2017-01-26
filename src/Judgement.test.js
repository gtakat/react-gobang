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
      };
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
    });
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
  });

  describe('calculateWinner', () => {
    describe('horizontal line', () => {
      it('4 continuous', () => {
        squares[2].fill("black", 2, 6);
        expect(judgement.calculateWinner(squares, "black", 2, 5)).to.be.false;
      });

      it('5 continuous', () => {
        squares[2].fill("black", 2, 7);
        expect(judgement.calculateWinner(squares, "black", 2, 6)).to.be.true;
      });

      it('6 continuous', () => {
        squares[2].fill("black", 2, 8);
        expect(judgement.calculateWinner(squares, "black", 2, 7)).to.be.false;
      });

      it('5 continuous and stepping 1', () => {
        squares[2].fill("black", 2, 7);
        squares[2][8] = "black";
        expect(judgement.calculateWinner(squares, "black", 2, 6)).to.be.true;
      });
    });

    describe('vertical line', () => {
      it('4 continuous', () => {
        for (let i=2; i<=5; i++) {
          squares[i][2] = "black";
        }
        expect(judgement.calculateWinner(squares, "black", 5, 2)).to.be.false;
      });

      it('5 continuous', () => {
        for (let i=2; i<=6; i++) {
          squares[i][2] = "black";
        }
        expect(judgement.calculateWinner(squares, "black", 6, 2)).to.be.true;
      });

      it('6 continuous', () => {
        for (let i=2; i<=7; i++) {
          squares[i][2] = "black";
        }
        expect(judgement.calculateWinner(squares, "black", 7, 2)).to.be.false;
      });

      it('5 continuous and stepping 1', () => {
        for (let i=2; i<=6; i++) {
          squares[i][2] = "black";
        }
        squares[8][2] = "black";
        expect(judgement.calculateWinner(squares, "black", 6, 2)).to.be.true;
      });
    });

    xdescribe('slanting line (left up to right down)', {

    });

    xdescribe('slanting line (left down to right up)', {

    });
  });
});