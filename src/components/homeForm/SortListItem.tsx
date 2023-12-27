import styled from "styled-components";

interface Props {
  input: string;
  sortBy: string;
}

const SortListItem = ({ input, sortBy }: Props) => {
  return (
    <ListItem>
      <label
        style={{
          color: `${
            sortBy === input ? "var(--text-black)" : "var(--text-gray)"
          }`,
        }}
      >
        {input}
      </label>
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

    &:checked {
      accent-color: var(--text-black);
    }
  }
`;
