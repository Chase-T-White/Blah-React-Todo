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
    <div>
      <label htmlFor="subTask">Add Subtask Checklist</label>
      {subTasks.length > 0 && (
        <ol>
          {subTasks.map((subTask) => {
            return (
              <SubTask
                key={subTask.id}
                id={subTask.id}
                task={subTask.task}
                removeSubTask={removeSubTask}
              />
            );
          })}
        </ol>
      )}
      <Container className="bordered">
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
        <div onClick={addToSubtasksList}>
          <IoIosAdd />
        </div>
      </Container>
    </div>
  );
};

export default SubTaskSection;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;

  input {
    background-color: transparent;
    border: none;
  }

  div {
    display: flex;
    align-content: center;
    background-color: var(--background-shade);
    border: 2px inset #88929f;

    &:hover {
      cursor: pointer;
      border-style: solid;
      border-color: var(--select-green);
      outline: 1px solid var(--select-green);
    }
  }
`;
