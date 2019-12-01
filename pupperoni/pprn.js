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
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    function create ()
    {
        this.add.image(400, 300, 'floor');
        platforms = this.physics.add.staticGroup();

        platforms.create(480, 120, 'sofa').setScale(0.35).refreshBody();
       
    }

    function update ()
    {
    }
