import { getPath, doVisitedAnimation, doPathAnimation, doInstantAnimation, isCellValid } from '../utils/helpful';
let success = false;

const DFS = async (stateGrid, startX, startY, endX, endY, message, animationSpeed) => {
    stateGrid[endX][endY].isWall = stateGrid[startX][startY].isWall = false;
    let visited = initialize();
    const doAnimation = [], parent = [];
    await DFSHelper(stateGrid, startX, startY, endX, endY, visited, doAnimation, parent);
    doAnimation.push([endX * 61 + endY, 'f']);
    if(message) {
        const result = success === true ? "success" : "failure";
        console.log(parent);
        success = false;
        doInstantAnimation(stateGrid, doAnimation, startX * 61 + startY, endX * 61 + endY, parent, '', result);
        return result;
    }
   
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed); 
    if(success === false) return "failure";
    success = false;
    const shortestPath = getPath(parent);
    doPathAnimation(stateGrid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));

    return "success";
}

const DFSHelper = (grid, startX, startY, endX, endY, visited, doAnimation, parent) => {
    visited[startX][startY] = true;
    if(startY === endY && startX === endX) {
        success = true;
        console.log("fjound");
        return;
    }
    if(isCellValid(grid, startX, startY + 1, visited) && !visited[startX][startY + 1] && !success) {
        const m = grid[startX][startY].isWeight ? "t" : "f";
        doAnimation.push([startX * 61 + startY, m]);
        parent.push([startX, startY, startX, startY + 1]);
        DFSHelper(grid, startX , startY + 1, endX, endY, visited, doAnimation, parent);
    }
    if(isCellValid(grid, startX + 1, startY, visited) && !visited[startX + 1][startY] && !success) {
        const m = grid[startX][startY].isWeight ? "t" : "f";
        doAnimation.push([startX * 61 + startY, m]);
        parent.push([startX, startY, startX + 1, startY]);
        DFSHelper(grid, startX + 1, startY, endX, endY, visited, doAnimation, parent);
    }
    if(isCellValid(grid, startX, startY - 1, visited) && !visited[startX][startY - 1] && !success) {
        const m = grid[startX][startY].isWeight ? "t" : "f";
        doAnimation.push([startX * 61 + startY, m]);
        parent.push([startX, startY, startX, startY - 1]);
        DFSHelper(grid, startX, startY - 1, endX, endY, visited, doAnimation, parent);
    }
    if(isCellValid(grid, startX - 1, startY, visited) && !visited[startX - 1][startY] && !success) {
        const m = grid[startX][startY].isWeight ? "t" : "f";
        doAnimation.push([startX * 61 + startY, m]);
        parent.push([startX, startY, startX - 1, startY]);
        DFSHelper(grid, startX - 1, startY, endX, endY, visited, doAnimation, parent);
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

export default DFS;