export function createUI(game){
    //Personaje
    game.name = game.add.text(64, 16, 'KUROMI', { fontSize: '16px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
    game.scoreText = game.add.text(64, 40, '000000', { fontSize: '15px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
    //Tiempo
    game.timeText = game.add.text(650, 16, 'TIME', { fontSize: '16px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
    //game.time = game.add.text(665, 40, '00', { fontSize: '14px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
    //Mundo
    game.world = game.add.text(500, 16, 'WORLD', { fontSize: '16px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
    game.level = game.add.text(520, 40, '1-1', { fontSize: '14px', fontFamily: 'MarioBrosFont', fill: '#ff0000' }).setScrollFactor(0).setDepth(100);
}