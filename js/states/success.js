
var successState = {

    init: function(organ) {
        this.organ = organ;
    },

    preload: function() {

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.launchText = game.add.text(150, 50, 'Success!', style);

        this.launchText.text += '\n\n';
        this.launchText.text += 'You have destroyed all harmful bacterial in the '+this.organ+'.';

        this.launchText.text += '\n\n';
        this.launchText.text += 'Press anywhere to continue.';

    },


    update: function() {

        if (game.input.activePointer.leftButton.isDown) {
            game.state.start('body');
        }

    },

}