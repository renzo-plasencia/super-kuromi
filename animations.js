export const createAnimations = (game) => {
    game.anims.create({
      key: 'hk-walk',
      frames: game.anims.generateFrameNumbers(
        'kuromi_caminando',
        { start: 0, end: 2 } 
      ),
      frameRate: 12,
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
      key: 'hk-jump',
      frames: [{ key: 'kuromi', frame: 2 }]
    })
  
    game.anims.create({
      key: 'hk-dead',
      frames: [{ key: 'kuromi_caminando', frame: 3 }]
    })
  }