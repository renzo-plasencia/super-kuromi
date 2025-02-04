import { playAudio } from '../audio.js';

let lastCoinSoundTime = 0;
let scoreNumber = 0;

export function addToScore(scoreToAdd, origin, game){
    scoreNumber += scoreToAdd;
    if (game.scoreText) {
        const formattedScore = String(scoreNumber).padStart(6, '0');
        game.scoreText.setText(formattedScore);
    }
    // Crear animación del "+100"
    const scorePopup = game.add.text(
        origin.x, origin.y - 30, scoreToAdd, { 
            font: '15px MarioBrosFont', fill: '#ffffff' 
        }
    );

    game.tweens.add({
        targets: scorePopup,
        duration: 500,
        y: scorePopup.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scorePopup,
                duration: 500,
                alpha: 0,
                onComplete: () => {
                    scorePopup.destroy();
                }
            });
        }
    });
}

export function collectCoin(game, coin) {
    coin.destroy();

    const now = Date.now();
    if (now - lastCoinSoundTime > 200) { 
        playAudio('coin-pickup', game.scene, { volume: 0.005 });
        lastCoinSoundTime = now; 
    }
    addToScore(100, coin, game.scene)

}

export function killHK(game){

    const { hk, scene } = game;

    if (hk.isDead) return;

    scoreNumber = 0;
    if (game.scoreText) {
        game.scoreText.setText('000000');
    }
    
    hk.isDead = true;
    hk.anims.play('hk-dead');
    hk.setCollideWorldBounds(false);
    playAudio('game-over', game);

    hk.body.checkCollision.none = true;

    hk.setVelocityX(0);

    setTimeout(() => {
        hk.setVelocityY(-500);
    }, 100);

    setTimeout(() => {
        scene.restart();
    }, 2000);
}