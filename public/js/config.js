const name_game = document.querySelector(".name");
const btn = document.querySelector(".btn-play");
const btnR = document.querySelector(".btn-restart");
const waveText = document.querySelector(".waveText");
const btnPause = document.querySelector(".btn-pause");
const btnContinue = document.querySelector(".btn-continue");
const btnHome = document.querySelector(".btn-home");
const btnHighScore = document.querySelector(".btn-highscore");
const homeScreen = document.querySelector(".home-screen");
const highScoreScreen = document.querySelector(".high-score-screen");
const scrollBoard = document.querySelector(".scrollbar");
const btnBack = document.querySelector(".btn-back");
const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const coronaBlack = new Image();
coronaBlack.src = "./public/images/corona3.png";
const coronaBossImage = new Image();
coronaBossImage.src = "./public/images/boss.png";
const coronaStar = new Image();
coronaStar.src = "./public/images/corona1.png";
const khungDiem = new Image();
khungDiem.src = "./public/images/khungDiem.png";
var imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "./public/images/corona2.png";

imgArray[1] = new Image();
imgArray[1].src = "./public/images/corona4.png";

imgArray[2] = new Image();
imgArray[2].src = "./public/images/corona5.png";

const imgHeart = new Image();
imgHeart.src = "./public/images/heart_boss.png";

const imgShield = new Image();
imgShield.src = "./public/images/shield.png";

const imgSkill = new Image();
imgSkill.src = "./public/images/skill.png";
const imgSkillOff = new Image();
imgSkillOff.src = "./public/images/skilloff.png";

const wave = {
  1: 5,
  2: 10,
  3: 15,
};

const backgroundAudio = new Audio("./public/audio/Background.mp3");
const correctAudio = new Audio("./public/audio/correct.mp3");
const gameoverAudio = new Audio("./public/audio/gameover.mp3");
const incorrectAudio = new Audio("./public/audio/incorrect.mp3");
const winAudio = new Audio("./public/audio/win.mp3");


let arrCorona = [];
const TYPE_NORMAL = 1;
const TYPE_STAR = 2;
const TYPE_BLACK = 3;
const TYPE_BOSS = 4;
let end = false;
let characters = data.map((e) => e);
let bossCharacters = bossData.map((e) => e);
var repeatTime = 0;
let request;
let isStart = false;
let waveIndex = 1;
let firstLetter = undefined;
let currentCorona = undefined;
let arrCorrectLetters = [];
let lastCompleteY = undefined;
let lastCompleteX = undefined;
let opacity = 1;
let isCurrentCorona = false;
let score = 0;
let scoreSkill = 0;
let checkKill = 0;
let arrLength = 0;
let arrWrongLetters = [];
let checkBlack = true;
let coronaBackup = undefined;
let coronaBoss = undefined;
let checkBoss = false;
let bossCharacter = undefined;
let checkColor = false;
let hearts = 5;
let checkAnimation = true;
let shields = 3;
let skillCheck = true;
let firstUse = false;
let isfinished = false;
const highScores = [
  {
    score: 30,
    time: "12/12",
  },
  {
    score: 20,
    time: "1/12",
  },
];

const board = () => {
  scrollBoard.innerHTML = "";
  highScores.sort((a,b)=>{
    return b.score - a.score
  })
  highScores.map((e) => {
    scrollBoard.innerHTML += `<div class="score">
    <div class="number">${e.score}</div>
    <div class="time">${e.time}</div>
  </div>`;
  });

};
board();
