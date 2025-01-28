import { createAnimations } from './animations.js';
//Global Phaser
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

//Pasar configuración
new Phaser.Game(config);

// 1. Se ejecuta primero
function preload() {
    //this -> juego que estamos construyendo
    this.load.image(
        'nube1', 'assets/scenery/overworld/cloud1.png'
    );

    this.load.image(
        'floor_bricks', 'assets/scenery/overworld/floorbricks.png'
    );

    this.load.spritesheet(
        'hk',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    );

    this.load.spritesheet(
        'kuromi',
        './kuromi_ide.png',
        { frameWidth: 80, frameHeight: 80 }
    );

    this.load.spritesheet(
        'kuromi_caminando',
        './kuromi_walking.png',
        { frameWidth: 80, frameHeight: 80 }
    );

    this.load.audio(
        'game-over','assets/sound/music/gameover.mp3'
    )
}

// 2. Se ejecuta despues de preload
function create() {
    // this.add.image(40, 200, 'nube1')
    //     .setOrigin(0,0)
    //     .setScale(0.5);
    
    // this.add.image(300, 100, 'nube1')
    //     .setOrigin(0,0)
    //     .setScale(0.5);

    // this.add.image(600, 200, 'nube1')
    //     .setOrigin(0,0)
    //     .setScale(0.5);

    this.floor = this.physics.add.staticGroup();

    for (let y = 20; y < 2000; y += 300) { // Ajusta 64 al ancho de tu textura
        let altura = Math.floor(Math.random() * 400) + 0.9;
        this.add.image(y, altura, 'nube1')
            .setOrigin(0, 0)
            .setScale(0.5);
    }

    for (let x = 0; x < 2000; x += 120) { // Ajusta 64 al ancho de tu textura
        this.floor.create(x, config.height - 16, 'floor_bricks')
            .setOrigin(0, 0.5)
            .refreshBody();
    }

    // this.floor
    //     .create(0,config.height -16, 'floor_bricks')
    //     .setOrigin(0,0.5)
    //     .refreshBody();
    // this.floor
    //     .create(125,config.height -16, 'floor_bricks')
    //     .setOrigin(0,0.5)
    //     .refreshBody();

    // this.floor
    //     .create(200,config.height -16, 'floor_bricks')
    //     .setOrigin(0,0.5)
    //     .refreshBody();

    this.hk = this.physics.add.sprite(50,320, 'kuromi')
        .setOrigin(0,1) 
        .setCollideWorldBounds(true)
        .setScale(0.7)
        .setGravityY(300);
       
    
    //Espacio del mundo
    this.physics.add.collider(this.hk, this.floor);
    this.physics.world.setBounds(0,0,2000,config.height);
    //Seguimiento camara
    this.cameras.main.setBounds(0,0,2000,config.height);
    this.cameras.main.startFollow(this.hk);
    //Animaciones
    createAnimations(this);
    //Teclado
    this.keys = this.input.keyboard.createCursorKeys();
}

// 3. Se ejecuta en cada frame
function update() {
    if (this.hk.isDead) return; 
    
    if (this.keys.left.isDown) {
        this.hk.anims.play('hk-walk', true);
        this.hk.x -= 4;
        this.hk.flipX = false;
    } else if (this.keys.right.isDown) {
        this.hk.anims.play('hk-walk', true);
        this.hk.x += 4;
        this.hk.flipX = true;
        
    } else {
        this.hk.anims.play('hk-idle', true);
    }

    if (this.keys.up.isDown && this.hk.body.touching.down) {
        this.hk.setVelocityY(-400);
        this.hk.anims.play('hk-jump', true);
    }

    if (this.hk.y >= config.height) {
        this.hk.isDead = true;
        this.hk.anims.play('hk-dead');
        this.hk.setCollideWorldBounds(false);
        this.sound.add('game-over', { volume: 0.1 }).play();

        setTimeout(() => {
            this.hk.setVelocityY(-350);
        }, 100);

        setTimeout(() => {
            this.scene.restart();
        }, 2000);
    }
   
}