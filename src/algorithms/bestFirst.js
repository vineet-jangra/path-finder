import { getPath, doVisitedAnimation, doPathAnimation, isCellValid, doInstantAnimation } from "../utils/helpful";
// This algorithm differs from astar in concept that it does not considers previously calculated
// values and only the hueristics while astar considers both
const bestFirst = async (grid, startX, startY, endX, endY, message, animationSpeed) => {
    const doAnimation = [], parent = [];
    const result = greedy(grid, startX, startY, endX, endY, doAnimation, parent);
    if(message) {
        doInstantAnimation(grid, doAnimation, startX * 61 + startY, endX * 61 + endY, parent);
        return result;
    }
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    if(result === 'failure') return result; 
    const shortestPath = await getPath(parent);
    shortestPath.pop();
    doPathAnimation(grid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));
    return "success";
}

const greedy = (grid, startX, startY, endX, endY, doAnimation, parent) => {
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    const queue = [];
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let distance = []
    let visited = initialize(distance);
    
    visited[startX][startY] = true;
    distance[startX][startY] = 0;
    queue.push([startX, startY]);

    while(queue.length > 0) {
        let closestNode = Sort(queue, distance);
        const X = closestNode[0], Y = closestNode[1];
        let m = grid[X][Y].isWeight ? "t" : "f";
        doAnimation.push([X * 61 + Y, m]);

        visited[X][Y] = true;
        if(X === endX && Y === endY) {
            console.log(distance);
            return "success";
        }
        
        for(let i = 0; i < 4; i++) {
            if(isCellValid(grid, X + dx[i], Y + dy[i], visited)) {

                const newX = X + dx[i], newY = Y + dy[i];
                queue.push([newX, newY]);
                visited[newX][newY] = true;

                let distanceToBeCompared = (grid[newX][newY].isWeight ? 15 : 1) + heuristic(newX, newY, endX, endY);
                
                if(distance[newX][newY] > distanceToBeCompared) {
                    distance[newX][newY] = distanceToBeCompared;
                    parent.push([X, Y, newX, newY]);
                }
            }
        }
    
    }
    return 'failure';

}

const Sort = (queue, distance) => {
    let current = queue[0], index = 0;
    for(let i = 0; i < queue.length; i++) {
        if(distance[current[0]][current[1]] > distance[queue[i][0]][queue[i][1]]) {
            current = queue[i];
            index = i;
        }
    }
    queue.splice(index, 1);
    return current;
}


const initialize = (distance) => {
    let grid = [];
    for(let i = 0; i < 21; i++) {
        let temp = [];
        let val = [];
        for(let j = 0; j < 61; j++) {
            temp.push(false);
            val.push(Number.MAX_SAFE_INTEGER);
        }
        grid.push(temp);
        distance.push(val);
    }
    return grid;
}

const heuristic = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export default bestFirst;
