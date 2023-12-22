import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const Tag = ({ tag, removeTag }) => {
  return (
    <ListItem className="bordered bordered__noPoint">
      <h6>{tag}</h6>
      <div onClick={() => removeTag(tag)} title="Remove">
        <IoMdClose />
      </div>
    </ListItem>
  );
};

export default Tag;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--background-shade);

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
