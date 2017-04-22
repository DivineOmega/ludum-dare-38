
function createAntibody()
{
    var ent = {

        sprite: null,
        weapon: null,
        
        sounds: {},

        preload: function() {

            game.load.image('antibody', 'assets/sprites/antibody.png');
            game.load.image('antibody-bullet', 'assets/sprites/antibody-bullet.png');
            game.load.audio('splat1', 'assets/audio/splat1.mp3');

        },

        create: function() {

            this.sprite = game.add.sprite(1920/2, 1080/2, 'antibody');
            this.sprite.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.allowRotation = false;

            this.weapon = game.add.weapon(6, 'antibody-bullet');
            this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            this.weapon.bulletSpeed = 600;
            this.weapon.fireRate = 400;
            this.weapon.bulletAngleOffset = 90;
            this.weapon.bulletAngleVariance = 5;
            this.weapon.trackSprite(this.sprite, 0, 0, true);

            game.add.tween(this.sprite.scale).to({ x: 0.9, y: 0.9}, 500, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

            this.sounds.splat1 = game.add.audio('splat1');

        },

        update: function() {

            this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 60, game.input.activePointer, 2000);

            if (game.input.activePointer.leftButton.isDown) {
                var bullet = this.weapon.fire();

                if (bullet) {
                    this.sounds.splat1.play(); 
                    this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
                }
                         
            }

        },

    }

    return ent;
}