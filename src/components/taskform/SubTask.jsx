import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const SubTask = ({ task, id, removeSubTask, index }) => {
  return (
    <Item className="pill">
      <p>{`${index + 1}. ${task}`}</p>
      <div className="icon-button remove" onClick={() => removeSubTask(id)}>
        <IoMdClose className="close-icon" />
      </div>
    </Item>
  );
};

export default SubTask;

const Item = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 8px 8px 24px;
  background-color: var(--background);

  p {
    flex-grow: 1;
  }

  .close-icon {
    font-size: 22px;
  }
`;
