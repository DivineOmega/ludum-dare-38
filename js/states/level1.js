
var level1State = {

    antibody: null,
    bacterias: [],
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

        this.bacterias = game.add.group();
        this.bacterias.enableBody = true;
        this.bacterias.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++) {

            var x = 10;
            var y = 10

            while((x > 0 && x < 1920) && (y > 0 && y < 1080)) {
                x = game.rnd.integerInRange(-500, 1920+500);
                y = game.rnd.integerInRange(-500, 1080+500);
            }

            var bacteria = this.bacterias.create(x, y, 'bacteria');
            bacteria.anchor.setTo(0.5, 0.5);
            bacteria.body.drag.setTo(2000);
            game.add.tween(bacteria.scale).to({ x: 0.9, y: 0.9}, 300, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);
            bacteria.hp = 3;
        }

    },


    update: function() {

        this.antibody.rotation = game.physics.arcade.moveToPointer(this.antibody, 60, game.input.activePointer, 1500);

        if (game.input.activePointer.leftButton.isDown) {
            var bullet = this.antibodyWeapon.fire();

            if (bullet) {
                this.sounds.splat1.play(); 
                this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
            }
                        
        }

        this.bacterias.forEach(function(bacteria) {
            radians = game.physics.arcade.angleBetween(bacteria, this.antibody);                
            degrees = radians * (180/Math.PI);               
            game.physics.arcade.velocityFromAngle(degrees, 150, bacteria.body.velocity); 
        }, this);

        game.physics.arcade.collide(this.antibodyWeapon.bullets, this.bacterias, this.bacteriaHit);

        game.physics.arcade.collide(this.antibody, this.bacterias);

        game.physics.arcade.collide(this.bacterias, this.bacterias);

    },

    bacteriaHit: function(bullet, bacteria) {
        bullet.kill();

        bacteria.hp = bacteria.hp - 1;

        if (bacteria.hp <= 0 ){
            game.add.tween(bacteria.scale).to({ x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true, 0, 0).onComplete.add(function() {
                bacteria.kill();
            }, this);
            
        }
    }


}