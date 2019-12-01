    var config = {
        type: Phaser.AUTO,
        width: 950,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('floor', '/floor.png');
        this.load.image('sofa', '/sofa.png');
        this.load.image('ground', '/black.png');
        this.load.image('wall', '/wall.jpg');
        this.load.spritesheet('dude', 
            '/dog_walkx4.gif',
            { frameWidth: 50, frameHeight: 100 }
        );
    }

    function create ()
    {
        this.add.image(450, 300, 'wall');
        this.add.image(400, 635, 'floor');
        platforms = this.physics.add.staticGroup();

        //platforms.create(480, 120, 'sofa').setScale(0.35).refreshBody();
        platforms.create(400, 615, 'ground').setScale(3).refreshBody();
        
        player = this.physics.add.sprite(300, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //copy and paste, no idea about how to generate player right
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        
        this.physics.add.collider(player, platforms);
    }

    function update ()
    {
    }
