
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvas');

game.state.add('body', bodyState);
game.state.add('level1', level1State);

game.state.start('body');