class Corona {
    constructor(character, image, type = TYPE_NORMAL) {
        this.x = 20;
        this.y = -20;
        this.character = character;
        this.image = image;
        this.type = type;
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,80,80)
    }
}