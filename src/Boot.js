class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'img/background.png');
        this.load.image('predios', 'img/predios.png');
        this.load.image('logo-enclave', 'img/logo-enclave.png');
        this.load.image('tile2', 'img/tile2.png');
        this.load.image('tile1', 'img/tile1.png');
        this.load.image('player', 'img/player.png');
        this.load.image('obs', 'img/obs.png');

        this.load.spritesheet('splayer', 'img/DinoSprites - doux.png', { frameWidth: 24, frameHeight: 24 });
        WebFont.load({ custom: { families: ['Berlin'], urls: ['fonts/BRLNSDB.css'] } });
    }
    create() {
        EPT.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        EPT.Lang.updateLanguage('en');
        EPT.text = EPT.Lang.text[EPT.Lang.current];
        this.scene.start('Preloader');
    }
}