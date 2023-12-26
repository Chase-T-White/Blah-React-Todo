import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import { checkStorage, updateStorage } from "../utils/storageFunctions";

const TasksContext = React.createContext();

const TasksProvider = ({ children }) => {
  const [tasksList, setTasksList] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // updateStorage([]);
    checkStorage(setTasksList);
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    updateStorage(tasksList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList]);

  const createTask = (newTaskData) => {
    const newTask = { ...newTaskData, id: uid(), isCompleted: false };
    setTasksList([...tasksList, newTask]);
  };

  const updatedTask = (editedTask) => {
    const updatedTaskList = tasksList.map((task) =>
      task.id === editedTask.id
        ? { ...editedTask, isCompleted: task.isCompleted }
        : task
    );
    setTasksList(updatedTaskList);
  };

  // Update the completed status of a task or a subtask within a task
  const toggleCompleted = (id, subTaskToEdit = null) => {
    let updatedTasksList;

    // toggle the completed status of a subtask within a task object.
    if (subTaskToEdit) {
      let taskToEdit = tasksList.find((task) => task.id === id);
      const updateSubTasks = taskToEdit.subTasks.map((subTask) => {
        if (subTask.id === subTaskToEdit.id) {
          return { ...subTask, isCompleted: !subTask.isCompleted };
        }
        return subTask;
      });
      taskToEdit = { ...taskToEdit, subTasks: updateSubTasks };
      updatedTasksList = tasksList.map((task) =>
        task.id === id ? { ...taskToEdit } : task
      );
    } else {
      // toggle the completed status of a task
      updatedTasksList = tasksList.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
    }

    setTasksList(updatedTasksList);
  };

  const deleteSingleTask = (id) => {
    const newTaskList = tasksList.filter((task) => task.id !== id);
    setTasksList(newTaskList);
  };

  const deleteTasks = () => {
    setTasksList([]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasksList,
        createTask,
        updatedTask,
        toggleCompleted,
        deleteSingleTask,
        deleteTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};

export { TasksContext, TasksProvider };
