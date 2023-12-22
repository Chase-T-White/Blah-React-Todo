import styled from "styled-components";
import Task from "./Task";
import { useTasksContext } from "../../context/taskContext";

const TasksList = ({ searchInput, sortBy, filterTags }) => {
  const { tasksList } = useTasksContext();

  const filteredSortedList = tasksList
    .filter((item) => {
      if (searchInput) {
        return item.task.toLowerCase().startsWith(searchInput.toLowerCase());
      }
      return item;
    })
    .filter((item) => {
      if (filterTags.length > 0) {
        let hasTag = false;
        for (const tag of filterTags) {
          if (item.tags.includes(tag)) {
            hasTag = true;
            break;
          }
        }
        return hasTag ? item : null;
      }
      return item;
    })
    .sort((a, b) => {
      if (sortBy === "Ascending Date") {
        return (
          Date.parse(a.dueBy.dueDate + " " + a.dueBy.time) -
          Date.parse(b.dueBy.dueDate + " " + b.dueBy.time)
        );
      } else if (sortBy === "Descending Date") {
        return (
          Date.parse(b.dueBy.dueDate + " " + b.dueBy.time) -
          Date.parse(a.dueBy.dueDate + " " + a.dueBy.time)
        );
      } else if (sortBy === "Ascending Priority") {
        return Number(b.priority) - Number(a.priority);
      } else if (sortBy === "Descending Priority") {
        return Number(a.priority) - Number(b.priority);
      } else if (sortBy === "Ascending Complexity") {
        return Number(b.complexity) - Number(a.complexity);
      } else if (sortBy === "Descending Complexity") {
        return Number(a.complexity) - Number(b.complexity);
      }
      return a - b;
    });

  return (
    <Wrapper>
      <ul>
        {filteredSortedList.map((item) => {
          return <Task key={item.id} {...item} />;
        })}
      </ul>
    </Wrapper>
  );
};

export default TasksList;

const Wrapper = styled.div`
  ul {
    display: flex;
    flex-direction: column;
  }
`;
