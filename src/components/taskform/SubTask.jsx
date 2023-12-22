import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const SubTask = ({ task, id, removeSubTask }) => {
  return (
    <Item>
      <p>{task}</p>
      <div onClick={() => removeSubTask(id)}>
        <IoMdClose />
      </div>
    </Item>
  );
};

export default SubTask;

const Item = styled.li`
  display: flex;
  max-width: 300px;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  background-color: var(--background-tint);

  p {
    flex-grow: 1;
  }

  div {
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
`;
