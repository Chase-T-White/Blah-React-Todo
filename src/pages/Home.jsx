import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SortFilterForm from "../components/homeForm/SortFilterForm";
import { useTasksContext } from "../context/taskContext";

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
    </main>
  );
};

export default Home;
