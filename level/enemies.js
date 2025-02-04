import { addToScore, killHK } from './score.js';
import { playAudio } from '../audio.js';

export function createEnemies (game) {
    //scene.enemies = scene.physics.add.group();
    createEnemy(game, 500, 540, 'goomba', -50,2);
    createEnemy(game, 550, 540, 'goomba', 50,2);
    createEnemy(game, 1100, 400, 'koopa', -50, 2);
}

export function createEnemy(game, x, y, tipo, velocidad, scale=2, animation) {
    const enemyConfigs = {
        goomba: { gravityY: 300, size: { width: 16, height: 16 }, defaultAnimation: 'goomba-walk' },
        koopa: { gravityY: 300, size: { width: 16, height: 24 }, defaultAnimation: 'koopa-walk' },
    };
    
    const config = enemyConfigs[tipo] || enemyConfigs['goomba'];

    let enemy = game.physics.add.sprite(x, y, tipo)
        .setOrigin(0, 1)
        .setGravityY(config.gravityY)
        .setCollideWorldBounds(true)
        .setScale(scale)
        .setSize(config.size.width, config.size.height)
        .anims.play(animation || config.defaultAnimation, true);

    game.enemies.add(enemy);
    enemy.setVelocityX(velocidad);
}


export function changeDirection(enemy) {
    enemy.setVelocityX(enemy.body.velocity.x * -1); // Invertir la dirección
    enemy.toggleFlipX();
}

export function onHitEnemy( hk, enemy) {
    if (enemy.isDead) return;
    
    const enemyDeathConfigs = {
        goomba: { deathAnimation: 'goomba-dead', sound: 'goomba-stomp', score: 200 },
        koopa: { deathAnimation: 'koopa-dead', sound: 'goomba-stomp', score: 300 },
    };
    
    const config = enemyDeathConfigs[enemy.texture.key] || enemyDeathConfigs['goomba'];

    if(hk.body.touching.down && enemy.body.touching.up) {
        enemy.isDead = true;
        enemy.anims.play(config.deathAnimation);
        enemy.setVelocityX(0); //Se queda quieto
        
        playAudio(config.sound, hk.scene);
        hk.scene.sound.play(config.sound);

        hk.setVelocityY(-500);
        addToScore(config.score, enemy, hk.scene);

        setTimeout(() => {
            enemy.destroy();
        }, 500);
        
    } else {
        killHK(hk.scene)
    }
}


