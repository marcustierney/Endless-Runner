class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/background.png')
        this.load.image('ball', './assets/ball.png')
        this.load.image('ball2', './assets/ball2.png')
        this.load.image('big-ball', './assets/big-ball.png')
        this.load.image('ball-diagonal', './assets/ball-diagonal.png')
        this.load.spritesheet('character', './assets/Character_002.png', {
            frameWidth: 48
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
    }
    

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'COW DAY', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACEBAR To Start', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)     
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC) 
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // play
          this.scene.start('playScene')    
        }
      }
}