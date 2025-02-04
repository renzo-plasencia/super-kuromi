import { createAnimations } from './animations.js';
import { initAudio, playAudio } from './audio.js';
import { checkControls } from './controls.js';
import { initSpritesheet } from './spritesheet.js';
import { initImages } from './image.js';
import { createUI } from './helpers/ui.js';
import CountdownController from './helpers/countdownController.js';


/* CONFIGURACIÓN GLOBAL PHASER */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#E8C5FF',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload, //se ejecuta para pre cargar los recursos
        create, //se ejecuta cuando el juego comienza
        update //se ejecuta en cada frame
    }
    
}
//Cargar fuente
const loadFont = (name, url) => {
    const font = new FontFace(name, `url(${url})`);
    return font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
    });
};
/* CREAR EL JUEGO */
loadFont('MarioBrosFont', 'assets/fonts/SuperMario.ttf').then(() => {
    const game = new Phaser.Game(config);
}).catch((error) => {
    console.error('Error al cargar la fuente:', error);
});
//Posición inicial del personaje
let init_position = 50;
//Tamaño del nivel
let level_size = 3350;
//Puntaje
let scoreNumber = 0;

/* 
FALTANTES:
4. HACER LOS BLOQUES ROMPIBLES O MOVIBLES PORQUE ES KUROMI CHIQUITA
5. HACER QUE EL KOOPA SE VUELVA CAPARAZÓN
6. PONER LA BANDERA Y QUE HAGA LA ANIMACIÓN DE BAJAR
7. REFACTORIZAR CÓDIGO
*/

/* TODO LO QUE SE CARGA ANTES DE INICIAR EL JUEGO */
function preload() {
    //CARGA IMAGES, SPRITESHEET, AUDIO
    initImages(this);
    initSpritesheet(this);
    initAudio(this.load);
}

