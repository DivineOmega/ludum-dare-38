
var bodyState = {

    body: null,
    lungs: null,
    heart: null,
    brain: null,
    sounds: {},

    selectedOrgan: '',

    preload: function() {
        
        game.load.image('body', 'assets/sprites/body.png');
        game.load.image('lungs', 'assets/sprites/lungs.png');
        game.load.image('heart', 'assets/sprites/heart.png');
        game.load.image('brain', 'assets/sprites/brain.png');

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.selectedOrgan = '';

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

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.launchText = game.add.text(200, 50, 'Select an organ!', style);

    },


    update: function() {

        if (this.selectedOrgan) {
            var formattedOrganName = this.selectedOrgan.charAt(0).toUpperCase() + this.selectedOrgan.slice(1);
            this.launchText.text = formattedOrganName+'!\n\nTap the '+this.selectedOrgan+' again to begin!';
            
        }

    },

    clickedLungs: function() {
        if (this.selectedOrgan=='lungs') {
            this.launchState();
        }

        this.selectedOrgan = 'lungs';
    },

    clickedHeart: function() {
        if (this.selectedOrgan=='heart') {
            this.launchState();
        }

        this.selectedOrgan = 'heart';
    },

    clickedBrain: function() {
        if (this.selectedOrgan=='brain') {
            this.launchState();
        }

        this.selectedOrgan = 'brain';
    },

    launchState: function() {
        game.state.start(this.selectedOrgan);
    }

}