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
    // console.info(row,col,18-row,col);

    // horizontal and vertical line check
    let horizontalCount = 0;
    let verticalCount = 0;

    for (let i=0; i<=18; i++) {
      // horizontal line check
      if (squares[row][i] === color) {
        horizontalCount++;
        if ((horizontalCount === 5) && (i === 18 || (squares[row][i+1] !== color))) {
          return true;
        }
      } else {
        horizontalCount = 0;
      }

      // vertical line check
      if (squares[i][col] === color) {
        verticalCount++
        if ((verticalCount === 5) && (i === 18 || (squares[i+1][col] !== color))) {
          return true;
        }
      } else {
        verticalCount = 0;
      }
    }


    // slanting line check
    let slantingCount = 0;

    // slanting line check 1 (left up to right down direction)
    // calculate starting point (0,0)
    let horizontalOffset = row > col ? 0 : col - row;
    let verticalOffset = row > col ? row - col : 0;

    for (let i=0; i<=18; i++) {
      let squareEnd = false;
      if (((i + horizontalOffset) === 18) || ((i + verticalOffset) === 18)) {
        squareEnd = true;
      }

      if (squares[i+verticalOffset][i+horizontalOffset] === color) {
        slantingCount++;
        if ((slantingCount === 5) && (squareEnd || (squares[i+verticalOffset+1][i+horizontalOffset+1] !== color))) {
          return true;
        }

      } else {
        slantingCount = 0;
      }

      if (squareEnd) {
        break;
      }
    }

    // slanting line check 2 (left down to right up direction)
    slantingCount = 0;

    // calculate starting point (0,18)
    horizontalOffset = (18 - row) > col ? 0 : col - (18 - row);
    verticalOffset = (18 - row) < col ? 18 : row + col;

    for (let i=0; i<=18; i++) {
      let squareEnd = false;
      if (((i + horizontalOffset) === 18) || ((verticalOffset - i) === 0)) {
        squareEnd = true;
      }

      if (squares[verticalOffset-i][i+horizontalOffset] === color) {
        slantingCount++;
        if ((slantingCount === 5) && (squareEnd || (squares[verticalOffset-i-1][i+horizontalOffset+1] !== color))) {
          return true;
        }
      } else {
        slantingCount = 0;
      }

      if (squareEnd) {
        break;
      }
    }

    return false;
  }
}

export default Judgement;