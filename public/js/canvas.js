const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createCorona = () => {
  let rdIndex = mRandom(0, characters.length);
  let character = characters[rdIndex];
  characters.splice(rdIndex, 1);
  let percent = mRandom(0, 100);
  if (percent > 50) {
    arrLength += 1;
    let image = imgArray[mRandom(0, imgArray.length)];
    arrCorona.push(new Corona(character, image));
  } else if (percent > 0) {
    arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
  } else {
    arrLength += 1;
    arrCorona.push(new Corona(character, coronaStar, TYPE_STAR));
  }
};
const removeCorona = (corona) => {
  let coronaIndex = arrCorona.indexOf(corona);
  characters.push(corona.character);
  arrCorona.splice(coronaIndex, 1);
};
const drawCoronas = () => {
  for (let covid of arrCorona) {
    checkLose(covid);
    isCurrentCorona = covid == currentCorona ? true : false;
    covid.draw(isCurrentCorona);
    covid.update();
  }
};
const drawNotification = () => {
  let checkAnimation = true;
  if (checkAnimation) {
    let y = lastCompleteY - opacity;
    if (y > lastCompleteY - 20) {
      ctx.font = "500 20px Poppins";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(`+1`, lastCompleteX, y);
      opacity = opacity + 0.5;
    } else {
      checkAnimation = false;
      opacity = 0;
      lastCompleteY = undefined;
      lastCompleteX = undefined;
    }
  }
};
const drawScore = () => {
  ctx.drawImage(khungDiem, canvas.width - (150 + 15), 10, 150, 35);
  ctx.fillStyle = "white";
  ctx.fillText(`${score}`, canvas.width - 75 - 15, 28);
  // ctx.drawImage(khungVang, canvas.width - (150 + 15), 60, 150, 35);
  // ctx.drawImage(khungVang, 0 + 15, 10, 150, 35);
};
const animation = () => {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  isStart = false;
  if (repeatTime % 100 == 0) {
    if (arrLength < wave[waveIndex]) {
      createCorona();
    }
    // finishedWave(wave[waveIndex]);
  }
  console.log(arrLength);
  repeatTime += 0.5;
  drawCoronas();
  wordComplete();
  drawScore();
  drawNotification();
  request = requestAnimationFrame(animation);
  finishedWave(wave[waveIndex], repeatTime % 100 == 0);
  if (end) {
    end = false;
    // setTimeout(function () {
    //   alert("Hello");
    // }, 1000);
    cancelAnimationFrame(request);
    btnR.style.display = "inline-block";
  }
};
const finishedWave = (coronaNumber, check) => {
  if (check) {
    if (checkKill == coronaNumber && arrLength == coronaNumber) {
      arrCorona = [];
      checkKill = 0;
      arrLength = 0;
      cancelAnimationFrame(request);
    }
  }
};
const checkLose = (covid) => {
  if (covid.y > canvas.height - 30 && covid.type != TYPE_BLACK) {
    end = true;
  }
};
const checkRound = (arr) => {};

const checkCurrentCorona = () => {
  for (let covid of arrCorona) {
    if (Object.values(covid.character)[1].split("")[0] === firstLetter) {
      currentCorona = covid;
      break;
    }
  }
};

const matchesCurrentCorona = (correctLetters, keyPress) => {
  let check = false;
  if (currentCorona != undefined) {
    const idxToCheck = correctLetters.length;
    const wordLetters = Object.values(currentCorona.character)[1].split("");
    if (keyPress === wordLetters[idxToCheck]) {
      check = true;
    } else {
      check = false;
    }
  }
  return check;
};

const wordComplete = () => {
  if (
    correctLettersTyped.length > 0 &&
    correctLettersTyped.join("") ===
      Object.values(currentCorona.character)[1] &&
    currentCorona.type != TYPE_BLACK
  ) {
    score += currentCorona.type == TYPE_STAR ? 2 : 1;
    correctLettersTyped = [];
    lastCompleteX = currentCorona.x;
    lastCompleteY = currentCorona.y;
    removeCorona(currentCorona);
    checkKill += 1;
    firstLetter = undefined;
    currentCorona = undefined;
  } else if (
    checkBlackCovid.length > 0 &&
    checkBlackCovid.join("") === Object.values(currentCorona.character)[1] &&
    currentCorona.type == TYPE_BLACK
  ) {
    removeCorona(currentCorona);
    checkBlackCovid = [];
    firstLetter = undefined;
    currentCorona = undefined;
    end = true;
  }
  for (let covid of arrCorona) {
    if (checkBlackCovid.length > 1) {
      if (
        Object.values(covid.character)[1] === checkBlackCovid.join("") &&
        covid.type != TYPE_BLACK
      ) {
        removeCorona(covid);
        checkBlackCovid = [];
        currentCorona = undefined;
        break;
      } else if (
        Object.values(covid.character)[1] === checkBlackCovid.join("") &&
        covid.type == TYPE_BLACK
      ) {
        end = true;
        break;
      }
    }
  }
};

const play = () => {
  name_game.style.display = "none";
  btn.style.display = "none";
  btnR.style.display = "none";
  animation();
};
btnR.addEventListener("click", (e) => {
  checkKill = 0;
  arrLength = 0;
  arrCorona = [];
  repeatTime = 0;
  score = 0;
  characters = data.map((e) => e);
  play();
});
btn.addEventListener("click", (e) => {
  play();
});

document.addEventListener("keypress", (e) => {
  const key = e.key;
  console.log(key);
  if (currentCorona === undefined) {
    firstLetter = key;
    checkCurrentCorona();
  }
  if (currentCorona.type != TYPE_BLACK) {
    if (matchesCurrentCorona(correctLettersTyped, key)) {
      correctLettersTyped.push(key);
    } else {
      correctLettersTyped = [];
      firstLetter = undefined;
      currentCorona = undefined;
    }
  } else {
    if (matchesCurrentCorona(checkBlackCovid, key)) {
      checkBlackCovid.push(key);
    } else {
      checkBlackCovid.push(key);
      firstLetter = undefined;
    }
  }
});
