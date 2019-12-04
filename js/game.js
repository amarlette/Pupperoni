// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
var level = 1;
var messagecount = 0;
var count = 0;
var message = [
    "Yesterday, my master named me PUPPER and brought me into this strange, new place",
    "Oh no, my master just left me in this strange, big house!"
]


// some parameters for our scene
gameScene.init = function() {
    this.playerSpeed = 2;
    this.enemySpeed = 0.5;
    this.enemyMaxY = 480;
    this.enemyMinY = 320;
}

// load asset files for our game
gameScene.preload = function() {

    // load images
    this.load.image('livingroom', 'assets/livingroom1.png');
    this.load.image('kitchen', 'assets/kitchen.png');
    this.load.image('bathroom', 'assets/bathroom.png');


    this.load.image("tiles", "assets/pupperonitilesheet.png");
    this.load.tilemapTiledJSON("map", "assets/livingroom.json");

    //this.load.image('player', 'assets/anipup1.png');
    //this.load.image('enemy1', 'assets/biggerroomba1.png');
    this.load.image('treasure', 'assets/bone.png');
    this.load.spritesheet('pup', 'assets/anipup1.png', {
        frameWidth: 32,
        frameHeight: 40
    });
    this.load.spritesheet('roomba', 'assets/biggerroomba1.png', {
        frameWidth: 96,
        frameHeight: 40
    });

    this.load.spritesheet('trash', 'assets/anitrash1.png', {
        frameWidth: 96,
        frameHeight: 120
    });

    this.load.spritesheet('toilet', 'assets/anitoilets1.png', {
        frameWidth: 112,
        frameHeight: 120
    });

    text = this.add.text(300, 300, 'Pupperoni');
    text.setWordWrapWidth(200);
    text.setAlign('center');
};

// executed once, after assets were loaded
gameScene.create = function() {
    if (level == 0) {
        count++;
        if (count % 1000 === 0) {
            text.setText(message[messagecount++]);
        }

        if (messagecount === 3) {
            level++;
        }

    } else

    if (level == 1) {

        // livingroom
        let bg = this.add.sprite(0, 0, 'livingroom');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        // player
        this.player = this.add.sprite(40, 350, 'player');
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('pup', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'pup', frame: 7 }],
            frameRate: 20
        });

        // scale down
        this.player.setScale(1.5);

        // goal
        this.treasure = this.add.sprite(this.sys.game.config.width - 80, 350, 'treasure');
        //this.treasure.setScale(0.6);

        // group of enemies
        this.enemies = this.add.group({
            key: 'enemy1',
            repeat: 1 + level,
            setXY: {
                x: 150,
                y: 350,
                stepX: 200,
                stepY: 20
            }
        });
        //ROOMBA ANIMATION
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('roomba', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        //Toilet Animation
        this.anims.create({
            key: 'flush',
            frames: this.anims.generateFrameNumbers('toilet', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        //TRASH ANIMATION
        this.anims.create({
            key: 'hide',
            frames: this.anims.generateFrameNumbers('trash', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

    } else if (level == 2) {

        // livingroom
        let bg = this.add.sprite(0, 0, 'kitchen');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        // player
        this.player = this.add.sprite(40, 350, 'player');

        // scale up
        this.player.setScale(1.5);

        // goal
        this.treasure = this.add.sprite(this.sys.game.config.width - 80, 350, 'treasure');
        //this.treasure.setScale(0.6);

        // group of enemies
        this.enemies = this.add.group({
            key: 'enemy2',
            repeat: 1 + level,
            setXY: {
                x: 150,
                y: 350,
                stepX: 175,
                stepY: 20
            }
        });
    } else if (level == 3) {

        // livingroom
        let bg = this.add.sprite(0, 0, 'bathroom');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        // player
        this.player = this.add.sprite(40, 350, 'player');

        // scale down
        this.player.setScale(1.5);

        // goal
        this.treasure = this.add.sprite(this.sys.game.config.width - 80, 350, 'treasure');
        //this.treasure.setScale(0.6);

        // group of enemies
        this.enemies = this.add.group({
            key: 'enemy3',
            repeat: 1 + level,
            setXY: {
                x: 150,
                y: 350,
                stepX: 120,
                stepY: 20
            }
        });
    } else if (level == 4) {

        // livingroom
        let bg = this.add.sprite(0, 0, 'end');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);
    }

    // scale enemies
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
    //Phaser.Actions.ScaleXY(this.player, 0.5, 0.5);

    // set speeds
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 2 + 1;
    }, this);



    // player is alive
    this.isPlayerAlive = true;

    // reset camera
    this.cameras.main.resetFX();
};

// executed on every frame (60 times per second)
gameScene.update = function() {
    // only if the player is alive
    if (!this.isPlayerAlive) {
        return;
    }

    // check for active input
    if (this.input.activePointer.isDown) {

        // player walks
        this.player.x += this.playerSpeed;
        this.player.anims.play('walk', true);
    } else {
        this.player.anims.play('idle', true);

    }

    if (this.input.activePointer.isDown && level == 0) {

        level = 1;
    }


    // treasure collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        level++
        this.gameOver();

    }

    // enemy movement and collision
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    let currentLevel = level;

    for (let i = 0; i < numEnemies; i++) {

        // move enemies
        enemies[i].y += enemies[i].speed;
        if (currentLevel == 1) {
            enemies[i].anims.play('move', true);

        } else if (currentLevel == 2) {
            enemies[i].anims.play('hide', true);
        } else {
            enemies[i].anims.play('flush', true);
        }

        // reverse movement if reached the edges
        if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
            enemies[i].speed *= -1;
        } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
            enemies[i].speed *= -1;
        }

        // enemy collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
            this.gameOver();
            break;
        }
    }
};


gameScene.gameOver = function() {

    // flag to set player is dead
    this.isPlayerAlive = false;

    // shake the camera
    this.cameras.main.shake(500);

    // fade camera
    this.time.delayedCall(250, function() {
        this.cameras.main.fade(250);
    }, [], this);

    // restart game
    this.time.delayedCall(500, function() {
        this.scene.restart();
    }, [], this);
};

function onEvent() {
    //image.rotation += 0.04;
    text.setWordWrapWidth(200);
    text.setAlign('center');
    count++;

    if (count % 10 == 0 && messagecount < 3) {
        text.setText(message[messagecount++]);
    }
    // else if (messagecount === 3) {
    //     timedEvent.remove(false);
    // }

}



// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);