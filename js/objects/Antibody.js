
Antibody = function (game) {

    Phaser.Sprite.call(this, game, 1920/2, 1080/2, 'antibody');

    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
    this.hp = 10;

    this.weapon = game.add.weapon(6, 'antibody-bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 200;
    this.weapon.bulletAngleVariance = 5;
    this.weapon.bulletRotateToVelocity = true;
    this.weapon.trackSprite(this, 0, 0, true);

    game.add.tween(this.scale).to({ x: 0.9, y: 0.9}, 500, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

    this.sounds = {};
    this.sounds.splat1 = game.add.audio('splat1');

};

Antibody.prototype = Object.create(Phaser.Sprite.prototype);
Antibody.prototype.constructor = Antibody;

Antibody.prototype.update = function() {

    if (game.input.activePointer.x > 0 && game.input.activePointer.y > 0) {
        this.rotation = game.physics.arcade.moveToPointer(this, 60, game.input.activePointer, 1500);
    }

    if (game.input.activePointer.leftButton.isDown) {
        var bullet = this.weapon.fire();

        if (bullet) {
            bullet.body.bounce.set(1, 1);
            this.sounds.splat1.play(); 
            this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
        }
                    
    }

};

Antibody.prototype.takeDamage = function() {

    this.hp = this.hp - 0.01;

    if (this.hp <= 0) {
        game.add.tween(this.scale).to({ x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true, 0, 0).onComplete.add(function() {
            this.kill();
        }, this);
    }
    
};

Antibody.prototype.takePercentageDamage = function(percentage) {

    var decimalPercentage = percentage / 100;

    this.hp = this.hp * (1 - decimalPercentage);

};