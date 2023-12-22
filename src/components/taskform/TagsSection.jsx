import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";
import Tag from "./Tag";

const TagsFormSection = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDuplicate(false);
      setInput("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDuplicate]);

  const addToTagsList = () => {
    if (input) {
      const duplicate = tags.filter(
        (tag) => tag.toLowerCase() === input.toLowerCase()
      );
      if (duplicate.length === 0) {
        setTags([...tags, input]);
        setInput("");
      } else {
        setIsDuplicate(true);
      }
    }
  };

  const removeTag = (value) => {
    const updatedTags = tags.filter((tag) => tag !== value);
    setTags(updatedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addToTagsList();
    }
  };

  return (
    <div>
      <label htmlFor="tags">Add Tag</label>
      <Container className="bordered">
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="Add Tag..."
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          min={1}
          max={50}
        />
        <div onClick={addToTagsList}>
          <IoIosAdd />
        </div>
        {isDuplicate && <p>Tag Already Exists</p>}
      </Container>
      {tags.length > 0 && (
        <List>
          {tags.map((tag) => {
            return <Tag key={tag} tag={tag} removeTag={removeTag} />;
          })}
        </List>
      )}
    </div>
  );
};

export default TagsFormSection;

const Container = styled.div`
  position: relative;
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

  p {
    position: absolute;
    top: -50%;
    right: 0%;
    font-size: 0.75rem;
    color: red;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;
