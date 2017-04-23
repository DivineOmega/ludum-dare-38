
var lungsState = {

    antibody: null,
    bacterias: null,

    scoreText: null,
    energyText: null,

    maxSimultaneousBacteria: 10,
    totalBacteria: 40,

    preload: function() {
        
        game.load.image('antibody', 'assets/sprites/antibody.png');
        game.load.image('antibody-bullet', 'assets/sprites/antibody-bullet.png');
        game.load.audio('splat1', 'assets/audio/splat1.mp3');

        game.load.image('bacteria', 'assets/sprites/bacteria.png');
        game.load.audio('impact-splat', 'assets/audio/impact-splat.mp3');

    },

    create: function() {

        game.stage.backgroundColor = '#FFB6C1';

        this.antibody = new Antibody(game);
        game.add.existing(this.antibody);

        this.bacterias = game.add.group();

        var style = { font: 'bold 32px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6 };
        this.scoreText = game.add.text(50, 50, '? bacteria remaining in lungs', style);
        this.energyText = game.add.text(1600, 50, 'Energy: ?', style);

    },

    spawnBacteria : function() {
        
        this.bacterias.add(new Bacteria(game, this.antibody));
        
    },


    update: function() {

        game.physics.arcade.collide(this.antibody.weapon.bullets, this.bacterias, this.bacteriaHit, null, this);

        game.physics.arcade.collide(this.antibody, this.bacterias, this.antibodyHit, null, this);

        game.physics.arcade.collide(this.bacterias, this.bacterias);

        if (this.bacterias.countLiving() + this.bacterias.countDead() < this.totalBacteria) {
            if (this.bacterias.countLiving() < this.maxSimultaneousBacteria) {
                this.spawnBacteria();
            }
        }

        if (this.bacterias.countDead() >= this.totalBacteria) {
            game.state.start('body');
        }

        if (!this.antibody.alive) {
            game.state.start('body');
        }

        this.scoreText.text = (this.totalBacteria - this.bacterias.countDead())+' bacteria remaining in lungs';
        this.energyText.text = 'Energy: '+(this.antibody.hp).toFixed(2);

    },

    antibodyHit: function(antibody, bacteria) {
        antibody.takeDamage();
    },

    bacteriaHit: function(bullet, bacteria) {
        bullet.kill();
        bacteria.takeDamage();
    }


}