import { collectCoin } from './score.js';
import { changeDirection, onHitEnemy } from './enemies.js';

export function createPlayer(scene, init_position) {
    scene.hk = scene.physics.add.sprite(init_position, 320, 'kuromi')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setScale(0.7)
        .setSize(50, 80)
        .setGravityY(1500);
}

export function setupCollisions(scene) {
    scene.physics.add.overlap(scene.hk, scene.coins, collectCoin, null, scene);
    scene.physics.add.collider(scene.hk, scene.floor);
    scene.physics.add.collider(scene.enemies, scene.floor);
    scene.physics.add.overlap(scene.enemies, scene.pipe, changeDirection, null, scene);
    scene.physics.add.collider(scene.hk, scene.enemies, onHitEnemy, null, scene);
    scene.physics.add.collider(scene.hk, scene.pipe);
    scene.physics.add.collider(scene.hk, scene.block);
    scene.physics.add.overlap(scene.enemies, scene.block, changeDirection, null, scene);
    scene.physics.world.setBounds(0, 0, scene.level_size, scene.scale.height);
}

export function setupCamera(scene, level_size) {
    scene.cameras.main.setBounds(0, 0, level_size, scene.scale.height);
    scene.cameras.main.startFollow(scene.hk);
}
