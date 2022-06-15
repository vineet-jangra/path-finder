import { getPath, doVisitedAnimation, doPathAnimation, doInstantAnimation } from '../utils/helpful';
const MAX = Number.MAX_SAFE_INTEGER;

const Dijkstra = async (grid, startX, startY, endX, endY, message, animationSpeed) => {
    const doAnimation = [];
    const parent = [];
    const result = await DijkstraHelper(grid, startX, startY, endX, endY, doAnimation, parent);
    if(message) {
        doInstantAnimation(grid, doAnimation, startX * 61 + startY, endX * 61 + endY, parent, '', result);
        return result;
    }
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    if(result === "failure") return "failure";
    const shortestPath = getPath(parent); 
    doPathAnimation(grid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));
   
  return "success";
}


const DijkstraHelper = (grid, startX, startY, endX, endY, doAnimation, parent) => {
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    let distance = initialize();
    distance[startX][startY] = 0;
    const helper = [];
    helper.push([0, startX, startY]);
    while(helper.length > 0) {
        Sort(helper);
        let x = helper[0][1];
        let y = helper[0][2];
        let m = grid[x][y].isWeight ? "t" : "f";
        doAnimation.push([helper[0][1] * 61 + helper[0][2], m]);
        helper.shift();
        for(let i = 0; i < 4; i++) {
            if(isCellValid(grid, x + dx[i], y+ dy[i])) {
                const newX = x + dx[i];
                const newY = y + dy[i];
                parent.push([x, y, newX, newY]);
                if(newX === endX && newY === endY) {
                    doAnimation.push([newX * 61 + newY, 'f']);
                    console.log('found');
                    return "success";
                }
                let dist = grid[newX][newY].isWeight === true ? 15 : 1;

                if(distance[newX][newY] > distance[x][y] + dist) {
                    distance[newX][newY] = distance[x][y] + dist;
                    helper.push([distance[newX][newY], newX, newY]);
                }
            }
        }
    }
    return "failure";
}
const isCellValid = (grid, X, Y) => {
    if(X < 0 || X >= 21 || Y < 0 || Y >= 61) {
        return false;
    }
    if(grid[X][Y].isWall === true) {
        return false;
    }
    return true;
}

const Sort = (helper) => {
    helper.sort((first, second) => first[0] - second[0]);
}
const initialize = () => {
    let grid = [];
    for(let i = 0; i < 21; i++) {
        let temp = [];
        for(let j = 0; j < 61; j++) {
            temp.push(MAX);
        }
        grid.push(temp);
    }
    return grid;
}

export default Dijkstra;