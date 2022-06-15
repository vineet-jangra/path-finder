const getInitialGrid = () => {
    const Grid = [];
    for (let i = 0; i < 21; i++) {
        const row = [];
        for (let j = 0; j < 61; j++) {
          const currentBox = {
            row: i,
            col: j,
            isStart: i === 2 && j === 5,
            isFinish: i === 19 && j === 49,
            isWall: false,
            isWeight: false,
          };
          row.push(currentBox);
        }
        Grid.push(row);
      }
    return Grid;
}

export default getInitialGrid;