
Bacteria = function (game,targetAntibody) {

    var x = 10;
    var y = 10

    while((x > 0 && x < 1920) && (y > 0 && y < 1080)) {
        x = game.rnd.integerInRange(-500, 1920+500);
        y = game.rnd.integerInRange(-500, 1080+500);
    }

    Phaser.Sprite.call(this, game, x, y, 'bacteria');

    this.targetAntibody = targetAntibody;
    this.hp = 3;

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.body.drag.setTo(2000);
    game.add.tween(this.scale).to({ x: 0.9, y: 0.9}, 300, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);
};

Bacteria.prototype = Object.create(Phaser.Sprite.prototype);
Bacteria.prototype.constructor = Bacteria;

Bacteria.prototype.update = function() {

    radians = game.physics.arcade.angleBetween(this, this.targetAntibody);                
    degrees = radians * (180/Math.PI);               
    game.physics.arcade.velocityFromAngle(degrees, 150, this.body.velocity); 

};

Bacteria.prototype.takeDamage = function() {

        this.hp = this.hp - 1;

        if (this.hp <= 0 ){
            game.add.tween(this.scale).to({ x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true, 0, 0).onComplete.add(function() {
                this.kill();
            }, this);
            
        }
};
