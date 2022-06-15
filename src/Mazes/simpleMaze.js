const generateSimpleMaze = (grid, type) => {
    const classToAdd = type === 'wall' ? 'node-wall' : 'node-weight';
    const animated = simpleMaze(grid, type);
    for(let i = 0; i < animated.length; i++) {
        document.getElementsByClassName('node')[animated[i]].classList.remove('node-normal');
        document.getElementsByClassName('node')[animated[i]].classList.add(classToAdd);
    }
    return grid;
}
const simpleMaze = (grid, type) => {
    const animate = [];
    for(let i = 0; i < 21; i++) {
        for(let j = 0; j < 61; j++) {
            const randomNumber = Math.random();
            if(randomNumber < 0.25 && !grid[i][j].isStart && !grid[i][j].isFinish) {
                animate.push(i * 61 + j);
                if(type === 'wall') {
                    grid[i][j].isWall = true;
                }
                else {
                    grid[i][j].isWeight = true;
                }
            }
        }
    }
    return animate;
}
export default generateSimpleMaze;