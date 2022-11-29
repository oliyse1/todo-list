import "./App.css";
import TaskList from "./components/TaskList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <TaskList />
      </div>
    </DndProvider>
  );
}

export default App;
