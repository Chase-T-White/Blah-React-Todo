import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasksContext } from "../context/taskContext";
import SortFilterForm from "../components/homeForm/SortFilterForm";
import TasksList from "../components/taskslist/TasksList";

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const { tasksList, deleteTasks } = useTasksContext();
  return (
    <main>
      <SortFilterForm
        setSearchInput={setSearchInput}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterTags={filterTags}
        setFilterTags={setFilterTags}
      />
      <TasksList
        searchInput={searchInput}
        sortBy={sortBy}
        filterTags={filterTags}
      />
    </main>
  );
};

export default Home;
