
Alveoli = function (game) {

    var maxVeloctiy = 50
    var maxAngularVelocity = 50;

    var x = game.rnd.integerInRange(0, 1920-100);
    var y = game.rnd.integerInRange(0, 1080-100);

    Phaser.Sprite.call(this, game, x, y, 'alveoli');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.body.drag.setTo(1000);
    this.body.collideWorldBounds = true;
    game.add.tween(this.scale).to({ x: 0.9, y: 0.9}, 300, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

    this.hp = 2;

    game.time.events.loop(1000, function() { 
        this.body.velocity.x = -maxVeloctiy*0.5 + Math.random()*maxVeloctiy;
        this.body.velocity.y = -maxVeloctiy*0.5 + Math.random()*maxVeloctiy;
        this.body.angularVelocity = -maxAngularVelocity*0.5 + Math.random()*maxAngularVelocity;
    }, this);

};

Alveoli.prototype = Object.create(Phaser.Sprite.prototype);
Alveoli.prototype.constructor = Alveoli;

Alveoli.prototype.update = function() {

};

Alveoli.prototype.takeDamage = function() {

    this.hp = this.hp - 0.01;

    if (this.hp <= 0) {
        game.add.tween(this.scale).to({ x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true, 0, 0).onComplete.add(function() {
            this.kill();
        }, this);
    }
    
};