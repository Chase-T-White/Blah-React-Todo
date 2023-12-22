import { CiEdit, CiCalendarDate } from "react-icons/ci";
import { IoMdCheckmark, IoIosArrowRoundUp } from "react-icons/io";
import { BsArrowsMove } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { uid } from "uid";
import CircleProgressBar from "./CircleProgressBar";
import { displayDueDate } from "../../functions/displayDueDate";
import { useTasksContext } from "../../context/taskContext";

const Task = ({
  id,
  task,
  complexity,
  priority,
  dueBy,
  createdAt,
  subTasks,
  tags,
}) => {
  const navigate = useNavigate();
  const { toggleCompleted } = useTasksContext();

  const [displayDate, displayTime] = dueBy && displayDueDate(dueBy);

  return (
    <ListItem>
      <div className="details-container">
        <div>
          <div className="colorCircle"></div>
          <h5>{task}</h5>
          <div>
            <div
              className="task-icon"
              title="Edit"
              onClick={() => navigate(`editTask/${id}`)}
            >
              <CiEdit />
            </div>
            <div
              className="task-icon"
              title="Mark Complete"
              onClick={() => toggleCompleted(id)}
            >
              <IoMdCheckmark />
            </div>
          </div>
        </div>
        {dueBy.dueDate && (
          <div className="container">
            <CiCalendarDate />
            <p>
              Due Date: <span>{`${displayDate}, ${displayTime}`}</span>
            </p>
          </div>
        )}
        {priority && (
          <div className="container">
            <IoIosArrowRoundUp />
            <p>
              Priority:{" "}
              <span>
                {Number(priority) < 4
                  ? "Low"
                  : Number(priority) < 7
                  ? "Medium"
                  : "High"}
                {` (${priority}/10)`}
              </span>
            </p>
          </div>
        )}
        {complexity && (
          <div className="container">
            <BsArrowsMove />
            <p>
              Complexity:{" "}
              <span>
                {Number(complexity) < 4
                  ? "Low"
                  : Number(complexity) < 7
                  ? "Medium"
                  : "High"}
                {` (${complexity}/10)`}
              </span>
            </p>
          </div>
        )}
      </div>
      {subTasks.length > 0 && <CircleProgressBar subTasks={subTasks} />}
      {tags.length > 0 && (
        <ul className="tags-list">
          {tags.map((tag) => {
            return <li key={uid()}>{tag}</li>;
          })}
        </ul>
      )}
      <Link to={`task/${id}`}>Task Details</Link>
    </ListItem>
  );
};

export default Task;

const ListItem = styled.li`
  padding: var(--padding);
`;
