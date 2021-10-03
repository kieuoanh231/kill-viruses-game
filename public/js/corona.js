class Corona {
  constructor(character, image, type = TYPE_NORMAL) {
    this.x = mRandom(30, canvas.width - 30);
    this.y = -30;
    this.character = character;
    this.image = image;
    this.type = type;
    this.vx = 0.5;
  }

  update() {
    if (checkBoss == true) {
      if (this.y == canvas.height / 2 - 30) {
        this.y = canvas.height / 2 - 30;
        let bossX = false;
        //Boss chạy từ trái sang phải phải sang trái
        this.x += this.vx;
        if (
          this.x + 261.5 + this.vx > canvas.width ||
          this.x - 261.5 + this.vx < 0
        ) {
          this.vx = -this.vx;
        }
      } else {
        this.y += 1;
      }
    } else {
      this.y += 0.5;
    }
  }

  // draw() {
  //   ctx.drawImage(this.image, this.x - 35, this.y - 35, 70, 70);
  //   this.#drawText();
  // }
  draw(check, checkB) {
    if (checkB == true) {
      ctx.drawImage(this.image, this.x - 261.5, this.y - 167.5, 523, 337);
    } else {
      ctx.drawImage(this.image, this.x - 35, this.y - 35, 70, 70);
    }
    
    if (check == false) {
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
    if (checkBoss == true) {
      ctx.fillStyle = "#2a2363";
      ctx.font = "500 50px Poppins";
      ctx.fillText(this.character.hiragana, this.x, this.y + 130);
    } else {
      ctx.fillText(this.character.hiragana, this.x, this.y);
    }
  }
  #drawText2() {
    ctx.font = "500 20px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    if (checkBoss == true) {
      ctx.font = "500 50px Poppins";
      ctx.fillText(this.character.hiragana, this.x, this.y + 130);
    } else {
      ctx.fillText(this.character.hiragana, this.x, this.y);
    }
  }
}
