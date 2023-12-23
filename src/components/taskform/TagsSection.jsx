import styled from "styled-components";

const TagsFormSection = ({ tagInput, setTagInput }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Container>
      <h5>Add Tag</h5>
      <div className="input-lg pill border">
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="School, Career, Routine"
          onKeyDown={handleKeyDown}
          onChange={(e) => setTagInput(e.target.value)}
          value={tagInput}
          min={1}
          max={100}
        />
      </div>
    </Container>
  );
};

export default TagsFormSection;

const Container = styled.div`
  h5 {
    margin-bottom: 7px;
  }

  div {
    border: 1px solid #e2e2e2;
    background-color: var(--background);
  }

  input {
    border: none !important;
  }
`;
