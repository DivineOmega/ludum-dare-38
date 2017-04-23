
Synapse = function (game) {

    var x = 10;
    var y = 10

    while((x > 0 && x < 1920) && (y > 0 && y < 1080)) {
        x = game.rnd.integerInRange(-500, 1920+500);
        y = game.rnd.integerInRange(-500, 1080+500);
    }

    Phaser.Sprite.call(this, game, x, y, 'synapse');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.body.drag.setTo(2000);
    game.add.tween(this.scale).to({ x: 0.9, y: 0.9}, 300, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

    game.add.tween(this).to({x: this.game.world.randomX, y: this.game.world.randomY, angle: Math.random()*360}, 4000, Phaser.Easing.Quadratic.InOut, true);

    game.time.events.loop(4000, function() { 
        game.add.tween(this).to({x: this.game.world.randomX, y: this.game.world.randomY, angle: Math.random()*360}, 4000, Phaser.Easing.Quadratic.InOut, true);
    }, this)

    this.sounds = {};
    this.sounds.impactSplat = game.add.audio('impact-splat');
};

Synapse.prototype = Object.create(Phaser.Sprite.prototype);
Synapse.prototype.constructor = Synapse;

Synapse.prototype.update = function() {

};
