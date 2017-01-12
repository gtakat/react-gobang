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

  calculateWinner(squares, color, row, col) {

    // horizontal and vertical line check
    let horizontalCount = 0;
    let verticalCount = 0;
    
    for (let i=0; i<=17; i++) {
      // horizontal line check
      if (squares[row][i] === color) {
        horizontalCount++;
        if ((horizontalCount === 5) && (squares[row][i+1] !== color)) {
          return true;
        }
      } else {
        horizontalCount = 0;
      }

      // vertical line check
      if (squares[i][col] === color) {
        verticalCount++
        if ((verticalCount === 5) && (squares[i+1][col] !== color)) {
          return true;
        }
      } else {
        verticalCount = 0;
      }

    }


    // slanting line check
    let slantingCount = 0;

    // slanting line check 1
    // slanting line check 2

    return false;
  }
}

export default Judgement;