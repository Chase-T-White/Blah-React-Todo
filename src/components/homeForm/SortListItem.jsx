import styled from "styled-components";

const SortListItem = ({ input }) => {
  return (
    <ListItem>
      <label>{input}</label>
      <input type="radio" name="radio" id="radio" value={input} />
    </ListItem>
  );
};

export default SortListItem;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 8px;
  cursor: default;

  input {
    width: 14px;
    aspect-ratio: 1;
    cursor: pointer;
  }
`;
