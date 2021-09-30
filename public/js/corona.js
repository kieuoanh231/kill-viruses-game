class Corona {
  constructor(character, image, type = TYPE_NORMAL) {
    this.x = mRandom(30, canvas.width - 30);
    this.y = -30;
    this.character = character;
    this.image = image;
    this.type = type;
  }

  update() {
    this.y += 0.5;
  }

  // draw() {
  //   ctx.drawImage(this.image, this.x - 35, this.y - 35, 70, 70);
  //   this.#drawText();
  // }
  draw(check = true) {
    ctx.drawImage(this.image, this.x - 35, this.y - 35, 70, 70);
    if (check == false ) {
      this.#drawText();
    } else {
      this.#drawText2();
    }
  }

  #drawText() {
    ctx.font = "500 20px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(this.character.hiragana, this.x, this.y);
  }
  #drawText2() {
    ctx.font = "500 20px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    ctx.fillText(this.character.hiragana, this.x, this.y);
  }
}
