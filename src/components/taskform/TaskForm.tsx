import { useState, useEffect } from "react";
import styled from "styled-components";
import { uid } from "uid";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import LevelSelector from "./LevelSelector";
import SubTaskSection from "./SubTaskSection";
import TagsSection from "./TagsSection";
import { useTasksContext } from "../../context/taskContext";
import { colorPicker } from "../../utils/colorPickers";

interface Props {
  edit?: boolean;
}

const TaskForm = ({ edit }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasksList, createTask, updatedTask } = useTasksContext();
  const [task, setTask] = useState("");
  const [complexity, setComplexity] = useState("0");
  const [priority, setPriority] = useState("0");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [subTasks, setSubTasks] = useState<
    { id: string; task: string; isCompleted: boolean }[]
  >([]);
  const [tagInput, setTagInput] = useState("");
  const [isCompleted, setisCompleted] = useState(false);

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
        if (editTask.tags) {
          setTagInput(editTask.tags.join(","));
        }
        setisCompleted(editTask.isCompleted);
      }
    }
  }, [edit, id, tasksList]);

  const setTagsArr = () => {
    if (tagInput) {
      const tagsArr = tagInput
        .trim()
        .replace(/,+$/g, "")
        .replace(/,+/g, ",")
        .split(",");
      const uniqueTags = new Set(tagsArr);
      return [...uniqueTags];
    }
    return [];
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      task,
      complexity,
      priority,
      dueBy: { dueDate, time },
      subTasks,
      tags: setTagsArr(),
      color: colorPicker(),
      isCompleted,
      id: id ? id : uid(),
    };
    if (edit) {
      updatedTask({ ...taskData });
    } else {
      createTask(taskData);
    }
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <header>
        <div
          className="back-button border"
          onClick={() => navigate("/")}
          title="Home"
        >
          <IoIosArrowRoundBack className="icon" />
        </div>
        <h3>{edit ? "Edit Task" : "Add New Task"}</h3>
      </header>
      <section>
        <div className="input-container">
          <h5>Task Name</h5>
          <input
            className="input-lg pill border"
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
        <LevelSelector
          type={"Priority"}
          selected={priority}
          setPriority={setPriority}
          setComplexity={setComplexity}
        />
        <LevelSelector
          type={"Complexity"}
          selected={complexity}
          setPriority={setPriority}
          setComplexity={setComplexity}
        />
        <div className="split-container">
          <div className="input-container">
            <h5>Select Due Date</h5>
            <input
              className="input-sm pill border"
              type="date"
              name="dueDate"
              id="dueDate"
              min={getDate()}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="input-container">
            <h5>Select Time</h5>
            <input
              className="input-sm pill border"
              type="time"
              name="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <SubTaskSection subTasks={subTasks} setSubTasks={setSubTasks} />
        <TagsSection tagInput={tagInput} setTagInput={setTagInput} />
        <button className="btn pill" type="submit">
          Save Task
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
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .back-button {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 44px;
      aspect-ratio: 1;
      border-radius: 50vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--background);
      cursor: pointer;
    }

    h3 {
      margin-inline: auto;
    }
  }

  input {
    font-size: var(--md);
  }

  section {
    height: calc(100% - 84px);
    overflow-y: scroll;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .input-container {
    h5 {
      margin-bottom: var(--padding);
    }
  }

  input {
    width: 100%;
    border: 1px solid #e2e2e2;
    background-color: var(--background);
  }

  .input-lg {
    padding: 20px 24px;
  }

  .input-sm {
    padding: 12px 24px;
  }

  .split-container {
    display: flex;
    gap: 30px;

    div {
      flex: 1 1 50%;
    }
  }

  button {
    margin-bottom: 1rem;
  }
`;
