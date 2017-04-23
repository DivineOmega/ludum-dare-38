
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvas');

game.state.add('body', bodyState);
game.state.add('lungs', lungsState);
game.state.add('heart', heartState);
game.state.add('brain', brainState);
game.state.add('fail', failState);
game.state.add('success', successState);

game.state.start('body');