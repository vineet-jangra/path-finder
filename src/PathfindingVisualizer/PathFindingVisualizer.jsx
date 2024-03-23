import React, { Component } from "react";

import NavBar from '../NavBarItems/Navbar';
import Node from "./Node/Node";
import "./PathFindingVisualizer.css";

import Algorithms from '../utils/algorithmExporter'; // ALGORITHM OBJECT

import getInitialGrid from '../utils/grid';
import { clearPrevious, clearWalls, clearEverything } from '../utils/clearingBoardFunctions';
import { getConcreteWall, getWeightedWall } from '../utils/wallFunctions';

import generateSimpleMaze from '../Mazes/simpleMaze';
import recursiveMaze from '../Mazes/recursiveMaze';
import verticalMaze from "../Mazes/vertical";
import horizontalMaze from "../Mazes/horizontal";

let selector;
class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodesGrid: [],
      start: [],
      end: [],
      isWallBlack: true,
      mousePressed: false,
      movingStart: false,
      movingEnd: false,
      Success: false,
      algorithm:'',
      animationSpeed: 20,
      shouldItBeAllowed: true,
    };
  }
  clearBoard(x1, y1, x2, y2) {
    if(x1 === undefined) {
      x1 = this.state.start[0]; y1 = this.state.start[1]; x2 = this.state.end[0]; y2 = this.state.end[1];
    }
    const nodesGrid = clearPrevious(x1, y1, x2, y2, this.state.nodesGrid);
    this.setState({ nodesGrid: nodesGrid, start: [x1, y1], end: [x2, y2] });
  }
  disableEverythin(n) {
    const Val = (n === 1) ? false : true;
    this.setState({ shouldItBeAllowed: Val });
  }
  clearWalls() {
    if(!this.state.shouldItBeAllowed) return;
    console.log(this.state.nodesGrid,'1');
    const n = clearEverything(this.state.nodesGrid);
    this.setState({ nodesGrid: n });
  }
  componentDidMount() {
    const Grid = getInitialGrid();
    selector = document.getElementsByClassName('node');
    this.setState({ nodesGrid: Grid, start: [2, 5], end: [19, 49] });
  }
  onMouseDown(location) {
    if(!this.state.shouldItBeAllowed) return;
    const x = Math.floor(location / 61);
    const y = location % 61;
    if(x === this.state.start[0] && y === this.state.start[1]) {
        this.setState({ movingStart: true });
        return ;
    }
    else if(x === this.state.end[0] && y === this.state.end[1]) {
        this.setState({ movingEnd: true });
        return;
    }
    if(this.state.isWallBlack === false) {
      let grid = getWeightedWall(this.state.nodesGrid, location);
      this.setState({ nodesGrid: grid, mousePressed: true });
    }
    else {
      let grid = getConcreteWall(this.state.nodesGrid, location);
      this.setState({ nodesGrid: grid, mousePressed: true });
    }
  }
  onMouseEnter(location) {
    if(!this.state.shouldItBeAllowed) return;

    const newX = Math.floor(location / 61);
    const newY = location % 61;
    let grid = this.state.nodesGrid;

    if(this.state.movingStart === true) {
      const currentX = this.state.start[0];
      const currentY = this.state.start[1]; 

      if(newX === this.state.end[0] && newY === this.state.end[1]) return;
      if(this.state.algorithm.length > 0) {
        this.clearBoard(newX, newY, this.state.end[0], this.state.end[1]);
        this.selectAlgo(grid, newX, newY, this.state.end[0], this.state.end[1]);
      }
      selector[currentX * 61 + currentY].className = "node node-normal"
      selector[newX * 61 + newY].className = "node node-start";
      grid[currentX][currentY].isStart = false;
      grid[newX][newY].isStart = true;
      grid[newX][newY].isWall = false;
      return this.setState({nodesGrid: grid, movingStart: true, start: [newX, newY]});  
    }
    else if(this.state.movingEnd === true) {
      const currentX = this.state.end[0];
      const currentY = this.state.end[1]; 
      if(newX === this.state.start[0] && newY === this.state.start[1]) return;
      if(this.state.algorithm.length > 0) {
        this.clearBoard(this.state.start[0], this.state.start[1], newX, newY);
        this.selectAlgo(grid, this.state.start[0], this.state.start[1], newX, newY);
      }

      selector[currentX * 61 + currentY].className = "node node-normal";
      selector[newX * 61 + newY].className = "node node-finish";
      grid[currentX][currentY].isFinish = false;
      grid[newX][newY].isFinish = true;
      grid[newX][newY].isWall = false;
      return this.setState({nodesGrid: grid, end: [newX, newY]});
    }
    if(this.state.mousePressed === false) return;
    if(this.state.isWallBlack === false) {
      let nodesGrid = getWeightedWall(this.state.nodesGrid, location);
      return this.setState({ nodesGrid: nodesGrid });
    }
    else {
      let nodesGrid = getConcreteWall(this.state.nodesGrid, location);
      return this.setState({ nodesGrid: nodesGrid });
    }
  }
  onMouseUp(location) {
    // if(!this.state.shouldItBeAllowed) return;

    const newX = Math.floor(location / 61);
    const newY = location % 61;
    let grid = this.state.nodesGrid;

    if(this.state.movingStart === true) {
      const currentX = this.state.start[0];
      const currentY = this.state.start[1]; 
      if(newX === this.state.end[0] && newY === this.state.end[1]) return;

      selector[currentX * 61 + currentY].className = "node node-normal"
      selector[newX * 61 + newY].className = "node node-start";

      grid[currentX][currentY].isStart = false;
      grid[newX][newY].isStart = true; grid[newX][newY].isWall = false;
     return this.setState({nodesGrid: grid, movingStart: false, start: [newX, newY]});
    }
    else if(this.state.movingEnd === true) {
      const currentX = this.state.end[0];
      const currentY = this.state.end[1]; 
      if(newX === this.state.start[0] && newY === this.state.start[1]) return;

      selector[currentX * 61 + currentY].className = "node node-normal"
      selector[newX * 61 + newY].className = "node node-finish";

      grid[currentX][currentY].isFinish = false;
      grid[newX][newY].isFinish = true; grid[newX][newY].isWall = false;
      return this.setState({nodesGrid: grid, movingEnd: false, end: [newX, newY]});
    }
    else if(this.state.mousePressed) {
      return this.setState({ mousePressed: false });
    }
  }
  async bfs() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.BFS(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "BFS"});
    }
    else {
      this.setState({ Success: false, algorithm: "BFS"});
    }
  }
  async dfs() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.DFS(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "DFS"});
    }
    else {
      this.setState({ Success: false, algorithm: "DFS"})
    }
  }
  async dijkstra() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.Dijkstra(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "Dijkstra"});
    }
    else {
      this.setState({ Success: false, algorithm: "Dijkstra"})
    }
  }
  async aStar() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.Astar(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "Astar"});
    }
    else {
      this.setState({ Success: false, algorithm: "Astar"})
    }
  }
  async aStar2() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.bidirectionalAstar(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "biaster"});
    }
    else {
      this.setState({ Success: false, algorithm: "biaster"})
    }
  }
  async Bidirectional() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.bidirectional(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "Bidirectional"});
    }
    else {
      this.setState({ Success: false, algorithm: "Bidirectional"})
    }
  }
  async greedy() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.bestFirst(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "greedy"});
    }
    else {
      this.setState({ Success: false, algorithm: "greedy"})
    }
  }
  async swarm() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.Swarm(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "swarm"});
    }
    else {
      this.setState({ Success: false, algorithm: "swarm"})
    }
  }
  async dijkstra2() {
    const [startX, startY] = this.state.start;
    const [endX, endY] = this.state.end;
    if(this.state.algorithm.length > 0) {
      await this.clearBoard(startX, startY, endX, endY);
    }
    const result = await Algorithms.biDijkstra(this.state.nodesGrid, this.state.start[0], this.state.start[1], this.state.end[0], this.state.end[1], undefined, this.state.animationSpeed);
    if(result === 'success') {
      this.setState({ Success: true, algorithm: "bi-dijkstra"});
    }
    else {
      this.setState({ Success: false, algorithm: "bi-dijkstra"})
    }
  }
  setWall(type) {
    const Val = type === 'weight' ? false : true;
    this.setState({ isWallBlack: Val });
  }
  Speed(type) {
    const speed = type === 'Fast' ? 20 : 40;
    this.setState({ animationSpeed: speed });
  }
  selectAlgo(grid, startX, startY, endX, endY) {
    let result;
    if(this.state.algorithm === 'Dijkstra') {
      result = Algorithms.Dijkstra(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'DFS') {
      result = Algorithms.DFS(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'BFS') {
      result = Algorithms.BFS(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'Astar') {
      result = Algorithms.Astar(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'Bidirectional') {
      result = Algorithms.bidirectional(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'biaster') {
      result = Algorithms.bidirectionalAstar(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'greedy') {
      result = Algorithms.bestFirst(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'swarm') {
      result = Algorithms.Swarm(grid, startX, startY, endX, endY, 'fast');
    }
    else if(this.state.algorithm === 'bi-dijkstra') {
      result = Algorithms.biDijkstra(grid, startX, startY, endX, endY, 'fast');
    }
    if (result === 'failure') {
      this.setState({ Success: false });
    }
    else {
      this.setState({ Success: true });
    }
  }
  MazeFunction(type) {
    this.clearWalls();
    const grid = generateSimpleMaze(this.state.nodesGrid, type);
    this.setState({ nodesGrid: grid });
  }
  generateRecurMaze() {
    this.clearWalls();
    const grid = recursiveMaze(this.state.nodesGrid, 2, 18, 2, 58, "horizontal", false);
    this.setState({ nodesGrid: grid });
  }
  vertical() {
    this.clearWalls();
    const grid = verticalMaze(this.state.nodesGrid, 2, 18, 2, 58, "vertical", false);
    this.setState({ nodesGrid: grid });
  }
  horizontal() {
    this.clearWalls();
    const grid = horizontalMaze(this.state.nodesGrid, 2, 18, 2, 58, "horizontal", false);
    this.setState({ nodesGrid: grid });
  }
 
  render() {
    const nodesGrid = this.state.nodesGrid;
   
    return (
      <React.Fragment>
        <NavBar 
          typeOfWall={(type) => this.setWall(type)}
          clearBoard={() => this.clearBoard()}
          clearWalls={() => this.clearWalls()}
          bfs={() => this.bfs()}
          dfs={() => this.dfs()}
          dijkstra={() => this.dijkstra()}
          astar = {() => this.aStar()}
          bidirectional={() => this.Bidirectional()}
          setSpeed = {(type) => this.Speed(type)}
          disableEverything={(n) => this.disableEverythin(n)}
          generateMaze={(type) => this.MazeFunction(type)}
          generateRecurMaze={() => this.generateRecurMaze()}
          verticalMaze={() => this.vertical()}
          horizontalMaze={() => this.horizontal()}
          astar2={() => this.aStar2()}
          bestFirst={() => this.greedy()}
          biDijkstra={() => this.dijkstra2()}
          swarm={() => this.swarm()} />

        <div className="grid">
          {nodesGrid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const { isStart, isFinish } = node;
                  return (
                    <Node
                      col={nodeId}
                      row={rowId}
                      key={nodeId}
                      newId={rowId * 61 + nodeId}
                      isStart={isStart}
                      isFinish={isFinish}
                      onMouseDown ={(e) => this.onMouseDown(e)}
                      onMouseEnter ={(e) => this.onMouseEnter(e)}
                      onMouseUp ={(e) => this.onMouseUp(e)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
export default PathFindingVisualizer;