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

  play(color) {
    if (color === "black") {
      this.soundBlack.play();
    } else {
      this.soundWhite.play();
    }
  }
}

export default Sound;