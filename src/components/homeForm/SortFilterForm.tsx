import { useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SortListItem from "./SortListItem";
import { useTasksContext } from "../../context/taskContext";

interface Props {
  setSearchInput: Function;
  sortBy: string;
  setSortBy: Function;
  filterTags: string[];
  setFilterTags: Function;
}

const SortFilterForm = ({
  setSearchInput,
  sortBy,
  setSortBy,
  filterTags,
  setFilterTags,
}: Props) => {
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowTags, setIsShowTags] = useState(false);
  const { tasksList } = useTasksContext();

  const findUniqueTags = (function () {
    const tagsArray = tasksList
      .flatMap((task) => task.tags)
      .filter((tag) => tag !== undefined);
    const uniqueTags = new Set(tagsArray);
    return [...uniqueTags];
  })();

  const handleClick = (e: any) => {
    if (filterTags.includes(e.target.value)) {
      const removedTagList = filterTags.filter((tag) => tag !== e.target.value);
      setFilterTags(removedTagList);
    } else {
      setFilterTags([...filterTags, e.target.value]);
    }
  };
  return (
    <Form>
      <div className="search-container border pill">
        <FaMagnifyingGlass className="search-icon" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="arrow-container border">
          <FaArrowRight className="search-icon" />
        </div>
      </div>
      <div className="dropdowns-container">
        <div className="dropdown border pill">
          <div className="wrapper" onClick={() => setIsShowSort(!isShowSort)}>
            <p>Sort</p>
            <FaChevronDown />
          </div>
          <ul
            className={`dropdown-list ${isShowSort ? "" : "hidden"}`}
            onClick={(e: any) => setSortBy(e.target.value)}
          >
            <SortListItem input={"Default"} sortBy={sortBy} />
            <SortListItem input={"Ascending Date"} sortBy={sortBy} />
            <SortListItem input={"Descending Date"} sortBy={sortBy} />
            <SortListItem input={"Ascending Complexity"} sortBy={sortBy} />
            <SortListItem input={"Descending Complexity"} sortBy={sortBy} />
            <SortListItem input={"Ascending Priority"} sortBy={sortBy} />
            <SortListItem input={"Descending Priority"} sortBy={sortBy} />
          </ul>
        </div>
        <div className="dropdown border pill">
          <div className="wrapper" onClick={() => setIsShowTags(!isShowTags)}>
            <p>Tags</p>
            <FaChevronDown />
          </div>
          <ul className={`dropdown-list ${isShowTags ? "" : "hidden"}`}>
            {findUniqueTags.length > 0 ? (
              findUniqueTags.map((tag) => {
                return (
                  <li key={tag} className="tagSelect-container">
                    <label
                      htmlFor="tag"
                      style={
                        filterTags.includes(tag)
                          ? { color: "var(--text-black)" }
                          : { color: "var(--text-gray)" }
                      }
                    >
                      {tag}
                    </label>
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
      cursor: pointer;
    }
  }

  .dropdowns-container {
    display: flex;
    gap: 30px;

    .dropdown {
      flex-grow: 1;
      position: relative;
      padding: var(--padding);
      background-color: var(--background);
      cursor: pointer;

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }

    .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: var(--padding-med);
      font-size: var(--sm);
      background-color: var(--background);
      border-radius: 14px;
      box-shadow: 0 1rem 45px #00000029;
      z-index: 100;

      li + li {
        border-top: 1px solid #d9d9d9;
      }
    }

    .tagSelect-container {
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
    }
  }
`;
