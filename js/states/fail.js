
var failState = {

    sounds: {},

    init: function(organ, reason) {
        this.organ = organ;
        this.reason = reason;
    },

    preload: function() {
        game.load.audio('splat1', 'assets/audio/splat1.mp3');
    },

    create: function() {

        this.sounds = {};
        this.sounds.splat1 = game.add.audio('splat1');

        game.stage.backgroundColor = "#FFB6C1";

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.launchText = game.add.text(150, 50, 'Game over!', style);

        this.launchText.text += '\n\n';
        this.launchText.text += this.reason;

        this.launchText.text += '\n\n';
        this.launchText.text += 'Press anywhere to continue.';

    },

    playClickSound: function() {
        this.sounds.splat1.play();
        this.sounds.splat1._sound.playbackRate.value = 1.2 + (0.4 * game.rnd.frac());
    },

    update: function() {

        if (game.input.activePointer.leftButton.isDown) {
            this.playClickSound();
            game.state.start('body');
        }

    },

}