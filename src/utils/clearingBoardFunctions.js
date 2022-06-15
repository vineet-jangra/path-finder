const selector = document.getElementsByClassName('node');

const clearWalls = (grid) => {
    for(let i = 0; i < 21; i++) {
        for(let j = 0; j < 61; j++) {
            if(grid[i][j].isWall) {
                grid[i][j].isWall = false;
                const rem = selector[i * 61 + j];
                if(rem.classList.contains('node-path')) selector[i * 61 + j].classList.remove('node-path');
                if(rem.classList.contains('node-visited')) selector[i * 61 + j].classList.remove('node-visited');
    
                selector[i * 61 + j].classList.remove('node-wall');
                selector[i * 61 + j].classList.add('node-normal');
            }
            else if( grid[i][j].isWeight) {
                grid[i][j].isWeight = false;
                const rem = selector[i * 61 + j];
                if(rem.classList.contains('node-path')) selector[i * 61 + j].classList.remove('node-path');
                if(rem.classList.contains('node-visited')) selector[i * 61 + j].classList.remove('node-visited');
    
                selector[i * 61 + j].classList.remove('node-weight');
                selector[i * 61 + j].classList.add('node-normal');
            }
        }
    }
    return grid;
}

const clearPrevious = (x1, y1, x2, y2, grid) => {
    const Grid = [];
      for (let i = 0; i < 21; i++) {
        const row = [];
        for (let j = 0; j < 61; j++) {
          const currentBox = {
            row: i,
            col: j,
            isStart: i === x1 && j === y1,
            isFinish: i === x2 && j === y2,
            isWall: grid[i][j].isWall,
            isWeight: grid[i][j].isWeight,
          };
          if((i === x1 && j === y1) || (i === x2 && j === y2) || grid[i][j].isWall)  {
          }
          else if(grid[i][j].isWeight) {
            const rem = selector[i * 61 + j];
            rem.className = "node node-weight";
          }
          else {
            const rem = selector[i * 61 + j];
            rem.className = "node node-normal";
          }
          row.push(currentBox);
        }
        Grid.push(row);
      }
      console.log(Grid);
      return Grid;
}
const clearEverything = (grid) => {
  console.log('1')
  for(let i = 0; i < 21; i++) {
    for(let j = 0; j < 61; j++) {
      if(grid[i][j].isStart || grid[i][j].isFinish) continue;
      if(grid[i][j].isWall || grid[i][j].isWeight) {
        grid[i][j].isWall = grid[i][j].isWeight = false;
      }
      selector[i * 61 + j].className = "node node-normal";
    }
  }
  return grid;
}

module.exports = {
    clearPrevious,
    clearWalls,
    clearEverything,
}