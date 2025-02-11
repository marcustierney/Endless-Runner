class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }
    create() {
        //Display Credits
        this.add.text(game.config.width / 2, 50, 'Audio Credits:', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFD700' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 100, 'FarmMusic.wav by WakuWakuWakuWaku', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 150, 'Farmyard dance mix #1.wav by gpzDave', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 200, 'Game Over Arcade.wav by Mountain_Man', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 250, 'z-moo01.wav by Zozzy', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 300, 'Dog toy, rubber pig, squeak, oink, grunt,', { 
            fontFamily: 'Courier', 
            fontSize: '30px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 330, 'forceful, grunt_96Khz_Mono_', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 360, 'ZoomH4n_NT5.wav by MattRuthSound', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 410, 'Horse Neighing OWI by Gingerhoney', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 460, 'Chicken Single Alarm Call by Rudmer_Rotteveel', { 
            fontFamily: 'Courier', 
            fontSize: '28px', 
            fontStyle: 'bold', 
            color: '#FFFFFF' 
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 550, 'Press (M) for Menu', { 
            fontFamily: 'Courier', 
            fontSize: '32px', 
            fontStyle: 'bold', 
            color: '#843605' 
        }).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M) 
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }    
}