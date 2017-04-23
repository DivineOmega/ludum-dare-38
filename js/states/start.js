
var startState = {

    antibody: null,

    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function() {
        game.load.image('antibody', 'assets/sprites/antibody.png');
        game.load.image('antibody-bullet', 'assets/sprites/antibody-bullet.png');
        game.load.audio('splat1', 'assets/audio/splat1.mp3');
    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.antibody = new Antibody(game);
        game.add.existing(this.antibody);

        var titleStyle = { font: 'bold 120px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 24 };
        game.add.text(550, 150, 'Mr Antibody', titleStyle);

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6};
        game.add.text(350, 450, 'It\'s your job to rid this human\'s major organs of a nasty bacterial infection.', style);
        game.add.text(700, 650, 'Press anywhere to start.', style);

    },


    update: function() {

        if (game.input.activePointer.leftButton.isDown) {
            game.state.start('body');
        }

    },

}