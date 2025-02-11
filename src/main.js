/*
Marcus Tierney
Farm Attack
20 Hours
I am proud of having implemented a various amount of different enmeies which all have different behaviors. I am also proud of implementing a pause button using a list which stores the velocity of each enemy on the screen when the pause button is pressed (scene.pause() and scene.resume() wouldn't work because it would change the velocity of the enemies).
This is not the traditional endless runner in that the player has more control over their movement as they're allowed to move in all directions freely. 
*/
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
          debug: false,
      } 
    },
    scene: [Menu, Play, Over, Credits]
  }

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE, keyESC, keyR, keyM, keyC
