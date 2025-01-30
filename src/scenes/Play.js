class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    create() {
            // place tile sprite
            this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0)
            this.cow = this.add.tileSprite(320, 240, 640, 480, 'cow').setScale(0.1)
            // white borders
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
    }
}

//make up, down, left, right continous movement 