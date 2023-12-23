import { Link } from "react-router-dom";
import styled from "styled-components";
import { uid } from "uid";
import TaskDetails from "./TaskDetails";
import CircleProgressBar from "./CircleProgressBar";
import { displayDueDate } from "../../functions/displayDueDate";
import { tagColor } from "../../functions/colorPickers";

const Task = ({
  id,
  task,
  complexity,
  priority,
  dueBy,
  isCompleted,
  subTasks,
  tags,
  color,
}) => {
  const [displayDate, displayTime, headsUp] =
    dueBy.dueDate && displayDueDate(dueBy);
  return (
    <ListItem
      style={
        isCompleted
          ? { backgroundColor: "var(--completed)" }
          : headsUp === "close"
          ? { backgroundColor: "#fce4d2" }
          : headsUp === "today"
          ? { backgroundColor: "var(--remove-red-opacity)" }
          : {}
      }
    >
      <TaskDetails
        id={id}
        task={task}
        complexity={complexity}
        priority={priority}
        dueBy={dueBy}
        displayDate={displayDate}
        displayTime={displayTime}
        color={color}
      />
      {subTasks.length > 0 && (
        <CircleProgressBar subTasks={subTasks} color={color} />
      )}
      <footer>
        {tags && (
          <ul className="tags-list">
            {tags.map((tag) => {
              return (
                <li
                  key={uid()}
                  style={{ backgroundColor: tagColor() }}
                  className="pill"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
        )}
        <div className="task-link">
          <Link to={`task/${id}`}>Task Details</Link>
        </div>
      </footer>
    </ListItem>
  );
};

export default Task;

const ListItem = styled.li`
  position: relative;
  padding: var(--padding);
  background-color: var(--background);
  border-radius: 20px;

  footer {
    display: flex;

    .tags-list {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      li {
        padding: 6px 8px;
        background-color: pink;
      }
    }

    .task-link {
      flex-grow: 1;
      min-width: fit-content;
      display: flex;
      align-items: flex-end;
      justify-content: end;
    }
  }
`;
