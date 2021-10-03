const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
//tạo corona
const createCorona = () => {
  //random vị trí character
  let rdIndex = mRandom(0, characters.length);
  let character = characters[rdIndex];
  characters.splice(rdIndex, 1);
  //Tạo xác suất xuất hiện corona
  let percent = mRandom(0, 100);
  //Tạo corona thường
  if (percent > 30) {
    arrLength += 1;
    let image = imgArray[mRandom(0, imgArray.length)];
    arrCorona.push(new Corona(character, image));
  } else if (percent > 20) {
    arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
  } else {
    arrLength += 1;
    arrCorona.push(new Corona(character, coronaStar, TYPE_STAR));
  }
};

const createCoronaBoss = () => {
  //random vị trí characterBoss
  let rdIndex = mRandom(0, bossCharacters.length);
  bossCharacter = bossCharacters[rdIndex];
  bossCharacters.splice(rdIndex, 1);
  //tạo coronaBoss
  if (waveIndex > 3) {
    coronaBoss = new Corona(bossCharacter, coronaBossImage, TYPE_BOSS);
    coronaBoss.x = canvas.width / 2;
    coronaBoss.y = -60;
    arrCorona.push(coronaBoss);
  }
};
//xoá corona
const removeCorona = (corona) => {
  let coronaIndex = arrCorona.indexOf(corona);
  characters.push(corona.character);
  arrCorona.splice(coronaIndex, 1);
};
const drawCoronas = () => {
  for (let covid of arrCorona) {
    checkWhenCoronaTouchBottom(covid);
    isCurrentCorona = covid == currentCorona ? true : false;
    covid.draw(isCurrentCorona, checkBoss);
    covid.update();
  }
};
// vẽ thông báo
const drawNotification = () => {
  let checkAnimation = true;
  if (coronaBackup != undefined) {
    const text = coronaBackup.type == TYPE_STAR ? "+2" : "+1";
    if (checkAnimation) {
      let y = coronaBackup.y - opacity;
      if (y > coronaBackup.y - 20) {
        ctx.font = "500 20px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(text, coronaBackup.x, y);
        opacity = opacity + 0.5;
      } else {
        checkAnimation = false;
        opacity = 0;
        coronaBackup = undefined;
      }
    }
  }
};
const drawScore = () => {
  ctx.drawImage(khungDiem, canvas.width - 165, 10, 150, 35);
  ctx.font = "500 20px Poppins";
  ctx.fillStyle = "white";
  ctx.fillText(`${score}`, canvas.width - 90, 28);
};

//animation cho corona
const animation = () => {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  isStart = false;

  if (waveIndex > 3 && checkBoss == false) {
    checkBoss = true;
    createCoronaBoss();
  } else {
    if (repeatTime % 100 == 0) {
      if (arrLength < wave[waveIndex]) {
        createCorona();
      }
    }
  }
  drawCoronas();
  repeatTime += 0.5;
  completedAWord();
  drawScore();
  drawNotification();
  request = requestAnimationFrame(animation);
  finishedWave(wave[waveIndex], repeatTime % 100 == 0);

  if (end) {
    end = false;
    cancelAnimationFrame(request);
    btnR.style.display = "inline-block";
  }
};

//hoàn thành 1 wave
const finishedWave = (coronaNumber, check) => {
  if (check) {
    if (checkKill == coronaNumber && arrLength == coronaNumber) {
      arrCorona = [];
      checkKill = 0;
      arrLength = 0;
      waveText.style.display = "inline-block";
      waveText.innerHTML = "WAVE " + waveIndex;
      cancelAnimationFrame(request);
      setTimeout(function () {
        play();
      }, 500);
      repeatTime = 0;
      waveIndex += 1;
    }
  }
};
//kiểm tra corona chạm khung
const checkWhenCoronaTouchBottom = (covid) => {
  if (covid.y > canvas.height - 30 && covid.type != TYPE_BLACK) {
    end = true;
  } else if (covid.y > canvas.height + 30 && covid.type == TYPE_BLACK) {
    characters.push(covid.character);
    removeCorona(covid);
  }
};
const checkRound = (arr) => {};

