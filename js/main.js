
var infectionLevels = [
    { name: 'low', maxSimultaneousBacteria: 10, totalBacteria: 20}, 
    { name: 'medium', maxSimultaneousBacteria: 10, totalBacteria: 40}, 
    { name: 'high', maxSimultaneousBacteria: 12, totalBacteria: 50}, 
    { name: 'very high', maxSimultaneousBacteria: 15, totalBacteria: 75}, 
    { name: 'extreme', maxSimultaneousBacteria: 20, totalBacteria: 100}, 
];

var activeInfectionLevelIndex = 1;

var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvas');

game.state.add('start', startState);
game.state.add('body', bodyState);
game.state.add('lungs', lungsState);
game.state.add('heart', heartState);
game.state.add('brain', brainState);
game.state.add('fail', failState);
game.state.add('success', successState);

game.state.start('start');