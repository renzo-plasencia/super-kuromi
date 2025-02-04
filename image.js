const INIT_IMAGES = [
    { key: 'nube1', path: 'assets/scenery/overworld/cloud1.png' },
    { key: 'pipe_1', path: 'assets/scenery/vertical-medium-tube.png' },
    { key: 'pipe_bottom', path: 'assets/scenery/vertical-large-tube.png' },
    { key: 'pipe_up', path: 'assets/scenery/vertical-large-tube.png.png' },
    { key: 'block', path: 'assets/blocks/overworld/block.png' },
    { key: 'floor_bricks', path: 'assets/scenery/overworld/floorbricks.png' },
    { key: 'emptyBlock', path: 'assets/blocks/overworld/emptyBlock.png' },
    { key: 'immovableBlock', path: 'assets/blocks/overworld/immovableBlock.png' },
    { key: 'castle', path: 'assets/scenery/castle.png' },
    { key: 'flag-mast', path: 'assets/scenery/flag-mast.png' },
    { key: 'final-flag', path: 'assets/scenery/final-flag.png' }
]


export const initImages = ({load}) => {
    INIT_IMAGES.forEach(({ key, path }) => {
        load.image(key, path)
    })
}