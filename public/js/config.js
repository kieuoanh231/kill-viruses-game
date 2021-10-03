const name_game = document.querySelector(".name");
const btn = document.querySelector(".btn-play");
const btnR = document.querySelector(".btn-restart");
const waveText = document.querySelector(".waveText");
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
const khungVang = new Image();
khungVang.src = "./public/images/khungVang.png";
var imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "./public/images/corona2.png";

imgArray[1] = new Image();
imgArray[1].src = "./public/images/corona4.png";

imgArray[2] = new Image();
imgArray[2].src = "./public/images/corona5.png";

imgArray[3] = new Image();
imgArray[3].src = "./public/images/corona6.png";

const wave = {
  1: 50,
  2: 2,
  3: 3,
};

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
let checkKill= 0;
let arrLength=0;
let arrWrongLetters=[];
let checkBlack=true;
let coronaBackup = undefined;
let coronaBoss = undefined;
let checkBoss=false;
let bossCharacter=undefined;
let checkColor=false;
// let gameFrame=0;
