export function initializePhysicsGroups(scene) {
    scene.floor = scene.physics.add.staticGroup();
    scene.pipe = scene.physics.add.staticGroup();
    scene.block = scene.physics.add.staticGroup();
    scene.enemies = scene.physics.add.group();
    scene.coins = scene.physics.add.staticGroup();
}

export function createClouds(scene, level_size){
    const min = 100;
    const max = 340;

    for (let y = 20; y < level_size; y += 300) {   
        let altura = min + ((Math.random()*(max-min))+0.2);
        scene.add.image(y, altura, 'nube1')
            .setOrigin(0, 0)
            .setScale(0.5)
        }   
}

export function createBlocks(scene,x, cantidad, tipo, altura=scene.scale.height - 150)
{
    const blockSize = 35;
    const numero_blocks = x + (cantidad * blockSize);

    for (let y = x; y < numero_blocks; y += blockSize){
        scene.block.create(y, altura, tipo)
            .setScale(2.3)
            .setOrigin(0.2, 0.2)
            .body.setSize(blockSize, blockSize)
            .setOffset(0, 0); 
    }
}

export function createPipeLarge(scene, x){
    const scaleFactor = 1.5;

    scene.pipe.create(x, 500, 'pipe_bottom')
        .setOrigin(-0.07, -0.01)
        .setScale(scaleFactor)
        .body.setSize(0, 0) // Ajusta el tamaño del cuerpo físico (ancho, alto)
        .setOffset(20, -10);

    scene.pipe.create(x, 450, 'pipe_up')
        .setOrigin(0, 0.45)
        .setScale(scaleFactor)
        .body.setSize(45, 500) // Ajusta el tamaño del cuerpo físico (ancho, alto)
        .setOffset(20, -10);
}

export function createPipeSimple(scene, x){
    const scaleFactor = 1.5;

    scene.pipe.create(x, scene.scale.height - 70, 'pipe_1')
        .setOrigin(0, 0.5)
        .setScale(scaleFactor)
        .body.setSize(40, 600) // Ajusta el tamaño del cuerpo físico (ancho, alto)
        .setOffset(20, -10);
}

export function createFloor(scene, level_size){
    for (let x = 0; x < level_size; x += 120) { // Ajusta 64 al ancho de tu textura
        scene.floor.create(x, scene.scale.height - 16, 'floor_bricks')
            .setOrigin(0, 0.5)
            .refreshBody();
    }
}


export function createLetter(scene, x, y, estructura){
    const bloqueSize = 35;

    for (let fila = 0; fila < Math.min(4, estructura.length); fila++) { // Limita a 4 filas
        for (let col = 0; col < estructura[fila].length; col++) {
            if (estructura[fila][col] === 1) {
                let posX = x + (col * bloqueSize);
                let posY = y - (fila * bloqueSize); // Construye hacia arriba
                createBlocks(scene, posX, 1, 'block', posY);
            }
        }
    }
}

export function createSaltadera(scene) {
    let bloques = 12;
    let altura = 540;
    const blockSize = 35;

    for (let x = 2400; x < 2750; x += blockSize) {
        createBlocks(scene, x, bloques, 'block', altura);
        bloques -= 1;
        altura -= blockSize;
    }
}

export function createCastle(scene) {
    scene.castle = scene.physics.add.staticSprite(3100, 540, 'castle')
        .setScale(3)
        .setOrigin(0, 0.8)
        .refreshBody();
}

export function createFlagMast(scene) {
    scene.add.image(3000, 540, 'flag-mast')
        .setScale(1.9)
        .setOrigin(0, 0.9);
    scene.add.image(2985, 300, 'final-flag')
        .setScale(1.9)
        .setOrigin(0, 0.9);
}




