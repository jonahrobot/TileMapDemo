class Overworld extends Phaser.Scene{
    constructor(){
        super({key:"overworldScene"})

        this.VEL = 100;
    }

    preload(){
        this.load.path = './assets/';

        this.load.spritesheet("slime", "slime.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("tilesetImages", 'tileset.png');

        this.load.tilemapTiledJSON("map0","area_01.json")
    }

    create(){

        const map = this.add.tilemap("map0");
        const tileset = map.addTilesetImage("Tileset","tilesetImages");

        // Add layers
        const bgLayer = map.createLayer("Background", tileset, 0, 0)
        const terrainLayer = map.createLayer("Terrain", tileset, 0, 0)
        const treeLayer = map.createLayer("Trees", tileset, 0, 0).setDepth(10);

        // Create player
        this.slime = this.physics.add.sprite(32,32,'slime',0)

        // Create animations
        this.anims.create({
           key: 'jiggle',
           frameRate: 2,
           repeat: -1,
           frames: this.anims.generateFrameNumbers("slime", {
            start:0,
            end: 1
           })
        })

        this.slime.play('jiggle');

        // Do physics collisions
        this.slime.body.setCollideWorldBounds(true);

        // enable collision
        terrainLayer.setCollisionByProperty({Collides: true});
        treeLayer.setCollisionByProperty({Collides: true});
        this.physics.add.collider(this.slime,terrainLayer);
        this.physics.add.collider(this.slime,treeLayer);
        
        // Cameras setup
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.slime,true,0.25,0.25)

        this.physics.world.bounds.setTo(0,0,map.widthInPixels,map.heightInPixels);

        // Input Setup
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        this.dir = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            this.dir.x = -1;
        }else{
            if(this.cursors.right.isDown){
                this.dir.x = 1;
            }
        }

        if(this.cursors.up.isDown){
            this.dir.y = -1;
        }else{
            if(this.cursors.down.isDown){
                this.dir.y = 1;
            }
        }
        
        this.dir.normalize();

        this.slime.setVelocity(this.VEL * this.dir.x, this.VEL * this.dir.y);
    }
}