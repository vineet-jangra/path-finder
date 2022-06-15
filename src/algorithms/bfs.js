import { getPath, doVisitedAnimation, doPathAnimation, doInstantAnimation, isCellValid } from '../utils/helpful';

const BFS = async (stateGrid, startX, startY, endX, endY, message, animationSpeed) => {
    const doAnimation = [];
    const parent = [];
    const result = await BFSHelper(stateGrid, startX, startY, endX, endY, doAnimation, parent);
    if(message) {
        doInstantAnimation(stateGrid, doAnimation, startX * 61 + startY, endX * 61 + endY, parent, '', result);
        return result;
    }
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed); 
    if(result !== "success") {
        return "failure";
    }
    const shortestPath = await getPath(parent);
    doPathAnimation(stateGrid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));
    return "success";
}

const BFSHelper = (grid, startX, startY, endX, endY, doAnimation, parent) => {
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    let queue = [];
    const directionX = [-1, 0, 1, 0];
    const directionY = [0, -1, 0, 1];
    let visited = initialize();
    queue.push([startX, startY]);
    visited[startX][startY] = true;
    
    while(queue.length > 0) {
        const X = queue[0][0];
        const Y = queue[0][1];
        queue.shift();
        const m = grid[X][Y].isWeight ? "t" : "f";
        doAnimation.push([X * 61 + Y, m, 0]);
        doAnimation.push([X * 61 + Y, m, 1]);
        for(let i = 0; i < 4; i++) {
            const newX = X + directionX[i], newY = Y + directionY[i];

            if(isCellValid(grid, newX, newY, visited)) {

                queue.push([newX, newY]);
                parent.push([X, Y, newX, newY]);
                visited[newX][newY] = true;

                if(newX === endX && newY === endY) {
                    doAnimation.push([X * 61 + Y, 'f']);
                    return "success";
                }
            }
        }
    }
    return "failure";
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

export default BFS;