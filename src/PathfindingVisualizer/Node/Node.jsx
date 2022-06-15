import { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    const { isFinish, isStart } = this.props;
    const nodeClasses = isFinish ? "node-finish" : isStart ? "node-start" : "node-normal";
    
    return (
      <div
        id={this.props.newId}
        className={`node ${nodeClasses}`}
        onMouseDown={(e) => {e.preventDefault(); this.props.onMouseDown(this.props.newId)}}
        onMouseEnter={(e) => {e.preventDefault(); this.props.onMouseEnter(this.props.newId)}}
        onMouseUp={(e) => {e.preventDefault(); this.props.onMouseUp(this.props.newId)}}
      ></div>
    );
  }
}
export default Node;
