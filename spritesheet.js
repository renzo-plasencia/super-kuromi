const INIT_SPRITESHEETS = [
    {
        key: 'kuromi',
        path: './kuromi_ide.png',
        frameWidth: 80,
        frameHeight: 80
    },
    {
        key: 'kuromi_caminando',
        path: './kuromi_walking.png',
        frameWidth: 80,
        frameHeight: 80
    },
    {
        key: 'goomba',
        path: 'assets/entities/overworld/goomba.png',
        frameWidth: 16,
        frameHeight: 16
    },
    {
        key: 'coin',
        path: 'assets/collectibles/coin.png',
        frameWidth: 16,
        frameHeight: 16
    },
    {
        key: 'koopa',
        path: 'assets/entities/koopa.png',
        frameWidth: 16,
        frameHeight: 24
    },
    {
        key: 'koopa-dead',
        path: 'assets/entities/shell.png',
        frameWidth: 16,
        frameHeight: 15
    }
]


export const initSpritesheet = ({load}) => {
    INIT_SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
        load.spritesheet(key, path, { frameWidth, frameHeight })
    })
}