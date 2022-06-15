const selector = document.getElementsByClassName('node');

const getConcreteWall = (grid, location) => {
    const x = Math.floor(location / 61);
    const y = location % 61;
    if (grid[x][y].isStart || grid[x][y].isFinish) {
      return grid;
    }
    if(grid[x][y].isWall) {
      grid[x][y].isWall = false;
      selector[location].className = "node node-normal";
    }
    else {
      grid[x][y].isWall = true;
      selector[location].className = "node node-wall";
    }
    return grid;
}
const getWeightedWall = (grid, location) => {
    const x = Math.floor(location / 61);
    const y = location % 61;
    if (grid[x][y].isStart || grid[x][y].isFinish) {
        return grid;
    }

    if(grid[x][y].isWeight) {
        grid[x][y].isWeight = false;
        selector[location].className = "node node-normal";
    }
    else {
        grid[x][y].isWeight = true;
        selector[location].className = "node node-weight";
    }
    return grid;
}

module.exports = {
    getConcreteWall,
    getWeightedWall,
}