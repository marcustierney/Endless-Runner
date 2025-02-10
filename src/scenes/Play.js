class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
        this.BALL_SPEED = 200;
        this.BALL_SPEED_INCREMENT = 50;
        this.ISPAUSED = false;
        this.ballVelocities = []; // To store each ball's velocity when paused
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
            keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

            this.balls = this.physics.add.group();
            this.time.addEvent({ delay: 1000, callback: this.spawnBall, callbackScope: this, loop: true });
            this.physics.add.overlap(this.player, this.balls, this.gameOver, null, this); //If player touches ball

            this.time.addEvent({delay: 5000, callback: this.increaseBallSpeed, callbackScope: this,loop: true}); //calls increaseBallSpeed

            this.pauseText = this.add.text(width / 2, height / 2, 'PAUSED', {
                fontSize: '48px',
                fill: '#fff',
                fontStyle: 'bold',
            }).setOrigin(0.5).setVisible(false);
    }

    spawnBall() {
        let edge = Phaser.Math.Between(0, 3); //random edge of the screen
        let x, y, velocityX, velocityY, ballType;

        let isDiagonal = Phaser.Math.Between(0, 3) === 0; // 25% chance of diagonal movement
        let isBigBall = Phaser.Math.Between(0, 4) === 0; // 20% chance for a big ball

        if (isBigBall) {
            ballType = 'big-ball';
            switch (edge) {
                case 0: // Top edge
                    x = Phaser.Math.Between(0, width);
                    y = 0;
                    velocityX = 0;
                    velocityY = this.BALL_SPEED * 0.5;
                    ballType = 'big-ball'; // Standard ball asset
                    break;
                case 1: // Bottom edge
                    x = Phaser.Math.Between(0, width);
                    y = height;
                    velocityX = 0;
                    velocityY = -this.BALL_SPEED * 0.5;
                    ballType = 'big-ball'; // Standard ball asset
                    break;
                case 2: // Left edge
                    x = 0;
                    y = Phaser.Math.Between(0, height);
                    velocityX = this.BALL_SPEED * 0.5;
                    velocityY = 0;
                    ballType = 'big-ball'; // Standard ball asset
                    break;
                case 3: // Right edge
                    x = width;
                    y = Phaser.Math.Between(0, height);
                    velocityX = -this.BALL_SPEED * 0.5;
                    velocityY = 0;
                    ballType = 'big-ball'; // Standard ball asset
                    break;
            }
        }
        else if (isDiagonal) {
            // Diagonal ball movement
            let diagonalDirection = Phaser.Math.Between(0, 3); // Random diagonal direction
            switch (diagonalDirection) {
                case 0: // Top-left
                    x = width;
                    y = height;
                    velocityX = -this.BALL_SPEED * 1.2;
                    velocityY = -this.BALL_SPEED * 1.2;
                    ballType = 'ball-diagonal'; // Diagonal ball asset
                    break;
                case 1: // Top-right
                    x = 0;
                    y = height;
                    velocityX = this.BALL_SPEED * 1.2;
                    velocityY = -this.BALL_SPEED * 1.2;
                    ballType = 'ball-diagonal'; // Diagonal ball asset
                    break;
                case 2: // Bottom-left
                    x = width;
                    y = 0;
                    velocityX = -this.BALL_SPEED * 1.2;
                    velocityY = this.BALL_SPEED * 1.2;
                    ballType = 'ball-diagonal'; // Diagonal ball asset
                    break;
                case 3: // Bottom-right
                    x = 0;
                    y = 0;
                    velocityX = this.BALL_SPEED * 1.2;
                    velocityY = this.BALL_SPEED * 1.2;
                    ballType = 'ball-diagonal'; // Diagonal ball asset
                    break;
            }
        } else {
            // Standard edge spawning
            switch (edge) {
                case 0: // Top edge
                    x = Phaser.Math.Between(0, width);
                    y = 0;
                    velocityX = 0;
                    velocityY = this.BALL_SPEED;
                    ballType = 'ball'; // Standard ball asset
                    break;
                case 1: // Bottom edge
                    x = Phaser.Math.Between(0, width);
                    y = height;
                    velocityX = 0;
                    velocityY = -this.BALL_SPEED;
                    ballType = 'ball'; // Standard ball asset
                    break;
                case 2: // Left edge
                    x = 0;
                    y = Phaser.Math.Between(0, height);
                    velocityX = this.BALL_SPEED;
                    velocityY = 0;
                    ballType = 'ball2'; // Standard ball asset
                    break;
                case 3: // Right edge
                    x = width;
                    y = Phaser.Math.Between(0, height);
                    velocityX = -this.BALL_SPEED;
                    velocityY = 0;
                    ballType = 'ball2'; // Standard ball asset
                    break;
            }
        }
        let ball = this.balls.create(x, y, ballType);
        ball.setVelocity(velocityX, velocityY);
        ball.setCollideWorldBounds(false);
        if (ballType === 'big-ball') {
            ball.setScale(.6);
        }
        else if (ballType === 'ball-diagonal') {
            ball.setScale(.1);
        }
        else {
            ball.setScale(.2);
        }
        this.ballVelocities.push({ ball: ball, velocity: ball.body.velocity.clone() }); // Store ball velocity
    }

    increaseBallSpeed() {
        this.BALL_SPEED += this.BALL_SPEED_INCREMENT; // Increase ball speed
    }

    togglePause() {
        this.ISPAUSED = !this.ISPAUSED; // Toggle pause state

        if (this.ISPAUSED) {
            // Pause the game (no updates should happen)
            console.log('paused');
            this.time.paused = true;  // Pause the timer events as well
            this.player.setVelocity(0, 0);

            // Store all ball velocities
            this.balls.children.iterate((ball) => {
                if (ball && ball.active) {
                    this.ballVelocities.push({ ball: ball, velocity: ball.body.velocity.clone() });
                    ball.setVelocity(0, 0);  // Stop ball movement
                }
            });
            this.pauseText.setVisible(true);

        } else {
            // Resume the game
            console.log('resumed');
            this.time.paused = false; // Resume the timer events

            
            // Restore all ball velocities to their previous states
            this.ballVelocities.forEach((ballData) => {
                if (ballData.ball && ballData.ball.active) {
                    ballData.ball.setVelocity(ballData.velocity.x, ballData.velocity.y);
                }
            });
            // Clear the ball velocities list once resumed
            this.ballVelocities = [];
            this.pauseText.setVisible(false);

        }
    }

    update() { //Continuous movement
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.togglePause();
            console.log(this.ISPAUSED)
        }

        if (this.ISPAUSED) {
            return;
        }
       

        // if (this.ISPAUSED) return; // Stop updates when paused

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

