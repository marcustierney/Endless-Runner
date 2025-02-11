class Over extends Phaser.Scene {
    constructor() {
        super('overScene')
    }
    preload() {
        this.load.image('gameover-bg', './assets/menu-background.png');
    }
    init(data) {
        this.finalScore = data.finalScore || 0; // Get elapsed time, default to 0 if undefined
        this.highScore = localStorage.getItem('highScore') ? parseFloat(localStorage.getItem('highScore')) : 0;
        // Update high score if current score is greater
        if (this.finalScore > this.highScore) {
            this.highScore = this.finalScore;
            localStorage.setItem('highScore', this.highScore); // Save new high score
        }
    }

    create() {
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#843605',
            align: 'right',
            fixedWidth: 0
        }

        this.add.text(game.config.width / 2, 100, 'YOUR SCORE', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FF0000' 
        }).setOrigin(0.5);

        this.add.text(game.config.width / 2, 150, this.finalScore  + ' Points', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);

        // Display "HIGH SCORE"
        this.add.text(game.config.width / 2, 200, 'HIGH SCORE', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFD700' 
        }).setOrigin(0.5);

        // Display the highest score
        this.add.text(game.config.width / 2, 250, this.highScore + ' Points', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', overConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', overConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (M) for Menu', overConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 192, 'Press (C) for Credits', overConfig).setOrigin(0.5)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditScene')
        }
    }
}
