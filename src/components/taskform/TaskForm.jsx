import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import LevelSelector from "./LevelSelector";
import SubTaskSection from "./SubTaskSection";
import TagsSection from "./TagsSection";
import { useTasksContext } from "../../context/taskContext";

const TaskForm = ({ edit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasksList, createTask, updatedTask } = useTasksContext();
  const [task, setTask] = useState("");
  const [complexity, setComplexity] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (edit) {
      const editTask = tasksList.find((task) => task.id === id);
      if (editTask) {
        setTask(editTask.task);
        setComplexity(editTask.complexity);
        setPriority(editTask.priority);
        setDueDate(editTask.dueBy.dueDate);
        setTime(editTask.dueBy.time);
        setSubTasks(editTask.subTasks);
        setTags(editTask.tags);
      }
    }
  }, [edit, id, tasksList]);

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      task,
      complexity,
      priority,
      dueBy: { dueDate, time },
      createdAt: getDate(),
      subTasks,
      tags,
    };
    if (edit) {
      updatedTask({ ...taskData, id });
    } else {
      createTask(taskData);
    }
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <header>
        <div className="back-button" onClick={() => navigate("/")} title="Home">
          <IoIosArrowRoundBack className="icon-large" />
        </div>
        <h3>{edit ? "Edit Task" : "Add New Task"}</h3>
      </header>
      <section>
        <div className="taskName">
          <label htmlFor="name">Task Name</label>
          <input
            className="bordered"
            type="text"
            name="name"
            id="name"
            placeholder="Task..."
            minLength={3}
            maxLength={50}
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <LevelSelector type={"Priority"} />
        <LevelSelector type={"Complexity"} />
        <div className="split-container">
          <div className="wrapper">
            <label htmlFor="dueDate">Due Date</label>
            <input
              className="bordered"
              type="date"
              name="dueDate"
              id="dueDate"
              min={getDate()}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label htmlFor="time">Select Time</label>
            <input
              className="bordered"
              type="time"
              name="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <SubTaskSection subTasks={subTasks} setSubTasks={setSubTasks} />
        <TagsSection tags={tags} setTags={setTags} />
        <button className="btn" type="submit">
          {edit ? "Update Task" : "Add Task"}
        </button>
      </section>
    </Form>
  );
};

export default TaskForm;

const Form = styled.form`
  max-width: 500px;
  height: 100%;
  margin-inline: auto;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    .back-button {
      border-radius: 50vw;
      display: flex;
      align-items: center;
    }

    h3 {
      margin-inline: auto;
    }
  }

  section {
    height: calc(100% - 84px);
    overflow-y: scroll;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    max-width: 275px;
    font-size: 1.25rem;
  }

  .taskName {
    display: flex;
    flex-direction: column;
  }

  .split-container {
    display: flex;
    gap: 1.5rem;

    .wrapper {
      flex: 1 1 50%;
    }

    .input-numbers {
      width: 4em;
    }
  }
`;
