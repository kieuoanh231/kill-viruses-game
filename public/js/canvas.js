const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
//tạo corona
const createCorona = () => {
  let rdIndex = mRandom(0, characters.length);
  let character = characters[rdIndex];
  characters.splice(rdIndex, 1);
  let percent = mRandom(0, 100);
  if (percent > 25) {
    arrLength += 1;
    let image = imgArray[mRandom(0, imgArray.length)];
    arrCorona.push(new Corona(character, image));
  } else
  if (percent > 15) {
    arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
  } else {
    arrLength += 1;
    arrCorona.push(new Corona(character, coronaStar, TYPE_STAR));
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
    covid.draw(isCurrentCorona);
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
  }
  repeatTime += 0.5;
  drawCoronas();
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
      }, 1000);
      repeatTime = 0;
      waveIndex += 1;
      if (waveIndex > 3) {
        waveIndex = 1;
      }
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
    arrCorrectLetters.join("") === Object.values(currentCorona.character)[1]
  ) {
    findAndRemoveCoronaWithCorrectLetters();
  }
  if (arrWrongLetters.length > 1) {
    selectCurrentCoronaWithWrongLetters();
  }
};
// Tìm và xoá Corona khi nhập đúng từ trong current corona
const findAndRemoveCoronaWithCorrectLetters = () => {
  if (currentCorona.type != TYPE_BLACK) {
    score += currentCorona.type == TYPE_STAR ? 2 : 1;
    arrCorrectLetters = [];
    coronaBackup = currentCorona;
    removeCorona(currentCorona);
    checkKill += 1;
    firstLetter = undefined;
    currentCorona = undefined;
  } else {
    end = true;
  }
};
//set current corona  mới nếu có, khi nhập sai từ ở corona đầu tiên
const selectCurrentCoronaWithWrongLetters = () => {
  let count = 0;
  for (let covid of arrCorona) {
    let coronaChar = Object.values(covid.character)[1].slice(
      0,
      arrWrongLetters.length
    );
    if (coronaChar === arrWrongLetters.join("")) {
      arrCorrectLetters = arrWrongLetters;
      arrWrongLetters = [];
      currentCorona = covid;
      break;
    } else if (coronaChar != arrWrongLetters.join("")) {
      count += 1;
    }
  }
  // không có corona nào thoả các từ
  if (count == arrCorona.length) {
    arrWrongLetters = [];
    currentCorona = undefined;
  }
};

// bat su kien nhan phim
document.addEventListener("keypress", (e) => {
  const key = e.key.toLowerCase();
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
    firstLetter = undefined;
    arrCorrectLetters = [];
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
  currentCorona = undefined;
  firstLetter = undefined;
  arrCorrectLetters = [];
  arrWrongLetters =[];
  characters = data.map((e) => e);
  play();
});

//bat su kien nut play
btn.addEventListener("click", (e) => {
  play();
});
