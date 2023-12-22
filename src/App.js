import { Routes, Route } from "react-router-dom";
import { Home, TaskPage, EditTaskPage, CreateTaskPage, Error } from "./pages";
import "./index.css";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="createTask" element={<CreateTaskPage />} />
          <Route path="editTask/:id" element={<EditTaskPage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
