import { getPath, doVisitedAnimation, doPathAnimation, doInstantAnimation, isCellValid } from '../utils/helpful';
const MAX = Number.MAX_SAFE_INTEGER;

const astar = async (grid, startX, startY, endX, endY, message, animationSpeed) => {    
    const parent = [], doAnimation = [];
    const result = await astarHelper(grid, startX, startY, endX, endY, doAnimation, parent); 
    if(message) {
        doInstantAnimation(grid, doAnimation, startX * 61 + startY, endX * 61 + endY, parent, '', result);
        return result;
    }
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    if(result === 'failure') return result;
    const shortestPath = getPath(parent);
    doPathAnimation(grid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));
    return result;
}

const astarHelper = (grid, startX, startY, endX, endY, doAnimation, parent) => {
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    const openSet = [];
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let gScore = [], fScore = [], visited = [];
    initialize(gScore, fScore, visited);

    gScore[startX][startY] = fScore[startX][startY] = 0;
    openSet.push([0, startX, startY]);

    while(openSet.length > 0) {
       const node = Sort(openSet, endX, endY);

        let x = node[1];
        let y = node[2];
        visited[x][y] = true;
        const m = grid[x][y].isWeight ? "t" : "f";
        doAnimation.push([x * 61 + y, m]);

        if(x === endX && y === endY) {
            parent.push([x, y, endX, endY]);
            return "success";
        }
        for(let i = 0; i < 4; i++) {
            const newX = x + dx[i], newY = y + dy[i];
           
            if(isCellValid(grid, newX, newY, visited)) {
                
                const gscore = gScore[x][y] + (grid[newX][newY].isWeight === true ? 15 : 1);
                const hValue = heuristic(newX, newY, endX, endY);
                const fscore = gscore + hValue;

                if(fScore[newX][newY] === MAX || fScore[newX][newY] > fscore) {
                    openSet.push([fscore, newX, newY]);
                    fScore[newX][newY] = fscore;
                    gScore[newX][newY] = gscore;
                    parent.push([x, y, newX, newY]);
                }
            }
        }
    }
    return "failure";
}

const Sort = (set, endX, endY) => {
    let index = 0, min = set[0];
    for(let i = 0; i < set.length; i++) {
        if(set[i][0] < min[0]) {
            min = set[i];
            index = i;
        }
        else if(set[i][0] === min[0]) {
            const h1 = heuristic(set[i][1], set[i][2], endX, endY);
            const h2 = heuristic(min[1], min[2], endX, endY);
            if(h1 < h2) {
                min = set[i];
                index = i;
            }
        }
    }
    const node = set[index];
    set.splice(index, 1);
    return node;
}

const initialize = (gScore, fScore, visited) => {
    for(let i = 0; i < 21; i++) {
        let temp = [];
        let vis = [];
        for(let j = 0; j < 61; j++) {
            temp.push(MAX);
            vis.push(false);
        }
        visited.push(vis); gScore.push(temp); fScore.push(temp);
    }
}

const heuristic = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export default astar;