import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { uid } from "uid";
import styled from "styled-components";
import SubTask from "./SubTask";

const SubTaskSection = ({ subTasks, setSubTasks }) => {
  const [input, setInput] = useState("");

  const addToSubtasksList = () => {
    if (input) {
      setSubTasks([
        ...subTasks,
        { id: uid(), task: input, isCompleted: false },
      ]);
      setInput("");
    }
  };

  const removeSubTask = (id) => {
    const updatedSubTasks = subTasks.filter((subTask) => subTask.id !== id);
    setSubTasks(updatedSubTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addToSubtasksList();
    }
  };

  return (
    <Container>
      <h5>Add Checklist for Subtasks</h5>
      {subTasks.length > 0 && (
        <ol>
          {subTasks.map((subTask, i) => {
            return (
              <SubTask
                key={subTask.id}
                index={i}
                id={subTask.id}
                task={subTask.task}
                removeSubTask={removeSubTask}
              />
            );
          })}
        </ol>
      )}
      <div className="input-container pill border">
        <input
          type="text"
          name="subTask"
          id="subTask"
          placeholder="Add Subtask..."
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          min={1}
          max={50}
        />
        <div className="icon-button" onClick={addToSubtasksList}>
          <IoIosAdd className="icon" />
        </div>
      </div>
    </Container>
  );
};

export default SubTaskSection;

const Container = styled.div`
  h5 {
    margin-bottom: 7px;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 18px;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 8px 8px 24px;
    background-color: var(--background);
    border: 1px solid #e2e2e2;

    input {
      width: auto;
      border: none;
    }
  }

  .icon-button {
      width: 44px;
      aspect-ratio: 1;
      border-radius: 50vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-opacity);
      border: 1px solid transparent;
      cursor: pointer;

      &:hover {
        border-color: var(--primary);
      }
`;
