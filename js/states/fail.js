
var failState = {

    init: function(organ, reason) {
        this.organ = organ;
        this.reason = reason;
    },

    preload: function() {

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.launchText = game.add.text(150, 50, 'Game over!', style);

        this.launchText.text += '\n\n';
        this.launchText.text += this.reason;

        this.launchText.text += '\n\n';
        this.launchText.text += 'Press anywhere to continue.';

    },


    update: function() {

        if (game.input.activePointer.leftButton.isDown) {
            game.state.start('body');
        }

    },

}