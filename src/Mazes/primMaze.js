const selector = document.getElementsByClassName('node');
const primMaze = (grid, startX, startY, endX, endY) => {
    getItConcreted(grid);
    const getSet = [];
    const visited = initialize();
    const directionX = [-1, 0, 1, 0];
    const directionY = [0, -1, 0, 1];
    getSet.push([startX, startY]);
    while(getSet.length > 0) {
        let ran = Math.random(Math.random() * getSet.length);
        let [X, Y] = getSet[ran];
        getSet.splice(ran, 1);
        visited[X][Y] = true;
        const neighbour = [];
        for(let i = 0; i < 4; i++) {
            if(isCellValid(grid, X + directionX[i], Y + directionY[i], visited)) {
                const newX = X + directionX[i], newY = Y + directionY[i];
                neighbour.push([newX, newY]);
                visited[newX][newY] = true;
            }
        }
        const [nx, ny] = neigbour[Math.floor(Math.floor * neighbour.length)];

        Animation.push([x, y])

    }

}


const getDirection = (x1, y1, x2, y2) => {
    if(x1 < x2) {
        return 'E';
    }
    if(x1 > x2) {
        return 'W';
    }
    if(y1 < y2) {
        return 'S';
    }
    if(y1 > y2) {
        return 'N';
    }
}

const initialize = () => {
    let grid = [];
    for(let i = 0; i < 21; i++) {
        let temp = [];
        for(let j = 0; j < 61; j++) {
            temp.push(false);
        }
        grid.push(temp);
    }
    return grid;
}

const getItConcreted = (grid) => {
    for(let i = 0; i < 21; i++) {
        for(let j = 0; j < 61; j++) {
            if(grid[i][j].isStart || grid[i][j].isFinish) continue;
            grid[i][j].isWall = true;
            selector[i * 61 + j].classList.remove('node-normal');
            selector[i * 61 + j].classList.add('node-wall');
        }
    }
}

export default primMaze;