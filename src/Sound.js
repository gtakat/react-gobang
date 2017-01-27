import Howler from 'howler';

class Sound {
  constructor() {
    this.soundBlack = new Howler.Howl({
      src: ['/sounds/igo01.mp3']
    });

    this.soundWhite = new Howler.Howl({
      src: ['/sounds/igo02.mp3']
    });
  }

  getState(color) {
    if (color === "black") {
      return this.soundBlack.state();
    } else if (color === "white") {
      return this.soundWhite.state();
    }
    return false;
  }

  play(color) {
    if (color === "black") {
      this.soundBlack.play();
      return color;
    } else if (color === "white") {
      this.soundWhite.play();
      return color;
    }
    return false;
  }
}

export default Sound;