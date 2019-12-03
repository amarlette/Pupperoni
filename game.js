// Create a create() function here:

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#a0a0dd",
    pixelArt: true,
    // Add in the scene information in the config here:
    scene: {
        create,
        update,
        preload
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }

};
// var opening = new Phaser.Scene('opening');

// var scene1 = new Phaser.Scene('Scene1');
// var scene2 = new Phaser.Scene('Scene2');
// var scene3 = new Phaser.Scene('Scene3');
const game = new Phaser.Game(config);
var map;
var tileset;
var player;
var enemy1;
let cursors;
// const belowLayer;
// const worldLayer;
var image;
var text;
var messagecount = 0;
var count = 0;
var level = 1;
var message = [
    "Yesterday, my master named me PUPPER and brought me into this strange, new place",
    "Oh no, my master just left me in this strange, big house!"
]

function preload() {
    this.load.image("livingroom", "assets/environment/livingroom.png");
    this.load.image("bone", "assets/sprites/bones.png");
    // this.load.image("tiles", "assets/pupperonitilesheet.png");
    // this.load.tilemapTiledJSON("map", "assets/livingroom.json");
    this.load.image("tiles", "assets/pupperonitilesheet.png");
    this.load.tilemapTiledJSON("map", "assets/livingroom.json");

    this.load.spritesheet("ship", "assets/anipup1.png", {
        frameWidth: 30,
        frameHeight: 40
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
        frameWidth: 32,
        frameHeight: 16
    });
}

function create() {
    //image = this.add.image(400, 300, 'background');
    text = this.add.text(300, 300, 'Pupperoni');
    timedEvent = this.time.addEvent({ delay: 500, callback: onEvent, callbackScope: this, loop: true });
    map = this.make.tilemap({ key: "map" });
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    tileset = map.addTilesetImage("pupperonitilesheet", "tiles");



    const anims = this.anims;
    this.anims.create({
        key: "ship1_anim",
        frames: this.anims.generateFrameNumbers("ship"),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: "ship2_anim",
        frames: this.anims.generateFrameNumbers("ship2"),
        frameRate: 20,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.once("keydown_D", event => {
        // Turn on physics debugging to show player's hitbox
        this.physics.world.createDebugGraphic();

        // Create worldLayer collision graphic above the player, but below the help text
        const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
        worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    });
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    //const belowLayer = map.createStaticLayer("below", tileset, 0, 0);
}

function update() {
    //text = this.add.text(300, 300, "Blah");
    if (messagecount === 3) {
        image = this.add.image(400, 300, 'livingroom');
        text = this.add.text(30, 30, 'Bones'); //text = this.add.text(20, 20, 'Bones');
        const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        player = this.physics.add
            .sprite(config.width / 2 - 50, (config.height + 10) / 2, "ship")
            .setSize(30, 40)
            .setOffset(0, 24);
        enemy1 = this.physics.add
            .sprite(150, 400, "ship2")
            .setSize(30, 40)
            .setOffset(0, 24);
        this.physics.add.collider(player, worldLayer);
        worldLayer.setCollisionByProperty({ collides: true });


        // this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
        // this.ship1.play("ship1_anim");
        messagecount++;
        //this.bone = this.add.image(config.width / 2 - 50, config.height / 2, "bone");
        // const map = this.make.tilemap({ key: 'map' });
        // const tileset = map.addTilesetImage('pupperonitilesheet', 'tiles');
        // const belowLayer = map.createStaticLayer('below', tileset, 0, 0);
        // const worldLayer = map.createStaticLayer('world', tileset, 32, 32);
    } else if (messagecount === 4) {
        const speed = 175;
        const prevVelocity = player.body.velocity.clone();

        // Stop any previous movement from the last frame
        player.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);
        //ship2.moveShip(this.ship2, 1);

    }
}

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

function moveEnemy(enemy, speed) {
    if (enemy.x > 100 && enemy.x < 700 && enemy.x > (config.height / 2)) {
        enemy.x += speed;
    } else if (enemy.x == 100) {
        enemy.y += speed;
    } else if (enemy.x == 700) {
        enemy.y -= speed;
    } else {
        enemy.x -= speed
    }
}