import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoMdCheckmark } from "react-icons/io";
import styled from "styled-components";
import { useTasksContext } from "../context/taskContext";

const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasksList, deleteSingleTask, toggleCompleted } = useTasksContext();

  const [selectedTask] = tasksList.filter((tasks) => tasks.id === id);
  const { task, complexity, priority, dueBy, createdAt, subTasks } =
    selectedTask;

  const subTasksCompleted = Math.floor(
    (subTasks.filter((subTask) => subTask.isCompleted).length /
      subTasks.length) *
      100
  );

  return (
    <article>
      <Wrapper>
        <header>
          <div
            className="back-button bordered"
            onClick={() => navigate("/")}
            title="Home"
          >
            <IoIosArrowRoundBack className="icon-large" />
          </div>
          <h3>Task Details</h3>
        </header>
        <div className="task-container">
          <div className="task-card">
            {subTasks.length > 0 && (
              <div className="completed-container">
                <div className="completed">
                  <p>Task Completed</p>
                  <p>{subTasksCompleted}%</p>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--text-yellow) 0 ${subTasksCompleted}%, var(--background-tint) ${subTasksCompleted}% 100%)`,
                  }}
                  className="completed-meter"
                ></div>
              </div>
            )}
          </div>
          {subTasks.length > 0 && (
            <div>
              <h4>Subtasks</h4>
              <ol>
                {subTasks.map((subTask, i) => {
                  return (
                    <li key={subTask.id}>
                      <p>{`${i + 1}. ${subTask.task}`}</p>
                      <div className="subTask-complete-container">
                        {subTask.isCompleted && <p>Completed</p>}
                        <div
                          className="check-btn"
                          onClick={() => toggleCompleted(id, subTask)}
                        >
                          <IoMdCheckmark />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
        <div className="button-container">
          <button
            className="bordered edit"
            onClick={() => navigate(`/editTask/${id}`)}
            title="Edit Task"
          >
            Edit Task
          </button>
          <button
            className="bordered delete"
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
    </article>
  );
};

export default TaskPage;

const Wrapper = styled.div`
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-inline: auto;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    .back-button {
      border-radius: 50vw;
      display: flex;
      align-items: center;
    }

    h3 {
      margin-inline: auto;
    }
  }

  .task-card {
    margin-bottom: 1.5rem;
    padding: 0.25rem;
    background-color: var(--background-shade);
    border: 4px inset #88929f;
    
    .completed {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
    }

    .completed-meter {
      width: 100%;
      height: 1rem;
      border: 2px inset #88929f;
    }
  }

  h4 {
    margin-bottom: 0.75rem;
  }

  ol {
    max-height: 340px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  li {
    display: flex;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
    font-size: 1.25rem;
    background-color: var(--background-tint);

    p {
      flex-grow: 1;
    }

    .subTask-complete-container {
      display: flex;
      gap: 0.25rem;
    }

    .check-btn {
      display: flex;
      align-items: center;
      background-color: var(--background-shade);
      border: 2px inset #88929f;

      &:hover {
        cursor: pointer;
        border-style: solid;
        border-color: var(--select-green);
        outline: 1px solid var(--select-green);
      }
    }
  }

  .button-container {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }

  button {
    flex-basis: 50%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  .edit {
    background-color: #0a460c;
  }
  .delete {
    background-color: #c07066;

    &:hover {
      border: solid 2px #891000;
      outline: solid 2px #891000;
  }
`;
