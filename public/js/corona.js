class Corona {
  constructor(character, image, type = TYPE_NORMAL) {
    this.x = mRandom(30, canvas.width - 30);
    this.y = -20;
    this.character = character;
    this.image = image;
    this.type = type;
  }

    //   update() {
    //     this.y += 0.5;
    //   }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, 70, 70);
  }
}
