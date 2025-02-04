import { createAnimations } from './animations.js';
import { initAudio, playAudio } from './audio.js';
import { checkControls } from './controls.js';
import { initSpritesheet } from './spritesheet.js';
import { initImages } from './image.js';
import { createUI } from './helpers/ui.js';
import CountdownController from './helpers/countdownController.js';
import { createBlocks, createClouds, initializePhysicsGroups, createPipeLarge, createPipeSimple, createFloor, createLetter, createCastle, createFlagMast, createSaltadera } from './level/levelObjects.js';
import { createPlayer, setupCamera, setupCollisions } from './level/gameSetup.js';
import { createEnemies } from './level/enemies.js';
import { createCoins } from './level/coins.js';
import { killHK } from './level/score.js';


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
let init_position = 2500;
//Tamaño del nivel
let level_size = 3345;


/* 
FALTANTES:
4. HACER LOS BLOQUES ROMPIBLES O MOVIBLES PORQUE ES KUROMI CHIQUITA
5. HACER QUE EL KOOPA SE VUELVA CAPARAZÓN
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
    initializePhysicsGroups(this);
    //Crear nubes
    createClouds(this, level_size);
    //Crear bloques
    createBlocks(this,350, 4, 'block');
    createBlocks(this,580, 4, 'block');
    createBlocks(this,1200, 1, 'emptyBlock',540);
    //Crear pipes
    createPipeSimple(this, 200);
    createPipeLarge(this,780);
    //Letras
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
    // Crear Letras del Mapa
    createLetter(this, 1300, 425, letraT);
    createLetter(this, 1550, 425, corazon);
    createLetter(this, 1780, 425, a);
    createLetter(this, 1960, 425, m);
    createLetter(this, 2140, 425, o); 
    //Saltadera
    createSaltadera(this);
    //Castillo
    createCastle(this);
    //Bandera
    createFlagMast(this);
    //Crear suelo
    createFloor(this, level_size);
    //Crear personaje, enemigos y monedas
    createPlayer(this, init_position);
    createEnemies(this);
    createCoins(this);
    setupCollisions(this);
    setupCamera(this, level_size);

    //Teclado
    this.keys = this.input.keyboard.createCursorKeys();
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

    if (hk.x >= 2980) { 
        
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

function alcanzarCastillo(scene) {
    scene.mostrarMenu();
    if (scene.audioPlayed) return;
    scene.audioPlayed = true;

    // 1. Detener al personaje y congelarlo
    scene.hk.setVelocity(0, 0);
    scene.hk.body.moves = false;
    scene.hk.anims.play('hk-zero', true);
    if (!scene.sound.get('win')?.isPlaying) {
        playAudio('win', scene);
    }
    // 2. Esperar 1 segundo antes de comenzar la animación de descenso
    scene.time.delayedCall(1000, () => {
        scene.tweens.add({
            targets: scene.hk,
            y: scene.scale.height - 25, // 🔹 Altura del suelo
            duration: 1000, // 🔹 1 segundo para descender suavemente
            ease: 'Quad.easeOut',
        });
    });
    
}

