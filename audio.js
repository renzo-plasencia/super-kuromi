const INIT_AUDIOS = [
    {
        key: 'game-over',
        path: 'assets/sound/music/gameover.mp3'
    },
    {
        key: 'win',
        path: 'assets/sound/music/win.wav'
    },
    {
        key: 'goomba-stomp',
        path: 'assets/sound/effects/goomba-stomp.wav'
    },
    {
        key: 'coin-pickup',
        path: 'assets/sound/effects/coin.mp3'
    }
]

export const initAudio = (load) => {
    INIT_AUDIOS.forEach(({ key, path }) => {
        load.audio(key, path);
    })
}

export const playAudio = (id, { sound }, {volume = 0.1} = {}) =>
{
    try {
        return sound.add(id, { volume }).play();
    } catch (error) {
        console.error(error);
    }
}