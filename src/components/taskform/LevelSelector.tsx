import React from "react";
import styled from "styled-components";
import { uid } from "uid";

interface Props {
  type: string;
  selected: string;
  setPriority: Function;
  setComplexity: Function;
}

const LevelSelector = ({
  type,
  selected,
  setPriority,
  setComplexity,
}: Props) => {
  const createLevel = () => {
    let levelArr = [];
    for (let i = 0; i < 11; i++) {
      levelArr.push(i);
    }
    return levelArr;
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (type === "Priority") {
      setPriority(e.target.textContent);
    } else {
      setComplexity(e.target.textContent);
    }
  };

  return (
    <div className="input-container">
      <h5>{`Select ${type} level`}</h5>
      <List onClick={handleClick}>
        {createLevel().map((item) => {
          return (
            <div
              key={uid()}
              style={
                item === Number(selected)
                  ? {
                      backgroundColor: "var(--primary)",
                      color: "var(--text-white)",
                    }
                  : {}
              }
            >
              {item}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default LevelSelector;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    width: 30px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-opacity);
    border-radius: 50vw;
    cursor: pointer;

    &:hover {
      color: var(--text-white);
      background-color: var(--primary);
    }
  }
`;