/* TODO LO QUE SE CARGA DESPUES DEL PRE LOAD */
function create() {
    //Crear animaciones
    createAnimations(this);
    //Crear UI
    createUI(this);
    //Crear contador
    this.countdown = new CountdownController(this, this.add.text(665, 40, '300', {
        fontSize: '14px', 
        fontFamily: 'MarioBrosFont', 
        fill: '#ff0000' 
    }).setScrollFactor(0).setDepth(100));
    this.countdown.start(() => {
        this.scene.restart(); 
    }, 300000); 
    //Crear físicas del mundo
    this.floor = this.physics.add.staticGroup();
    this.pipe = this.physics.add.staticGroup();
    this.block = this.physics.add.staticGroup();

    // -------- NUBES --------
    for (let y = 20; y < level_size; y += 300) {   
        let min = 100;
        let max = 340;
        let altura = min + ((Math.random()*(max-min))+0.2);
        this.add.image(y, altura, 'nube1')
            .setOrigin(0, 0)
            .setScale(0.5)
    }
    
    // -------- BLOQUES --------
    this.createBloque = (x, bloques, tipo, altura=config.height - 150) => {
        let numero_blocks = x + (bloques * 35);

        for (let y = x; y < numero_blocks; y += 35){
            this.block.create(y, altura, tipo)
                .setScale(2.3)
                .setOrigin(0.2, 0.2)
                .body.setSize(35, 35)
                .setOffset(0, 0); 
        }
    };

    this.createPipeLarge = (x) => {
        this.pipe.create(x, 500, 'pipe_bottom')
            .setOrigin(-0.07, -0.01)
            .setScale(1.5)
            .body.setSize(0, 0) // Ajusta el tamaño del cuerpo físico (ancho, alto)
            .setOffset(20, -10);
    
        this.pipe.create(x, 450, 'pipe_up')
            .setOrigin(0, 0.45)
            .setScale(1.5)
            .body.setSize(45, 500) // Ajusta el tamaño del cuerpo físico (ancho, alto)
            .setOffset(20, -10);
    }

    this.createPipeSimple = (x) => {
        this.pipe.create(x, config.height - 70, 'pipe_1')
            .setOrigin(0, 0.5)
            .setScale(1.5)
            .body.setSize(40, 600) // Ajusta el tamaño del cuerpo físico (ancho, alto)
            .setOffset(20, -10)
            //.refreshBody();    // Ajusta el desplazamiento del cuerpo físico
    }

    function crearLetra(x, y, estructura) {
        const bloqueSize = 35; // Tamaño del bloque
    
        for (let fila = 0; fila < Math.min(4, estructura.length); fila++) { // Limita a 4 filas
            for (let col = 0; col < estructura[fila].length; col++) {
                if (estructura[fila][col] === 1) {
                    let posX = x + (col * bloqueSize);
                    let posY = y - (fila * bloqueSize); // Construye hacia arriba
                    this.createBloque(posX, 1, 'block', posY);
                }
            }
        }
    }
    const letraT = [
        [0, 0, 1, 0, 0], // Fila superior
        [0, 0, 1, 0, 0], // Columna vertical
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1]
    ];
    const corazon = [
        [0, 0, 1, 0, 0], 
        [0, 1, 1, 1, 0], 
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0]
    ];
    const a = [
        [0, 1, 0, 1, 0], 
        [0, 1, 1, 1, 0], 
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0]
    ];
    const m = [
        [1, 0, 0, 0, 1], 
        [1, 0, 1, 0, 1], 
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ];
    const o = [
        [0, 1, 1, 1, 0], 
        [0, 1, 0, 1, 0], 
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0]
    ];
    ////////////////////////////////////////////////////////////
    //init_position = 1200;
    // CREAR ELEMENTOS
    this.createPipeSimple(200);
    this.createBloque(350, 4, 'block');
    this.createBloque(580, 4, 'block');
    this.createPipeLarge(780);
    this.createBloque(1200, 1, 'emptyBlock',540);
    //TE AMO
    crearLetra.call(this, 1300, 425, letraT);
    crearLetra.call(this, 1550, 425, corazon);
    crearLetra.call(this, 1780, 425, a);
    crearLetra.call(this, 1960, 425, m);
    crearLetra.call(this, 2140, 425, o);
    //Saltadera
    let bloques = 12;
    let altura = 540;
    for (let a = 2400; a < 2750; a += 35) {
        //console.log(a);
        this.createBloque(a, bloques, 'block', altura);
        bloques -= 1;
        altura -= 35;
        //this.createBloque(2435, 11, 'block', 505);
    }
    //Castillo
    this.castle = this.physics.add.staticSprite(3100, 540, 'castle')
        .setScale(3)
        .setOrigin(0, 0.8)
        .refreshBody();
    //Mastil
    this.add.image(3000, 540, 'flag-mast')
        .setScale(1.9)
        .setOrigin(0, 0.9);
    ////////////////////////////////////////////////////////////

    for (let x = 0; x < level_size; x += 120) { // Ajusta 64 al ancho de tu textura
        this.floor.create(x, config.height - 16, 'floor_bricks')
            .setOrigin(0, 0.5)
            .refreshBody();
    }

    //Personaje: NO TOCAR
    this.hk = this.physics.add.sprite(init_position,320, 'kuromi')
        .setOrigin(0,1) 
        .setCollideWorldBounds(true)
        .setScale(0.7)
        .setSize(50, 80)
        .setGravityY(1500);

    this.enemies = this.physics.add.group();
    createEnemy(this, 500, 540, 'goomba', -50,2);
    createEnemy(this, 550, 540, 'goomba', 50,2);
    createEnemy(this, 1100, 400, 'koopa', -50, 2);

    //Monedas
    this.coins = this.physics.add.staticGroup()
    createCoins(this, 360, 420,4);
    createCoins(this, 590, 420,4);

    createCoins(this, 360, 520,4);
    createCoins(this, 590, 520,4);

    createCoins(this, 1345, 540,3);
    createCoins(this, 1610, 540,2);
    createCoins(this, 1845, 540,2);
    createCoins(this, 2015, 540,3);
    createCoins(this, 2200, 540,2);
    
    

    this.physics.add.overlap(this.hk, this.coins, collectCoin, null, this); 
    

    //Espacio del mundo
    this.physics.add.collider(this.hk, this.floor);
    this.physics.add.collider(this.enemies, this.floor);
    this.physics.add.overlap(this.enemies, this.pipe, changeDirection, null, this);
    this.physics.add.collider(this.hk, this.enemies, onHitEnemy, null , this);
    this.physics.add.collider(this.hk, this.pipe); 
    this.physics.add.collider(this.hk, this.block);
    this.physics.add.overlap(this.enemies, this.block, changeDirection, null, this); 
    this.physics.world.setBounds(0,0,level_size,config.height);
    //Seguimiento camara
    this.cameras.main.setBounds(0,0,level_size,config.height);
    this.cameras.main.startFollow(this.hk);
    //Animaciones
    
    //Teclado
    this.keys = this.input.keyboard.createCursorKeys();
}

