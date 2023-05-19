let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 480,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [ Overworld ]
}

const game = new Phaser.Game(config);