// Hoàn thành xong từ
const completedAWord = () => {
  // Xoá corona khi nhập đúng từ trong current corona
  if (
    arrCorrectLetters.length > 0 &&
    arrCorrectLetters.join("") === Object.values(currentCorona.character)[1] &&
    currentCorona.type != TYPE_BLACK
  ) {
    score += currentCorona.type == TYPE_STAR ? 2 : 1;
    arrCorrectLetters = [];
    coronaBackup = currentCorona;
    if (checkBoss != true) {
      removeCorona(currentCorona);
      checkKill += 1;
      currentCorona = undefined;
    } else {
      let rdIndex = mRandom(0, bossCharacters.length);
      bossCharacter = bossCharacters[rdIndex];
      currentCorona.character = bossCharacter;
    }
    firstLetter = undefined;
  } else if (
    arrCorrectLetters.length > 0 &&
    arrCorrectLetters.join("") === Object.values(currentCorona.character)[1] &&
    currentCorona.type == TYPE_BLACK
  ) {
    arrCorrectLetters = [];
    end = true;
    firstLetter = undefined;
    currentCorona = undefined;
  }
  // nhu tên
  findAndRemoveCoronaWithWrongLetters();
};
//Tìm và xoá Corona nếu có, khi nhập sai từ trong current corona
const findAndRemoveCoronaWithWrongLetters = () => {
  let count = 0;
  for (let covid of arrCorona) {
    if (arrWrongLetters.length > 1) {
      if (
        Object.values(covid.character)[1] === arrWrongLetters.join("") &&
        covid.type != TYPE_BLACK
      ) {
        removeCorona(covid);
        arrWrongLetters = [];
        coronaBackup = covid;
        currentCorona = undefined;
        break;
      } else if (
        Object.values(covid.character)[1] === arrWrongLetters.join("") &&
        covid.type == TYPE_BLACK
      ) {
        end = true;
        break;
      } else if (
        Object.values(covid.character)[1] != arrWrongLetters.join("") &&
        covid.type == TYPE_BLACK
      ) {
        count += 1;
      }
    }
  }
  if (count == arrCorona.length) {
    arrWrongLetters = [];
    currentCorona = undefined;
  }
};

// bat su kien nhan tu
document.addEventListener("keypress", (e) => {
  const key = e.key;
  // chua co current corona thi set current
  if (currentCorona === undefined) {
    firstLetter = key;
    selectCurrentCorona();
  }
  // Kiểm tra kí tự của current corona vs key
  if (checkLetterOfCurrentCorona(arrCorrectLetters, key)) {
    arrCorrectLetters.push(key);
  } else {
    arrWrongLetters = arrCorrectLetters;
    arrWrongLetters.push(key);
    arrCorrectLetters = [];
    firstLetter = undefined;
    currentCorona = undefined;
  }
});
//Tìm và set current corona (đc gọi trong bắt sư kiện nhấn phím)
const selectCurrentCorona = () => {
  for (let covid of arrCorona) {
    if (Object.values(covid.character)[1].split("")[0] === firstLetter) {
      currentCorona = covid;
      break;
    }
  }
};
// Kiểm tra từ trong current corona vs key (đc gọi trong bắt sư kiện nhấn phím)
const checkLetterOfCurrentCorona = (arrCorrectLetters, keyPress) => {
  let check = false;
  if (currentCorona != undefined) {
    const idxToCheck = arrCorrectLetters.length;
    const wordLetters = Object.values(currentCorona.character)[1].split("");
    if (keyPress === wordLetters[idxToCheck]) {
      check = true;
    } else {
      check = false;
    }
  }
  return check;
};

//play game
const play = () => {
  isStart = true;
  name_game.style.display = "none";
  btn.style.display = "none";
  btnR.style.display = "none";
  waveText.style.display = "none";
  animation();
};
//bat su kien nut reset
btnR.addEventListener("click", (e) => {
  checkKill = 0;
  arrLength = 0;
  arrCorona = [];
  repeatTime = 0;
  score = 0;
  characters = data.map((e) => e);
  play();
});

//bat su kien nut play
btn.addEventListener("click", (e) => {
  play();
});
