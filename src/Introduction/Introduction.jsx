import React from 'react';
import "./Introduction.css";
import algo from "../images/algorithms.png";
import drag from "../images/dragging.gif";
import wall from "../images/walls.gif";
import icon from "../images/icons.jpg";

class Introduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        }
    }
    skipTutorial() {
        document.getElementsByClassName('background-div')[0].style.display = "none";
    }
    nextTutorial() {
        this.setState({ counter: this.state.counter + 1 });
    }
    prevTutorial() {
        this.setState({ counter: this.state.counter - 1 });
    }
    getScreen() {
        const c = this.state.counter;
        if(c === 0) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <img src={icon} alt="icon-for-app" className="main-icon"/>
                    <div className="intro-main-text">This tutorial will walk you through this app and help you know more about it.</div>
                    <button className="intro-skip-btn" onClick={() => this.skipTutorial()} >skip tutorial</button>
                    <button className="intro-next-btn" onClick={() => this.nextTutorial()}>Next</button>
                </div>
            );
        } else if(c === 1) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <img style={{marginBottom: '50px'}} src={algo} alt="algorithms" />
                    <div className="info-about-algo" >Select any algorithm from given list, can create a maze as well and then visualize it !</div>
                    <div className="btn-contain">
                        <button className="intro-skip-btn" onClick={() => this.skipTutorial()} >skip tutorial</button>
                        <button className="intro-prev-btn" onClick={() => this.prevTutorial()}>Prev</button>
                        <button className="intro-next-btn" onClick={() => this.nextTutorial()}>Next</button>
                    </div>
                </div>
            )
        } else if(c === 2) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <div className="info-about-algo">you can move either start point or target point to get  shortest path in real time </div>
                    <img src={drag} alt="drag" className="drag-around" />
                    <button className="intro-skip-btn" onClick={() => this.skipTutorial()} >skip tutorial</button>
                    <button className="intro-prev-btn" onClick={() => this.prevTutorial()}>Prev</button>
                    <button className="intro-next-btn" onClick={() => this.nextTutorial()}>Next</button>
                </div>
            )
        } else if(c === 3) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <div className="info-about-algo">you can click to generate walls and also change the type of wall </div>
                    <img src={wall} alt="wall" className="drag-around" />
                    <button className="intro-skip-btn" onClick={() => this.skipTutorial()} >skip tutorial</button>
                    <button className="intro-prev-btn" onClick={() => this.prevTutorial()}>Prev</button>
                    <button className="intro-next-btn" onClick={() => this.nextTutorial()}>Next</button>
                </div>
            )
        } else if(c === 4) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <div className="algo-tag-name"> know more about algorithms</div>
                    <div className="algo-tag-name">Breadth First Search : It is the simplest traversal technique to traverse a tree or graph <a target="_blank" href="https://en.wikipedia.org/wiki/Breadth-first_search">learn more</a></div>
                    <div className="algo-tag-name">Depth First Search : Another fundamental technique to traverse graphs. <a target="_blank" href="https://en.wikipedia.org/wiki/Depth-first_search">learn more</a></div>
                    <div className="algo-tag-name">Dijkstra : A weighted greedy algorithm to find the shortest path between single source to all other nodes. <a target="_blank" href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">learn more</a></div>
                    <div className="algo-tag-name">Astar : Similar to dijkstra but it also takes heuristics in considertion is widely considered to be best in path finding <a target="_blank" href="https://en.wikipedia.org/wiki/A*_search_algorithm">learn more</a></div>
                    <div className="algo-tag-name">Best First Search : a greedy technique to choose the node with shortest distance <a target="_blank" href="https://en.wikipedia.org/wiki/Best-first_search"> learn more</a></div>
                    <div className="algo-tag-name">Bidirectional BFS : It starts both from start and end points and both find each other <a target="_blank" href="https://www.geeksforgeeks.org/bidirectional-search">learn more</a></div>
                    <div className="algo-tag-name">Bidirectional Astar : It starts both from start and end points and both find each other <a target="_blank" href="https://en.wikipedia.org/wiki/Bidirectional_search">learn more</a></div>
                    <div className="help-for-algo"> 
                    <div className="algo-tag-name">Bidirectional Dijkstra : It starts both from start and end points and both find each other <a target="_blank" href="https://en.wikipedia.org/wiki/Bidirectional_search">learn more</a></div>

                    </div>

                    <button className="intro-skip-btn" onClick={() => this.skipTutorial()} >skip tutorial</button>
                    <button className="intro-prev-btn" onClick={() => this.prevTutorial()}>Prev</button>
                    <button className="intro-next-btn" onClick={() => this.nextTutorial()}>Next</button>
                </div>
            )
            
        } else if(c === 5) {
            return (
                <div>
                    <div className="intro-title">Path finding Visualizer</div>
                    <div className="last-detail">enjoy your stay</div>
                    <button className="intro-end-btn" onClick={() => this.skipTutorial()}>end tutorial</button>
                </div>
            )
        }

    }
    render() {
        const Item = this.getScreen();
        return (
            <div className="background-div">
                <div className="intro-div">
                    {Item}
                </div>
            </div>
        );
    }
}

export default Introduction;