function onHitEnemy(hk, enemy) {
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
        
        playAudio(config.sound, this);
        this.sound.play(config.sound);

        hk.setVelocityY(-500);
        addToScore(config.score, enemy, this);

        setTimeout(() => {
            enemy.destroy();
        }, 500);
        
    } else {
        killHK(this)
    }
}
let lastCoinSoundTime = 0;
function collectCoin(hk, coin) {
    coin.destroy();

    const now = Date.now();
    if (now - lastCoinSoundTime > 200) { 
        playAudio('coin-pickup', this, { volume: 0.005 });
        lastCoinSoundTime = now; 
    }
    addToScore(100, coin, this)

}

function addToScore(scoreToAdd, origin, game){
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

function changeDirection(enemy) {
    enemy.setVelocityX(enemy.body.velocity.x * -1); // Invertir la dirección
    enemy.toggleFlipX();
}

function createCoins(game, x, y, quantity = 1) {
    for (let i = 0; i < quantity; i++) {
        game.coins.create(x + (i * 35), y, 'coin')
            .anims.play('coin-idle', true)
            .setScale(2);
    }
}

function createEnemy(game, x, y, tipo, velocidad, scale=2, animation) {
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

// 3. Se ejecuta en cada frame
function update() {
    const { hk, scene } = this;
    checkControls(this);

    const isHkTouchingDown = this.hk.body.touching.down;
    const isLeftKeyDown = this.keys.left.isDown;
    const isRightKeyDown = this.keys.right.isDown;
    const isUpKeyDown = this.keys.up.isDown;
    
    //Muerte mario
    if (hk.y >= config.height) {
        killHK(this)
    }  
    
    if (hk.x >= 1200 && hk.x <= 2300) { 
        if (hk.isDead) return; 
        if (isLeftKeyDown) {
            isHkTouchingDown && hk.anims.play('hk-walk', true);
            hk.setVelocityX(-320); 
            hk.flipX = false;
        } else if (isRightKeyDown) {
            isHkTouchingDown && hk.anims.play('hk-walk', true);
            hk.setVelocityX(320); 
            hk.flipX = true;
        } else {
            hk.setVelocityX(0);
            isHkTouchingDown && hk.anims.play('hk-idle', true);
        }
    } else if (hk.x > 2300) {
        if (hk.isDead) return; 

    if (isLeftKeyDown) {
        isHkTouchingDown && hk.anims.play('hk-walk', true);
        hk.setVelocityX(-225); 
        hk.flipX = false;
    } else if (isRightKeyDown) {
        isHkTouchingDown && hk.anims.play('hk-walk', true);
        hk.setVelocityX(225); 
        hk.flipX = true;
    } else {
        hk.setVelocityX(0);
        isHkTouchingDown && hk.anims.play('hk-idle', true);
    }

    if (isUpKeyDown && isHkTouchingDown && !hk.isJumping) {
        hk.setVelocityY(-800);
        hk.anims.play('hk-jump', true);
        hk.isJumping = true;  
    }
    }

    if (hk.x >= 3100) { 
        alcanzarCastillo(this);
    }


    this.mostrarMenu = () => {
        this.add.rectangle(2950, 300, 600, 350, 0x000000, 0.3).setOrigin(0.5, 0.5);
        this.add.text(2700, 200, '¿Quieres ser mi\n San Valentin?', { font: '42px MarioBrosFont', fill: '#C51D34' });
        this.add.text(2850, 325, '1. Opcion 1: SI', { font: '20px MarioBrosFont', fill: '#ffffff' });
        this.add.text(2850, 375, '2. Opcion 2: NO', { font: '20px MarioBrosFont', fill: '#ffffff' });

        this.input.keyboard.once('keydown-ONE', () => {
            window.open("https://youtu.be/sDMxQF18yvA?si=Y1obs6lfU7Wen9TE", "_blank");
        });

        this.input.keyboard.once('keydown-TWO', () => {
            this.scene.restart();
        });
    }
}

function killHK(game){

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


function alcanzarCastillo(scene){
    scene.hk.setVelocity(0, 0);  
    scene.hk.body.moves = false;
    scene.hk.anims.play('hk-zero', true);
    scene.mostrarMenu();
}

