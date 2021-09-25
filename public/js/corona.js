class Corona {
  constructor(character, image, type = TYPE_NORMAL) {
    this.x = mRandom(30, canvas.width - 30);
    this.y = -20;
    this.character = character;
    this.image = image;
    this.type = type;
  }

  update() {
    this.y += 0.5;
    this.draw();
  }

  draw() {
    ctx.drawImage(this.image, this.x-35, this.y-35, 70, 70);
    this.drawText();
  }

  drawText() {
    ctx.font = "500 20px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(this.character.hiragana, this.x, this.y);
  }
}
