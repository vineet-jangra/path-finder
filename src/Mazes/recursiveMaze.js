const recursiveMaze = (grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) => {
    const animate = [];
    generateMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, animate);
    animateIt(animate);
    return grid;
}

const animateIt = (animate) => {
    for(let i = 0; i < animate.length; i++) {
        setTimeout(() => {
            document.getElementsByClassName('node')[animate[i]].classList.remove('node-normal');
            document.getElementsByClassName('node')[animate[i]].classList.add('node-wall');
        }, i * 15);
    }
}

const generateMaze = (grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, animate) => {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }
    if(!surroundingWalls) {
        for(let i = 0; i < 21; i++) {
            for(let j = 0; j < 61; j++) {
                if(!grid[i][j].isStart && !grid[i][j].isFinish) {
                    if(i === 0 || i === 20 || j === 0 || j === 60) {
                        animate.push(i * 61 + j);
                        grid[i][j].isWall = true;
                    }
                }
            }
        }
        surroundingWalls = true;
    }

    if(orientation === 'horizontal') {
        let possibleRows = [], possibleCols = [];
        for(let i = rowStart; i <= rowEnd; i += 2) {
            possibleRows.push(i);
        }
        for(let i = colStart - 1; i <= colEnd + 1; i += 2) {
            possibleCols.push(i);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let currentCol = possibleCols[randomColIndex];
        for(let i = 0; i < 21; i++) {
            for(let j = 0; j < 61; j++) {
                if(i === currentRow && j !== currentCol && j >= colStart - 1 && j <= colEnd + 1) {
                    if(grid[i][j].isStart === false && grid[i][j].isFinish === false) {
                        animate.push(i * 61 + j);
                        grid[i][j].isWall = true;
                    }
                }
            }
        }
        if(currentRow - 2 - rowStart > colEnd - colStart) {
            generateMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, animate);
        } else {
            generateMaze(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls, animate);
        }
        if(rowEnd - (currentRow + 2) > colEnd - colStart) {
            generateMaze(grid, currentRow +  2, rowEnd, colStart, colEnd, orientation, surroundingWalls, animate);
        }
        else {
            generateMaze(grid, currentRow +  2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls, animate);
        }
    }
    else {
        let possibleRows = [], possibleCols = [];
        for(let i = rowStart -1; i <= rowEnd + 1; i += 2) {
            possibleRows.push(i);
        }
        for(let i = colStart; i <= colEnd; i += 2) {
            possibleCols.push(i);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let currentCol = possibleCols[randomColIndex];
        for(let i = 0; i < 21; i++) {
            for(let j = 0; j < 61; j++) {
                if(j === currentCol && i !== currentRow && i >= rowStart - 1 && i <= rowEnd + 1) {
                    if(grid[i][j].isStart === false && grid[i][j].isFinish === false) {
                        animate.push(i * 61 + j);
                        grid[i][j].isWall = true;
                    }
                }
            }
        }
        if(rowEnd - rowStart > currentCol - 2 - colStart) {
            generateMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls, animate);
        } else {
            generateMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, animate);
        }
        if(rowEnd - rowStart > colEnd - (currentCol + 2)) {
            generateMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, animate);
        }
        else {
            generateMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, animate);
        }
    }
}
export default recursiveMaze;