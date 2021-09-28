const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const coronaBlack = new Image();
coronaBlack.src = "./public/images/corona3.png";

const coronaStar = new Image();
coronaStar.src = "./public/images/corona1.png";

var imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "./public/images/corona2.png";

imgArray[1] = new Image();
imgArray[1].src = "./public/images/corona4.png";

imgArray[2] = new Image();
imgArray[2].src = "./public/images/corona5.png";

imgArray[3] = new Image();
imgArray[3].src = "./public/images/corona6.png";

const round = {
  1: 5,
  2: 7,
  3: 10,
  4: 15,
  5: 20,
};

let arrCorona = [];
const TYPE_NORMAL = 1;
const TYPE_STAR = 2;
const TYPE_BLACK = 3;
let end = false;
let characters = data.map((e) => e);
var repeatTime = 0;
let request;
let isStart = false;
const shuffled = characters.sort(() => 0.5 - Math.random());
let selected;
let roundNumber = 1;
let firstLetter = undefined;
let currentCorona = undefined;
let correctLettersTyped = [];
// let gameFrame=0;
