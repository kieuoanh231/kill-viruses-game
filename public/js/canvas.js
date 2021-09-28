const mRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createCorona = () => {
  if (repeatTime % 100 === 0) {
    let rdIndex = mRandom(0, selected.length);
    let character = selected[rdIndex];

    selected.splice(rdIndex, 1);
    console.log(selected);
    let percent = mRandom(0, 100);

    if (percent > 20) {
      let image = imgArray[mRandom(0, imgArray.length)];
      arrCorona.push(new Corona(character, image));
    } else if (percent > 15) {
      arrCorona.push(new Corona(character, coronaBlack, TYPE_BLACK));
    } else {
      arrCorona.push(new Corona(character, coronaStar, TYPE_STAR));
    }
  }
};

const checkLose = () => {
  for (let covid of arrCorona) {
    if (covid.y > canvas.height && covid.type != TYPE_BLACK) {
      end = true;
    }
  }
};

const animation = () => {
  isStart = false;

  createCorona();
  request = requestAnimationFrame(animation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  repeatTime += 0.5;
  for (let covid of arrCorona) {
    covid.draw();
    covid.update();
  }
  wordComplete();

  // checkRound(selected);
  // checkLose();
  // if (end) {
  //   cancelAnimationFrame(request);
  //   btnR.style.display = "inline-block";
  //   end = false;
  // }
};
function checkRound(arr) {
  if (arr.length == 0 && roundNumber <= 5) {
    selected = shuffled.slice(0, round[roundNumber + 1]);
  }
}
btnR.addEventListener("click", (e) => {
  arrCorona = [];
  repeatTime = 0;
  characters = data.map((e) => e);
  play();
});
btn.addEventListener("click", (e) => {
  play();
});

function play() {
  name_game.style.display = "none";
  btn.style.display = "none";
  btnR.style.display = "none";
  selected = shuffled.slice(0, round[roundNumber]);
  animation();
  // window.addEventListener("keypress", (e) => {
  //   if (e.keyCode == 13 && !isStart && repeatTime == 0) {
  //     animation();
  //     isStart = true;
  //   }
  // });
}
// const keyPress = () =>{
document.addEventListener("keypress", (e) => {
  const key = e.key;
  if (currentCorona === undefined) {
    firstLetter = key;
    checkcurrentCorona();
  }
  if (matchescurrentCorona(correctLettersTyped, key)) {
    correctLettersTyped.push(key);
  }

});
// }
const checkcurrentCorona = () => {
  for (let covid of arrCorona) {
    if (Object.values(covid.character)[1].split("")[0] === firstLetter) {
      currentCorona = covid;
    }
  }
};

function matchescurrentCorona(correctLetters, keyPress) {
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
}
const removeCorona = (corona) => {
  
  let coronaIndex = selected.indexOf(corona);
  console.log(coronaIndex);
  // characters.push(corona.character)
  // selected.splice(coronaIndex, 1)
}
const wordComplete = () => {
  // console.log(correctLettersTyped.join(""));
  
  if (
    correctLettersTyped.length > 0 &&
    correctLettersTyped.join("") === Object.values(currentCorona.character)[1]
  ) {
    correctLettersTyped = [];
    removeCorona(currentCorona);
    firstLetter = undefined;
    currentCorona = undefined;
  }
};
