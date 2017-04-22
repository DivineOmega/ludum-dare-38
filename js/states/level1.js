
var level1State = {

    antibody: null,
    bacteria: [],
    antibodyWeapon: null,
    sounds: {},

    preload: function() {
        
        game.load.image('antibody', 'assets/sprites/antibody.png');
        game.load.image('antibody-bullet', 'assets/sprites/antibody-bullet.png');
        game.load.audio('splat1', 'assets/audio/splat1.mp3');

        game.load.image('bacteria', 'assets/sprites/bacteria.png');

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.antibody = game.add.sprite(1920/2, 1080/2, 'antibody');
        this.antibody.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.antibody, Phaser.Physics.ARCADE);
        this.antibody.body.allowRotation = false;

        this.antibodyWeapon = game.add.weapon(6, 'antibody-bullet');
        this.antibodyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.antibodyWeapon.bulletSpeed = 600;
        this.antibodyWeapon.fireRate = 400;
        this.antibodyWeapon.bulletAngleOffset = 90;
        this.antibodyWeapon.bulletAngleVariance = 5;
        this.antibodyWeapon.trackSprite(this.antibody, 0, 0, true);

        game.add.tween(this.antibody.scale).to({ x: 0.9, y: 0.9}, 500, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

        this.sounds.splat1 = game.add.audio('splat1');

        this.bacteria = game.add.sprite(100, 100, 'bacteria');
        this.bacteria.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.bacteria, Phaser.Physics.ARCADE);

        game.add.tween(this.bacteria.scale).to({ x: 0.9, y: 0.9}, 250, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

    },


    update: function() {

        this.antibody.rotation = game.physics.arcade.moveToPointer(this.antibody, 60, game.input.activePointer, 2000);

        if (game.input.activePointer.leftButton.isDown) {
            var bullet = this.antibodyWeapon.fire();

            if (bullet) {
                this.sounds.splat1.play(); 
                this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
            }
                        
        }

    },


}