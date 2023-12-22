import React from "react";
import styled from "styled-components";

const LevelSelector = ({ type }) => {
  const createLevel = () => {
    let levelArr = [];
    for (let i = 0; i < 11; i++) {
      levelArr.push(i);
    }
    return levelArr;
  };

  return (
    <div>
      <h5>{`Select ${type} level`}</h5>
      <List>
        {createLevel().map((item) => {
          return <div value={item}>{item}</div>;
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
`;
