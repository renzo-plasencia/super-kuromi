export function createCoins(scene) {
    //scene.coins = scene.physics.add.staticGroup();

    createCoin(scene, 360, 420, 4);
    createCoin(scene, 590, 420, 4);

    createCoin(scene, 360, 520, 4);
    createCoin(scene, 590, 520, 4);

    createCoin(scene, 1345, 540, 3);
    createCoin(scene, 1610, 540, 2);
    createCoin(scene, 1845, 540, 2);
    createCoin(scene, 2015, 540, 3);
    createCoin(scene, 2200, 540, 2);
}


export function createCoin(game, x, y, quantity = 1) {
    for (let i = 0; i < quantity; i++) {
        game.coins.create(x + (i * 35), y, 'coin')
            .anims.play('coin-idle', true)
            .setScale(2);
    }
}