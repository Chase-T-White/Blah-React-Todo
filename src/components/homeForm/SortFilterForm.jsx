import { useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SortListItem from "./SortListItem";
import { useTasksContext } from "../../context/taskContext";

const SortFilterForm = ({
  setSearchInput,
  setSortBy,
  filterTags,
  setFilterTags,
}) => {
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowTags, setIsShowTags] = useState(false);
  const { tasksList } = useTasksContext();

  const findUniqueTags = function () {
    const tagsArray = tasksList.flatMap((task) => task.tags);
    const uniqueTags = new Set(tagsArray);
    return [...uniqueTags];
  };

  const handleClick = (e) => {
    if (filterTags.includes(e.target.value)) {
      const removedTagList = filterTags.filter((tag) => tag !== e.target.value);
      setFilterTags(removedTagList);
    } else {
      setFilterTags([...filterTags, e.target.value]);
    }
  };
  return (
    <Form>
      <div className="search-container pill">
        <FaMagnifyingGlass className="search-icon" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="arrow-container">
          <FaArrowRight className="search-icon" />
        </div>
      </div>
      <div className="dropdowns-container">
        <div
          className="dropdown pill"
          onClick={() => setIsShowSort(!isShowSort)}
        >
          <p>Sort</p>
          <FaChevronDown />
          <ul
            className={`dropdown-list ${isShowSort ? "" : "hidden"}`}
            onClick={(e) => setSortBy(e.target.value)}
          >
            <SortListItem input={"Default"} />
            <SortListItem input={"Ascending Date"} />
            <SortListItem input={"Descending Date"} />
            <SortListItem input={"Ascending Complexity"} />
            <SortListItem input={"Descending Complexity"} />
            <SortListItem input={"Ascending Priority"} />
            <SortListItem input={"Descending Priority"} />
          </ul>
        </div>
        <div
          className="dropdown pill"
          onClick={() => setIsShowTags(!isShowTags)}
        >
          <p>Tags</p>
          <FaChevronDown />
          <ul className={`dropdown-list ${isShowTags ? "" : "hidden"}`}>
            {findUniqueTags.length > 0 ? (
              findUniqueTags.map((tag) => {
                return (
                  <li key={tag} className="tagSelect-container">
                    <label htmlFor="tag">{tag}</label>
                    <input
                      type="checkbox"
                      name="tag"
                      id="tag"
                      value={tag}
                      onClick={handleClick}
                    />
                  </li>
                );
              })
            ) : (
              <li>No Tags Available</li>
            )}
          </ul>
        </div>
      </div>
    </Form>
  );
};

export default SortFilterForm;

const Form = styled.form`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .search-container {
    display: flex;
    align-items: center;
    padding: var(--padding);
    background-color: var(--background);
    border: solid 1px #e2e2e2;

    input {
      flex-grow: 1;
      margin-left: 8px;
      font-family: "Manrope", sans-serif;
      border: none;

      &:hover,
      &:focus-within {
        outline: none;
      }
    }

    .search-icon {
      font-size: 20px;
    }

    .arrow-container {
      width: 36px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50vw;
      background-color: var(--primary-opacity);
    }
  }

  .dropdowns-container {
    display: flex;
    gap: 30px;

    .dropdown {
      flex-grow: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: var(--padding);
      background-color: var(--background);
      cursor: pointer;
    }

    .dropdown-list {
      position: absolute;
      top: 100%;
      width: 100%;
      padding: var(--padding-med);
      font-size: var(--sm);
      background-color: var(--background);
      border-radius: 14px;

      li + li {
        border-top: 1px solid #d9d9d9;
      }
    }
  }
`;
