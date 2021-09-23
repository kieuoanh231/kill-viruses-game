const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');

const coronaBlack = new Image()
coronaBlack.src='./public/images/corona3.png'

const corona = new Image()
corona.src='./public/images/corona1.png'

var imgArray = new Array();
imgArray[0]=new Image()
imgArray[0].src='./public/images/corona2.png'

imgArray[1]=new Image()
imgArray[1].src='./public/images/corona4.png'

imgArray[2]=new Image()
imgArray[2].src='./public/images/corona5.png'

imgArray[3]=new Image()
imgArray[3].src='./public/images/corona6.png'

let arrCorona=[];
const TYPE_NORMAL = 1;
const TYPE_STAR = 2;
const TYPE_BLACK = 3;