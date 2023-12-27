import React, { useState, useEffect, useContext } from "react";
import { checkStorage, updateStorage } from "../utils/storageFunctions";
import { TaskTypes } from "../types/TaskTypes";

interface SubTaskTypes {
  id: string;
  task: string;
  isCompleted: boolean;
}

interface TasksContextProps {
  tasksList: TaskTypes[];
  createTask: (newTaskData: TaskTypes) => void;
  updatedTask: (editTask: TaskTypes) => void;
  toggleCompleted: (id: string, subtTaskToEdit?: SubTaskTypes | null) => void;
  deleteSingleTask: (id: string) => void;
}

const TasksContext = React.createContext<TasksContextProps>({
  tasksList: [],
  createTask: () => {},
  updatedTask: () => {},
  toggleCompleted: () => {},
  deleteSingleTask: () => {},
});

const TasksProvider = ({ children }: any) => {
  const [tasksList, setTasksList] = useState<TaskTypes[]>([]);
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

  const createTask = (newTaskData: TaskTypes) => {
    setTasksList([...tasksList, newTaskData]);
  };

  const updatedTask = (editedTask: TaskTypes) => {
    const updatedTaskList = tasksList.map((task) =>
      task.id === editedTask.id
        ? { ...editedTask, isCompleted: task.isCompleted }
        : task
    );
    setTasksList(updatedTaskList);
  };

  // Update the completed status of a task or a subtask within a task
  const toggleCompleted = (
    id: string,
    subTaskToEdit: SubTaskTypes | null = null
  ) => {
    const updatedTasksList = tasksList.map((task) => {
      if (task.id === id) {
        // check if subTask is selected to toggle completed
        if (subTaskToEdit) {
          const updatedSubTasks = (task.subTasks || []).map((subTask) => {
            if (subTask.id === subTaskToEdit.id) {
              return { ...subTask, isCompleted: !subTask.isCompleted };
            }
            return subTask;
          });
          return { ...task, subTasks: updatedSubTasks };
        } else {
          // toggle task completed if subTask is not provided
          return { ...task, isCompleted: !task.isCompleted };
        }
      }
      return task;
    });

    setTasksList(updatedTasksList);
  };

  const deleteSingleTask = (id: string) => {
    const newTaskList = tasksList.filter((task) => task.id !== id);
    setTasksList(newTaskList);
  };

  return (
    <TasksContext.Provider
      value={{
        tasksList,
        createTask,
        updatedTask,
        toggleCompleted,
        deleteSingleTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = (): TasksContextProps => {
  return useContext(TasksContext);
};

export { TasksContext, TasksProvider };
