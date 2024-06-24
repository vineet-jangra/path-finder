import './App.css';
import Introduction from './Introduction/Introduction';
import PathFindingVisualizer from './PathfindingVisualizer/PathFindingVisualizer';
function App() {
  document.body.style.zoom = "67%";
  return (
    <div className="App">
        <Introduction />
        <PathFindingVisualizer />
    </div>
  );
}

export default App;
