const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createCorona = () => {
  // if (gameFrame % number[`${round}`] === 0) {
  let rdIndex = mRandom(0, characters.length);

  let character = characters[rdIndex];

  characters.splice(rdIndex, 1)

  console.log(character);
  let percent = mRandom(0, 100);

  if (percent > 20) {
    let image = imgArray[mRandom(0, imgArray.length)];
    arrCorona.push(new Corona(character, image));
  } else if (percent > 7) {
    arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
  } else {
    arrCorona.push(new Corona(character, corona, TYPE_STAR));
  }
};

const drawCorona = () => {
  for (let covid of arrCorona) {
    covid.image.onload = function () {
      covid.draw();
    };
  }
};

const animation = function () {
  requestAnimationFrame(animation);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for (let covid of arrCorona) {
    covid.update();
  }
};

createCorona();
animation();
