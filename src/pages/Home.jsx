import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";
import SortFilterForm from "../components/homeForm/SortFilterForm";
import TasksList from "../components/taskslist/TasksList";

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterTags, setFilterTags] = useState([]);
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
      <Button className="btn pill" onClick={() => navigate("/createTask")}>
        <IoIosAdd className="icon" />
        Add New Task
      </Button>
    </main>
  );
};

export default Home;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-inline: auto;
  padding: 18px;
  font-size: 18px;
`;
