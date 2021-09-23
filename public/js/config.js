const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');
 
const corona = new Image()
corona.src='./public/images/corona1.png'

const coronaBlack = new Image()
coronaBlack.src='./public/images/corona3.png'

let arrCorona=[];


const TYPE_NORMAL = 1;
const TYPE_STAR = 2;
const TYPE_BLACK = 3;

let gameFrame = 0
let round=1
