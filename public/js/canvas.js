const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createCorona = () => {
  // if (gameFrame % number[`${round}`] === 0) {
  // let rdIndex = mRandom(0, characters.length);

  // let character = characters[rdIndex];

  // characters.splice(rdIndex, 1)

  let percent = mRandom(0, 100);

  if (percent > 20) {
    let image = imgArray[mRandom(0, imgArray.length)];
    arrCorona.push(new Corona("a", image));
  } else if (percent > 7) {
    arrCorona.push(new Corona("b", coronaBlack, TYPE_BLACK));
  } else {
    arrCorona.push(new Corona("s", corona, TYPE_STAR));
  }
  // console.log(arrCorona.length);

  // }
};

const drawCorona = () => {
  for (let covid of arrCorona) {

    covid.image.onload = function () {
      covid.draw();
    };
    // corona.update()
  }
};

// const drawGame = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // draw bubble
//   drawCorona();
// };

createCorona();
drawCorona();
// drawGame();
