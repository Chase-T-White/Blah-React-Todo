import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiEdit, CiCalendarDate } from "react-icons/ci";
import { IoMdCheckmark, IoIosArrowRoundUp } from "react-icons/io";
import { BsArrowsMove } from "react-icons/bs";
import { useTasksContext } from "../../context/taskContext";

const TaskDetails = ({
  dueBy,
  displayDate,
  displayTime,
  task,
  id,
  priority,
  complexity,
  color,
}) => {
  const navigate = useNavigate();
  const { toggleCompleted } = useTasksContext();

  return (
    <Details>
      <header className="card-header">
        <div style={{ backgroundColor: color }} className="colorCircle"></div>
        <h6>{task}</h6>
        <div className="task-icon-container">
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
      </header>
      <div className="container">
        <CiCalendarDate className="details-icon" />
        <p>
          Due Date:{" "}
          <span style={{ color: color }}>{`${
            dueBy.dueDate ? displayDate + "," : "No Due Date"
          } ${dueBy.time ? displayTime : ""}`}</span>
        </p>
      </div>
      <div className="container">
        <IoIosArrowRoundUp className="details-icon" />
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
      <div className="container">
        <BsArrowsMove className="details-icon" />
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
    </Details>
  );
};

export default TaskDetails;

const Details = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .card-header {
    display: flex;
    align-items: center;

    .colorCircle {
      width: 18px;
      aspect-ratio: 1;
      margin-right: var(--padding);
      border-radius: 50vw;
    }

    h6 {
      flex-grow: 1;
    }

    .task-icon-container {
      display: flex;
      gap: 14px;

      .task-icon {
        width: 32px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--primary-opacity);
        border: 1px solid transparent;
        border-radius: 50vw;
        cursor: pointer;

        &:hover {
          border-color: var(--primary);
        }
      }
    }
  }

  .container {
    display: flex;
    align-items: center;

    .details-icon {
      margin-right: 6px;
      font-size: 18px;
    }

    p {
      color: var(--text-gray);

      span {
        color: var(--text-black);
      }
    }
  }
`;
