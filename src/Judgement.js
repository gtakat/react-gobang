class Judgement {
  validatesHit(state, row, col) {
    // Can not hit if it already exists
    if (this.existsGoishi(state, row, col)) {
      return false;
    }

    // First hit is center only
    if (!this.validFirstHit(state, row, col)) {
      return false;
    }

    // Second hit is only around center
    if (!this.validSecondHit(state, row, col)) {
      return false;
    }

    return true;
  }

  existsGoishi(state, row, col) {
    return !!state.squares[row][col];
  }

  validFirstHit(state, row, col) {
    if (state.step === 1) {
      return (row === 9 && col === 9);
    }
    return true;
  }

  validSecondHit(state, row, col) {
    if (state.step === 2) {
      const areas = {
        8:  [8,9,10],
        9:  [8,10],
        10: [8,9,10]
      };

      return areas[row] && areas[row].includes(col);
    }
    return true;
  }
}

export default Judgement;