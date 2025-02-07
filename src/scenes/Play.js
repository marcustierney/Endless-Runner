class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
        this.BALL_SPEED = 200;
        this.BALL_SPEED_INCREMENT = 50;
    }

    create() {
            // Place tile sprite
            this.background = this.add.tileSprite(0, 0, 800, 800, 'background').setOrigin(0, 0)
            //Add normalized sprite movement
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

            this.balls = this.physics.add.group();
            this.time.addEvent({ delay: 1000, callback: this.spawnBall, callbackScope: this, loop: true });
            this.physics.add.overlap(this.player, this.balls, this.gameOver, null, this); //If player touches ball

            this.time.addEvent({delay: 5000, callback: this.increaseBallSpeed, callbackScope: this,loop: true}); //calls increaseBallSpeed
    }

    spawnBall() {
        let edge = Phaser.Math.Between(0, 3); //random edge of the screen
        let x, y, velocityX, velocityY;

        switch (edge) {
            case 0: // Top edge
                x = Phaser.Math.Between(0, width);
                y = 0;
                velocityX = 0;
                velocityY = this.BALL_SPEED;
                break;
            case 1: // Bottom edge
                x = Phaser.Math.Between(0, width);
                y = height;
                velocityX = 0;
                velocityY = -this.BALL_SPEED;
                break;
            case 2: // Left edge
                x = 0;
                y = Phaser.Math.Between(0, height);
                velocityX = this.BALL_SPEED;
                velocityY = 0;
                break;
            case 3: // Right edge
                x = width;
                y = Phaser.Math.Between(0, height);
                velocityX = -this.BALL_SPEED;
                velocityY = 0;
                break;
        }

        let ball = this.balls.create(x, y, 'ball');
        ball.setVelocity(velocityX, velocityY);
        ball.setCollideWorldBounds(false);
        ball.setScale(1.5);
    }

    increaseBallSpeed() {
        this.BALL_SPEED += this.BALL_SPEED_INCREMENT; // Increase ball speed
    }


    update() { //Continuous movement
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
        if (playerVector.length() == 0) { 
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

        this.balls.children.iterate((ball) => {
            if (ball && ball.active) {  // Ensure ball exists before accessing properties
                if (ball.x < -50 || ball.x > this.scale.width + 50 || ball.y < -50 || ball.y > this.scale.height + 50) {
                    ball.destroy();
                }
            }
        });
    }

    gameOver() {
        this.scene.restart();
    }    
}

