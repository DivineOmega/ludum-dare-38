
var bodyState = {

    body: null,
    lungs: null,
    heart: null,
    brain: null,
    sounds: {},

    preload: function() {
        
        game.load.image('body', 'assets/sprites/body.png');
        game.load.image('lungs', 'assets/sprites/lungs.png');
        game.load.image('heart', 'assets/sprites/heart.png');
        game.load.image('brain', 'assets/sprites/brain.png');

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.body = game.add.sprite(1920/2, 1080/2, 'body');
        this.body.anchor.setTo(0.5, 0.5);
        game.add.tween(this.body.scale).to({ x: 0.97, y: 0.97}, 2000, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);

        this.lungs = game.add.sprite(this.body.x, this.body.y - 215, 'lungs');
        this.lungs.anchor.setTo(0.5, 0.5);
        game.add.tween(this.lungs.scale).to({ x: 0.97, y: 0.97}, 2000, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);
        this.lungs.inputEnabled = true;
        this.lungs.events.onInputDown.add(this.clickedLungs, this);

        this.heart = game.add.sprite(this.body.x + 20, this.body.y - 225, 'heart');
        this.heart.anchor.setTo(0.5, 0.5);
        game.add.tween(this.heart.scale).to({ x: 0.97, y: 0.97}, 2000, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);
        this.heart.inputEnabled = true;
        this.heart.events.onInputDown.add(this.clickedHeart, this);

        this.brain = game.add.sprite(this.body.x, this.body.y - 440, 'brain');
        this.brain.anchor.setTo(0.5, 0.5);
        game.add.tween(this.brain.scale).to({ x: 0.97, y: 0.97}, 2000, Phaser.Easing.Bounce.Out, true, 0, -1).yoyo(true, 100);
        this.brain.inputEnabled = true;
        this.brain.events.onInputDown.add(this.clickedBrain, this);

    },


    update: function() {


    },

    clickedLungs: function() {
        game.state.start('lungs');
    },

     clickedHeart: function() {
        game.state.start('heart');
    },

    clickedBrain: function() {
        game.state.start('brain');
    }

}