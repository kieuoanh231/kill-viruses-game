const canvas = document.querySelector('.game');
const c = canvas.getContext('2d');
var img = new Image();
img.onload = function() {
    c.drawImage(img, 50, 50,50,50);
};
// img.src = './public/images/corona1.png';