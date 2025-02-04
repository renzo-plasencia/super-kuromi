export const createAnimations = (game) => {
    game.anims.create({
      key: 'hk-walk',
      frames: game.anims.generateFrameNumbers(
        'kuromi_caminando',
        { start: 0, end: 2 } 
      ),
      frameRate: 10,
      repeat: -1
    })
  
    game.anims.create({
      key: 'hk-idle',
    //   frames: [{ key: 'kuromi', frame: 0 }]
    frames: game.anims.generateFrameNumbers(
        'kuromi',
        { start: 0, end: 2 }
      ),
      frameRate: 3.5,
      repeat: -1
    })

    game.anims.create({
        key: 'hk-zero',
        frames: [{ key: 'kuromi', frame: 2 }]
      })
  
    game.anims.create({
      key: 'hk-jump',
      frames: [{ key: 'kuromi_caminando', frame: 3 }]
    })
  
    game.anims.create({
      key: 'hk-dead',
      frames: [{ key: 'kuromi_caminando', frame: 3 }]
    })
    // ------ GOOMBA ------
    game.anims.create({
      key: 'goomba-walk',
      frames: game.anims.generateFrameNumbers(
        'goomba',
        { start: 0, end: 1 }
      ),
      frameRate: 6,
      repeat: -1
    })

    game.anims.create({
      key: 'goomba-dead',
      frames: [{ key: 'goomba', frame: 2 }]
    })

    game.anims.create({
        key: 'coin-idle',
        frames: game.anims.generateFrameNumbers(
          'coin',
          { start: 0, end: 3 }
        ),
        frameRate: 6,
        repeat: -1
      })

    //------ KOOPA ------
    game.anims.create({
      key: 'koopa-walk',
      frames: game.anims.generateFrameNumbers(
        'koopa',
        { start: 0, end: 1 }
      ),
      frameRate: 6,
      repeat: -1
    })

    game.anims.create({
      key: 'koopa-dead',
      frames: [{ key: 'koopa-dead', frame: 1 }]
    })

  }