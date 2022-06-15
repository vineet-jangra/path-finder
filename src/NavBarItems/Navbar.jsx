import React from "react";
import "./Navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithmSelectedToVisualize: undefined,
      shouldDisableEveryThing: false,
      wallType: 'Simple',
      speed: 'Fast',
      message: 'Pick an algorithm'
    };
  }
  async callSelectedAlgorithm() {
    if (this.state.algorithmSelectedToVisualize === undefined) return; 
    document.getElementsByClassName('visualize-main-button')[0].classList.add('disabled-button');
    document.getElementsByClassName('disabled-button')[0].classList.remove('visualize-main-button');
    this.props.disableEverything(1);
    this.setState({ shouldDisableEveryThing: true });
    if (this.state.algorithmSelectedToVisualize === "BFS") {
      await this.props.bfs();
    } else if (this.state.algorithmSelectedToVisualize === "DFS") {
      await this.props.dfs();
    } else if (this.state.algorithmSelectedToVisualize === "Dijkstra") {
      await this.props.dijkstra();
    } else if (this.state.algorithmSelectedToVisualize === "Astar") {
      await this.props.astar();
    } else if(this.state.algorithmSelectedToVisualize === 'Bi-BFS') {
      await this.props.bidirectional();
    } else if(this.state.algorithmSelectedToVisualize === 'Bi-astar') {
      await this.props.astar2();
    } else if(this.state.algorithmSelectedToVisualize === 'Greedy') {
      await this.props.bestFirst();
    } else if(this.state.algorithmSelectedToVisualize === 'Swarm') {
      await this.props.swarm();
    } else if(this.state.algorithmSelectedToVisualize === 'Bi-dijkstra') {
      await this.props.biDijkstra();
    }
    this.props.disableEverything(2);
    this.setState({ shouldDisableEveryThing: false });
    document.getElementsByClassName('disabled-button')[0].classList.add('visualize-main-button');
    document.getElementsByClassName('visualize-main-button')[0].classList.remove('disabled-button');
  }
  selectAlgorithm(algo, message) {
    this.setState({ algorithmSelectedToVisualize: algo, message: message });
  }
  Wall(type) {
    if(type) {
      this.props.typeOfWall(type);
      this.setState({ wallType: type });
    }
  }
  Speed(type) {
    if(type) {
      this.props.setSpeed(type);
      this.setState({ speed: type});
    }
  }
  reloadPage() {
    return window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <div id="navbarDiv">
        <nav className="navBar">
          <a href="#" className="name-reload-div" onClick={() => this.reloadPage()}> Path finder</a>
          <div className="dropdown dropdown-style">
            <button className="dropdown-toggle dropdown-toggler-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  Algorithms</button>
            <div className="dropdown-menu" id="style-for-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("BFS", "BFS is unweigted and always guarantees shortest path")} href="#"> Breadth First Search</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("DFS", "DFS is unweigted and does not guarantees shortest path")} href="#"> Depth First Search</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Dijkstra", "Dijkstra is weigted and always guarantees shortest path")} href="#"> DIJKSTRA</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Astar", "Astar is weigted and always guarantees shortest path")} href="#">A STAR </a>
              {/* <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Greedy", "Greedy is weigted and does not guarantees shortest path")} href="#"> Best First</a> */}
              {/* <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Swarm")} href="#"> Swarm </a> */}
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Bi-BFS", "Bidirectional-BFS is unweigted and always guarantees shortest path")} href="#"> Bidirectional BFS</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Bi-astar", "Bidirectional-Astar is weigted and does not guarantees shortest path")} href="#"> Bidirectional Astar</a>
              {/* <a className="dropdown-item options-for-algo" onClick={() => this.selectAlgorithm("Bi-dijkstra", "Bidirecitonal-Dijkstra is weigted and always guarantees shortest path")} href="#"> Bidirectional Dijkstra</a> */}
            </div>
          </div>
          <div className="dropdown dropdown-style">
            <button className="dropdown-toggle dropdown-toggler-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Mazes
            </button>
            <div className="dropdown-menu" id="style-for-menu2" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item options-for-algo" onClick={() => this.props.generateMaze('wall')}  href="#"> Simple Maze</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.props.generateMaze('weight')}  href="#"> weighted Maze</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.props.generateRecurMaze()} href="#"> Recursive Division </a>
              <a className="dropdown-item options-for-algo" onClick={() => this.props.horizontalMaze()} href="#"> Horizontally Skewed</a>
              <a className="dropdown-item options-for-algo" onClick={() => this.props.verticalMaze()} href="#"> Vertically Skewed </a>
            </div>
          </div>
          <button onClick={() => this.callSelectedAlgorithm()} disabled={this.state.shouldDisableEveryThing} className="visualize-main-button">
              {" "} Visualize {" "} {this.state.algorithmSelectedToVisualize ? this.state.algorithmSelectedToVisualize : " "}{" "} !
          </button>
          <button className="visualize-button" onClick={() => this.props.clearWalls()}>clearWalls</button>
          <button className="visualize-button"onClick={() => this.props.clearBoard()}>clearPath</button>
          <div className="dropdown dropdown-style">
            <button className="dropdown-toggle dropdown-toggler-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Wall Type : {this.state.wallType}
            </button>
            <div className="dropdown-menu" id="style-for-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item options-for-algo" href="#"onClick={() => this.Wall("simple")}> simple </a>
              <a className="dropdown-item options-for-algo" href="#"onClick={() => this.Wall("weight")}> weighted </a>
            </div>
          </div>

          <div className="dropdown dropdown-style">
            <button className="dropdown-toggle dropdown-toggler-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Speed : {this.state.speed}
            </button>
            <div className="dropdown-menu" id="style-for-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item options-for-algo" onClick={() =>this.Speed("Fast")} href="#"> Fast </a>
              <a className="dropdown-item options-for-algo" onClick={() =>this.Speed("Slow")} href="#"> Slow </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="outer-div">

      <div className="start-box"></div> 
        <div className="name-tag"> start node</div>
        <div className="end-box"></div> 
        <div className="name-tag"> target node</div>
        <div className="path-box"></div> 
        <div className="name-tag"> path node</div>
        <div className="visited-box"></div>
        <div className="name-tag"> visited node</div>
        <div className="direction-box"></div> 
        <div className="name-tag">direction node</div>
        <div className="wall-box"></div> 
        <div className="name-tag"> normal wall</div>
        <div className="weight-box"></div> 
        <div className="name-tag">weight wall</div>
        
      </div>
       <div className="message-div">{this.state.message ? this.state.message : "pick an algorithm"}</div>
       </React.Fragment>
    );
  }
}
export default NavBar;