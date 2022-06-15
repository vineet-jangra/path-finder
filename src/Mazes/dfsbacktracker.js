import { getPath, doVisitedAnimation, doPathAnimation, doInstantAnimation, isCellValid } from '../utils/helpful';
import mazeSample from '../algorithms/sample';
const maze = (grid, startX, startY, endX, endY) => {
    getItConcreted(grid);
    console.log(mazeSample(21, 61));
    return ;
    let visited = initialize();
    const animate = []
    DFSHelper(grid, startX, startY, endX, endY, visited, animate);
    console.log(animate);
    for(let i = 0; i < animate.length; i++) {
        setTimeout(() => {
            document.getElementsByClassName('node')[animate[i]].classList.remove('node-wall');
            document.getElementsByClassName('node')[animate[i]].classList.add('node-normal');;
        }, i * 10);
    }
    return grid;
}
const DFSHelper = (grid, startX, startY, endX, endY, visited, animate) => {
    visited[startX][startY] = true;
    if(startY === endY && startX === endX) {
        return;
    }
    if(cellValid(grid, startX, startY + 1, visited) && !visited[startX][startY + 1]) {
        animate.push(startX * 61 + startY);
        grid[startX][startY].isWall = false;
        DFSHelper(grid, startX , startY + 1, endX, endY, visited, animate);
    }
    if(cellValid(grid, startX + 1, startY, visited) && !visited[startX + 1][startY]) {
        animate.push(startX * 61 + startY);
        grid[startX][startY].isWall = false;
        DFSHelper(grid, startX + 1, startY, endX, endY, visited, animate);
    }
    if(cellValid(grid, startX, startY - 1, visited) && !visited[startX][startY - 1]) {
        animate.push(startX * 61 + startY);
        grid[startX][startY].isWall = false;
        DFSHelper(grid, startX, startY - 1, endX, endY, visited, animate);
    }
    if(cellValid(grid, startX - 1, startY, visited) && !visited[startX - 1][startY]) {
        animate.push(startX * 61 + startY);
        grid[startX][startY].isWall = false;
        DFSHelper(grid, startX - 1, startY, endX, endY, visited, animate);
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
const cellValid = (grid, X, Y, visited) => {
    if(X < 0 || X >= 21 || Y < 0 || Y >= 61) {
        return false;
    }
    if(visited[X][Y] === true || grid[X][Y].isWall === false) {
        return false;
    }
    return true;
}


const getItConcreted = (grid) => {
    for(let i = 0; i < 21; i++) {
        for(let j = 0; j < 61; j++) {
            if(grid[i][j].isStart || grid[i][j].isFinish) continue;
            grid[i][j].isWall = true;
            document.getElementsByClassName('node')[i * 61 + j].classList.remove('node-normal');
            document.getElementsByClassName('node')[i * 61 + j].classList.add('node-wall');
        }
    }
}

export default maze;