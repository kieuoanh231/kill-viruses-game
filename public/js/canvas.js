const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
//tạo corona
const createCorona = () => {
  //random vị trí character
  let rdIndex = randomNumber(0, characters.length);
  let character = characters[rdIndex];
  characters.splice(rdIndex, 1);
  //Tạo xác suất xuất hiện corona
  let percent = randomNumber(0, 100);
  if (percent > 25) {
    arrLength += 1;
    let image = imgArray[randomNumber(0, imgArray.length)];
    arrCorona.push(new Corona(character, image));
  } else if (percent > 15) {
    arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
  } else {
    arrLength += 1;
    arrCorona.push(new Corona(character, coronaStar, TYPE_STAR));
  }
};

const createCoronaBoss = () => {
  //random vị trí characterBoss
  let rdIndex = randomNumber(0, bossCharacters.length);
  bossCharacter = bossCharacters[rdIndex];
  bossCharacters.splice(rdIndex, 1);
  //tạo coronaBoss
  if (waveIndex >= 3) {
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
// vẽ thông báo điểm
const drawNotification = () => {
  checkAnimation = true;
  if (coronaBackup != undefined) {
    let text = 0;
    if (coronaBackup.type == TYPE_STAR) {
      text = "+2";
    } else if (coronaBackup.type == TYPE_NORMAL) {
      text = "+1";
    } else {
      text = "+3";
    }
    // const text = coronaBackup.type == TYPE_STAR ? "+2" : "+1";
    if (checkAnimation) {
      let y = coronaBackup.y - opacity;
      if (y > coronaBackup.y - 20) {
        ctx.font = "500 20px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(text, coronaBackup.x, y);
        opacity = opacity + 1;
      } else {
        checkAnimation = false;
        opacity = 0;
        coronaBackup = undefined;
      }
    }
  }
};
const drawNotificationWhenUsedSkill = (score) => {
  if (!skillCheck && !firstUse) {
    let y = canvas.height / 2 - opacity;
    if (y > canvas.height / 2 - 20) {
      ctx.font = "600 20px Poppins";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(`+${score}`, canvas.width / 2, y);
      opacity = opacity + 1;
      setTimeout(function () {
        firstUse = true;
        checkAnimation = false;
        opacity = 0;
      }, 300);
    }
  }
};
const drawScore = () => {
  ctx.drawImage(khungDiem, canvas.width - 165, 10, 150, 35);
  ctx.font = "500 20px Poppins";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(`${score}`, canvas.width - 87, 28);
};
// vẽ trái tim
const drawHearts = () => {
  if (checkBoss == true) {
    for (let i = 0; i < hearts; i++) {
      ctx.drawImage(imgHeart, canvas.width - 45 - 25 * i, 55, 20, 20);
    }
  }
};

// vẽ khiên
const drawShield = () => {
  for (let i = 0; i < shields; i++) {
    ctx.drawImage(imgShield, 14 + 35 * i, 10, 28, 28);
  }
};
const drawSkill = () => {
  if (skillCheck) {
    ctx.drawImage(imgSkill, 14, canvas.height - 70, 60, 60);
  } else {
    ctx.drawImage(imgSkillOff, 14, canvas.height - 70, 60, 60);
  }
};
//animation cho corona
const animation = () => {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  isStart = false;
  if (waveIndex >= 3 && checkBoss == false) {
    checkBoss = true;
    createCoronaBoss();
  } else {
    if (repeatTime % 25 == 0) {
      if (arrLength < wave[waveIndex]) {
        createCorona();
      }
    }
  }
  repeatTime += 1.5;
  drawCoronas();
  drawShield();
  drawSkill();
  drawNotificationWhenUsedSkill(scoreSkill);
  drawScore();
  drawHearts();
  completedAWord();
  drawNotification();
  request = requestAnimationFrame(animation);
  finishedWave(wave[waveIndex], repeatTime % 100 == 0);

  if (end) {
    skillCheck = false;
    let date = new Date();
    
    highScores.push({
      score: score,
      time: `${date.getDate()}/${date.getMonth() + 1}`,
    });
    board();
    cancelAnimationFrame(request);
    btnR.style.display = "inline-block";
    btnHome.style.display = "block";
    backgroundAudio.pause();
    if(!isfinished){
    gameoverAudio.currentTime = 0;
    gameoverAudio.play();
    }
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
      console.log(waveIndex);
      if(waveIndex==2){
        waveText.innerHTML = "FINAL";
      }
      else{
        waveText.innerHTML = "WAVE " + (waveIndex+1);
      }
      cancelAnimationFrame(request);
      setTimeout(function () {
        play();
      }, 2000);
      repeatTime = 0;
      waveIndex += 1;
    }
  }
};
//kiểm tra corona chạm khung
const checkWhenCoronaTouchBottom = (covid) => {
  if (covid.y > canvas.height + 30 && covid.type != TYPE_BLACK) {
    characters.push(covid.character);
    removeCorona(covid);
    shields--;
    arrLength--;
    if (shields == 0) {
      end = true;
    }
    incorrectAudio.currentTime = 0;
    incorrectAudio.play();
  } else if (covid.y > canvas.height + 30 && covid.type == TYPE_BLACK) {
    characters.push(covid.character);
    removeCorona(covid);
  }
  if (shields == 0 && checkBoss) {
    removeCorona(arrCorona[0]);
    setTimeout(() => {
      end = true;
    }, 50);
  }
};
// Hoàn thành xong từ
const completedAWord = () => {
  // Xoá corona khi nhập đúng từ trong current corona
  if (
    arrCorrectLetters.length > 0 &&
    arrCorrectLetters.join("") === Object.values(currentCorona.character)[1]
  ) {
    findAndRemoveCoronaWithCorrectLetters();
  }
  if (arrWrongLetters.length > 1 && checkBoss == false) {
    selectCurrentCoronaWithWrongLetters();
  }
};
// Tìm và xoá Corona khi nhập đúng từ trong current corona
const findAndRemoveCoronaWithCorrectLetters = () => {
  if (currentCorona.type != TYPE_BLACK) {
    if (currentCorona.type == TYPE_STAR) {
      score += 2;
    } else if (currentCorona.type == TYPE_NORMAL) {
      score += 1;
    } else {
      score += 3;
    }
    arrCorrectLetters = [];
    coronaBackup = currentCorona;
    if (checkBoss != true) {
      removeCorona(currentCorona);
      checkKill += 1;
      currentCorona = undefined;
      correctAudio.currentTime = 0;
      correctAudio.play();
    } else {
      if (hearts > 1) {
        let rdIndex = randomNumber(0, bossCharacters.length);
        bossCharacter = bossCharacters[rdIndex];
        bossCharacters.splice(rdIndex, 1);
        currentCorona.character = bossCharacter;
        hearts--;
        correctAudio.currentTime = 0;
        correctAudio.play();
      } else {
        removeCorona(currentCorona);
        hearts = 0;
        shields = 0;
        coronaBackup = undefined;
        winAudio.currentTime = 0;
        winAudio.play();
        setTimeout(() => {
          end = true;
          isfinished = true;
        }, 50);
      }
    }
    firstLetter = undefined;
    currentCorona = undefined;
  } else {
    end = true;
    gameoverAudio.currentTime = 0;
    gameoverAudio.play();
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
    } else {
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
  //
  if (key == "enter" && skillCheck && !checkBoss) {
    skillCheck = false;
    let i = 0;
    for (let covid of arrCorona) {
      if (covid.y >= canvas.height / 2 - 100) {
        i++;
        checkKill++;
        if (covid.type == TYPE_STAR) {
          scoreSkill += 2;
        } else if (covid.type == TYPE_NORMAL) {
          scoreSkill += 1;
        } else {
          checkKill--;
        }
      }
    }
    arrCorona.splice(0, i);
    score += scoreSkill;
    correctAudio.currentTime = 0;
    correctAudio.play();
  }
  // Kiểm tra kí tự của current corona vs key
  if (checkLetterOfCurrentCorona(arrCorrectLetters, key)) {
    arrCorrectLetters.push(key);
  } else {
    if (checkBoss) {
      shields--;
    }
    arrWrongLetters = arrCorrectLetters;
    arrWrongLetters.push(key);
    firstLetter = undefined;
    arrCorrectLetters = [];
    currentCorona = undefined;
    if (key != "enter") {
      incorrectAudio.currentTime = 0;
      incorrectAudio.play();
    }
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
  btnPause.style.display = "block";
  btnHighScore.style.display = "none";
  btnHome.style.display = "none";

  animation();
};

//bat su kien nut reset
btnR.addEventListener("click", (e) => {
  reset();
  play();
  backgroundAudio.currentTime = 0;
  backgroundAudio.loop = true;
  backgroundAudio.play();
});
const reset = () => {
  end = false;
  request = 0;
  checkKill = 0;
  arrLength = 0;
  arrCorona = [];
  repeatTime = 0;
  score = 0;
  currentCorona = undefined;
  firstLetter = undefined;
  arrCorrectLetters = [];
  arrWrongLetters = [];
  characters = data.map((e) => e);
  bossCharacters = bossData.map((e) => e);
  waveIndex = 1;
  hearts = 5;
  shields = 3;
  checkBoss = false;
  skillCheck = true;
  firstUse = false;
  scoreSkill = 0;
};
//bat su kien nut play
btn.addEventListener("click", (e) => {
  play();
  backgroundAudio.currentTime = 0;
  backgroundAudio.loop = true;
  backgroundAudio.play();
});
btnPause.addEventListener("click", (e) => {
  if (!end) {
    cancelAnimationFrame(request);
    btnPause.style.display = "none";
    btnContinue.style.display = "block";
    btnHome.style.display = "block";
  }
});
btnContinue.addEventListener("click", (e) => {
  if (!end) {
    play();
    btnContinue.style.display = "none";
    btnPause.style.display = "block";
    btnHome.style.display = "none";
    backgroundAudio.play();
  }
});
btnHighScore.addEventListener("click", (e) => {
  homeScreen.style.display = "none";
  highScoreScreen.style.display = "flex";
});
btnBack.addEventListener("click", (e) => {
  homeScreen.style.display = "flex";
  highScoreScreen.style.display = "none";
});
btnHome.addEventListener("click", (e) => {
  reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  name_game.style.display = "block";
  btn.style.display = "block";
  btnR.style.display = "none";
  waveText.style.display = "none";
  btnPause.style.display = "block";
  btnHighScore.style.display = "block";
  btnContinue.style.display = "none";
  btnPause.style.display = "none";
  btnHome.style.display = "none";
  backgroundAudio.currentTime = 0;
  backgroundAudio.pause();
});
