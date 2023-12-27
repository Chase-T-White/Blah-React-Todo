import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoMdCheckmark } from "react-icons/io";
import styled from "styled-components";
import TaskDetails from "../components/taskslist/TaskDetails";
import { useTasksContext } from "../context/taskContext";
import { displayDueDate } from "../utils/displayDueDate";

const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasksList, deleteSingleTask, toggleCompleted } = useTasksContext();

  const [selectedTask] = tasksList.filter((tasks) => tasks.id === id);
  const { task, complexity, priority, dueBy, color, subTasks } = selectedTask;

  const [displayDate, displayTime] = dueBy.dueDate && displayDueDate(dueBy);

  const subTasksCompleted = Math.floor(
    (subTasks.filter((subTask) => subTask.isCompleted).length /
      subTasks.length) *
      100
  );

  if (!id) {
    return navigate("/");
  }

  return (
    <Wrapper>
      <header className="page-header">
        <div
          className="back-button border"
          onClick={() => navigate("/")}
          title="Home"
        >
          <IoIosArrowRoundBack className="icon" />
        </div>
        <h3>Task Details</h3>
      </header>
      <div className="task-card">
        <TaskDetails
          id={id}
          task={task}
          complexity={complexity}
          priority={priority}
          dueBy={dueBy}
          displayDate={displayDate}
          displayTime={displayTime}
          color={color}
          page={"details"}
        />
        {subTasks.length > 0 && (
          <div className="completed-container">
            <div className="completed">
              <h4>Task Completed</h4>
              <h4 className="percentage">{subTasksCompleted}%</h4>
            </div>
            <div
              style={{
                backgroundImage: `linear-gradient(to right, var(--primary) 0 ${subTasksCompleted}%, #f5f5f5 ${subTasksCompleted}% 100%)`,
              }}
              className="completed-meter pill"
            ></div>
          </div>
        )}
      </div>
      {subTasks.length > 0 && (
        <div>
          <h4>Checklist for Subtasks</h4>
          <ol>
            {subTasks.map((subTask, i) => {
              return (
                <li key={subTask.id} className="pill">
                  <p>{`${i + 1}. ${subTask.task}`}</p>
                  <div className="subTask-complete-container">
                    <div
                      style={
                        subTask.isCompleted
                          ? { backgroundColor: "var(--primary)" }
                          : {}
                      }
                      className="check-btn"
                      onClick={() => toggleCompleted(id, subTask)}
                    >
                      <IoMdCheckmark
                        style={
                          subTask.isCompleted
                            ? { color: "var(--text-white)" }
                            : {}
                        }
                        className="sub-icon"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="button-container">
        <button
          className="btn-details btn-edit pill"
          onClick={() => navigate(`/editTask/${id}`)}
          title="Edit Task"
        >
          Edit Task
        </button>
        <button
          className="btn-details btn-delete pill"
          onClick={() => {
            navigate("/");
            deleteSingleTask(id);
          }}
          title="Delete Task"
        >
          Delete Task
        </button>
      </div>
    </Wrapper>
  );
};

export default TaskPage;

const Wrapper = styled.div`
  max-width: 500px;
  height: 100%;
  margin-inline: auto;

  .page-header {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .back-button {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 44px;
      aspect-ratio: 1;
      border-radius: 50vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--background);
      cursor: pointer;
    }

    h3 {
      margin-inline: auto;
    }
  }

  .task-card {
    margin-bottom: 1.5rem;
    padding: 24px;
    background-color: var(--background);
    border-radius: 24px;

    .completed-container {
      margin-top: 30px;

      .completed {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
      }

      .percentage {
        color: var(--primary);
      }

      .completed-meter {
        width: 100%;
        height: 1rem;
      }
    }
  }

  h4 {
    margin-bottom: 0.75rem;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 24px;
    background-color: var(--background);

    p {
      flex-grow: 1;
      font-size: var(--md);
    }

    .subTask-complete-container {
      display: flex;
      gap: 0.25rem;
    }

    .check-btn {
      width: 44px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-opacity);
      border-radius: 50vw;
      cursor: pointer;

      &:hover {
        background-color: var(--primary);
      }

      .sub-icon {
        font-size: 24px;
      }

      &:hover > .sub-icon {
        color: var(--text-white);
      }
    }
  }

  .button-container {
    margin-top: 1rem;
    display: flex;
    gap: 30px;
  }

  .btn-details {
    flex-basis: 50%;
    padding-block: 18px;
    font-size: var(--lg);
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  .btn-edit {
    background-color: var(--primary-opacity);

    &:hover {
      background-color: var(--primary);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 15px;
      transform: translateY(-3px);
    }
  }

  .btn-delete {
    background-color: var(--remove-red-opacity);

    &:hover {
      background-color: var(--remove-red);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 15px;
      transform: translateY(-3px);
    }
  }
`;
