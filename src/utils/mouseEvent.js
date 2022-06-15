const x = Math.floor(e / 60);
const y = e % 60;
if(x === this.state.start[0] && y === this.state.start[1]) {
    this.setState({ movingStart: true});
    return ;
}
else if(x === this.state.end[0] && y === this.state.end[1]) {
  return this.setState({movingEnd: true});
}
if(!this.state.isWallBlack) {
  let grid = getWeightWall(this.state.nodesGrid, e);
  this.setState({ nodesGrid: grid, mousePressed: true });
}
else {
  let grid = getWall(this.state.nodesGrid, e);
  this.setState({ nodesGrid: grid, mousePressed: true });
}