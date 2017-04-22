
var bodyState = {

    body: null,
    sounds: {},

    preload: function() {
        
        game.load.image('body', 'assets/sprites/body.png');

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.antibody = game.add.sprite(1920/2, 1080/2, 'body');
        this.antibody.anchor.setTo(0.5, 0.5);
        
        game.add.tween(this.body.scale).to({ x: 0.95, y: 0.95}, 500, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);


    },


    update: function() {


    },



}