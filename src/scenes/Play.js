class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    create() {
            // place tile sprite
            this.background = this.add.tileSprite(0, 0, 800, 800, 'background').setOrigin(0, 0)
            // white borders
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
            //add normalized sprite movement
            this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2)
            this.player.body.setCollideWorldBounds(true)
            this.player.body.setSize(32, 32).setOffset(8, 16)
    
            this.anims.create({
                key: 'idle-down',
                frameRate: 0, 
                repeat: -1,
                frames: this.anims.generateFrameNames('character', {
                    start: 1,
                    end: 1
                })
            })
    
            this.anims.create({
                key: 'walk-down',
                frameRate: 5, 
                repeat: -1,
                frames: this.anims.generateFrameNames('character', {
                    start: 0,
                    end: 2
                })
            })
    
            this.anims.create({
                key: 'walk-up',
                frameRate: 5, 
                repeat: -1,
                frames: this.anims.generateFrameNames('character', {
                    start: 9,
                    end: 11
                })
            })
    
            this.anims.create({
                key: 'walk-left',
                frameRate: 5, 
                repeat: -1,
                frames: this.anims.generateFrameNames('character', {
                    start: 3,
                    end: 5
                })
            })
    
            this.anims.create({
                key: 'walk-right',
                frameRate: 5, 
                repeat: -1,
                frames: this.anims.generateFrameNames('character', {
                    start: 6,
                    end: 8
                })
            })
    
            cursors = this.input.keyboard.createCursorKeys()
    }


    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        // Check for input and update last direction
        if (cursors.left.isDown) {
            playerVector.x = -1
            this.lastDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            this.lastDirection = 'right'
        }
        
        if (cursors.up.isDown) {
            playerVector.y = -1
            this.lastDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1
            this.lastDirection = 'down'
        }
        
        // Normalize for consistent speed
        playerVector.normalize()
        
        // If no input, continue moving in last direction
        if (playerVector.length() === 0) {
            switch (this.lastDirection) {
                case 'left':
                    playerVector.x = -1;
                    break;
                case 'right':
                    playerVector.x = 1;
                    break;
                case 'up':
                    playerVector.y = -1;
                    break;
                case 'down':
                    playerVector.y = 1;
                    break;
            }
        }
        // Apply velocity
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y);
        // Determine movement state
        let playerMovement = 'walk'; // Always walking
        this.player.play(playerMovement + '-' + this.lastDirection, true);
    }
        
}

//make up, down, left, right continous movement 