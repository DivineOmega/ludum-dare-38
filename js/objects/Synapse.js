
Synapse = function (game) {

    var maxVeloctiy = 1000
    var maxAngularVelocity = 100;

    var x = game.rnd.integerInRange(0, 1920);
    var y = game.rnd.integerInRange(0, 1080);

    Phaser.Sprite.call(this, game, x, y, 'synapse');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.body.drag.setTo(100);
    this.body.collideWorldBounds = true;
    game.add.tween(this.scale).to({ x: 0.9, y: 0.9}, 300, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

    game.time.events.loop(1000, function() { 
        this.body.velocity.x = -maxVeloctiy*0.5 + Math.random()*maxVeloctiy;
        this.body.velocity.y = -maxVeloctiy*0.5 + Math.random()*maxVeloctiy;
        this.body.angularVelocity = -maxAngularVelocity*0.5 + Math.random()*maxAngularVelocity;
    }, this);

};

Synapse.prototype = Object.create(Phaser.Sprite.prototype);
Synapse.prototype.constructor = Synapse;

Synapse.prototype.update = function() {

};
