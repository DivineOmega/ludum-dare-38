
var lungsState = {

    antibody: null,
    bacterias: null,
    antibodyWeapon: null,
    sounds: {},
    scoreText: null,
    energyText: null,

    maxSimultaneousBacteria: 10,
    totalBacteria: 40,

    preload: function() {
        
        game.load.image('antibody', 'assets/sprites/antibody.png');
        game.load.image('antibody-bullet', 'assets/sprites/antibody-bullet.png');
        game.load.audio('splat1', 'assets/audio/splat1.mp3');

        game.load.image('bacteria', 'assets/sprites/bacteria.png');
        game.load.audio('impact-splat', 'assets/audio/impact-splat.mp3');

    },

    create: function() {

        game.stage.backgroundColor = '#FFB6C1';

        this.antibody = game.add.sprite(1920/2, 1080/2, 'antibody');
        this.antibody.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.antibody, Phaser.Physics.ARCADE);
        this.antibody.body.allowRotation = false;
        this.antibody.hp = 10;

        this.antibodyWeapon = game.add.weapon(6, 'antibody-bullet');
        this.antibodyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.antibodyWeapon.bulletSpeed = 600;
        this.antibodyWeapon.fireRate = 200;
        this.antibodyWeapon.bulletAngleOffset = 90;
        this.antibodyWeapon.bulletAngleVariance = 5;
        this.antibodyWeapon.trackSprite(this.antibody, 0, 0, true);
        game.add.tween(this.antibody.scale).to({ x: 0.9, y: 0.9}, 500, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

        this.sounds.splat1 = game.add.audio('splat1');
        this.sounds.impactSplat = game.add.audio('impact-splat');

        this.bacterias = game.add.group();

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.scoreText = game.add.text(50, 50, '? bacteria remaining in lungs', style);
        this.energyText = game.add.text(1600, 50, 'Energy: ?', style);

    },

    spawnBacteria : function() {
        
        this.bacterias.add(new Bacteria(game, this.antibody));
        
    },


    update: function() {

        if (game.input.activePointer.x > 0 && game.input.activePointer.y > 0) {
            this.antibody.rotation = game.physics.arcade.moveToPointer(this.antibody, 60, game.input.activePointer, 1500);
        }
    
        if (game.input.activePointer.leftButton.isDown) {
            var bullet = this.antibodyWeapon.fire();

            if (bullet) {
                this.sounds.splat1.play(); 
                this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
            }
                        
        }

        this.bacterias.forEach(function(bacteria) {
            bacteria.update();
        }, this);

        game.physics.arcade.collide(this.antibodyWeapon.bullets, this.bacterias, this.bacteriaHit, null, this);

        game.physics.arcade.collide(this.antibody, this.bacterias, this.antibodyHit, null, this);

        game.physics.arcade.collide(this.bacterias, this.bacterias);

        if (this.bacterias.countLiving() + this.bacterias.countDead() < this.totalBacteria) {
            if (this.bacterias.countLiving() < this.maxSimultaneousBacteria) {
                this.spawnBacteria();
            }
        }

        if (this.bacterias.countDead() >= this.totalBacteria) {
            game.state.start('body');
        }

        if (!this.antibody.alive) {
            game.state.start('body');
        }

        this.scoreText.text = (this.totalBacteria - this.bacterias.countDead())+' bacteria remaining in lungs';
        this.energyText.text = 'Energy: '+(this.antibody.hp).toFixed(2);

    },

    antibodyHit: function(antibody, bacteria) {
        antibody.hp = antibody.hp - 0.01;

        if (antibody.hp <= 0) {
            game.add.tween(antibody.scale).to({ x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true, 0, 0).onComplete.add(function() {
                antibody.kill();
            }, this);
        }
    },

    bacteriaHit: function(bullet, bacteria) {
        this.sounds.impactSplat.play();
        bullet.kill();
        bacteria.takeDamage();
    }


}