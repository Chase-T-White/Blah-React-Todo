export type TaskTypes = {
  id: string;
  task: string;
  complexity: string;
  priority: string;
  dueBy: {
    dueDate: string;
    time: string;
  };
  isCompleted: boolean;
  subTasks: {
    id: string;
    task: string;
    isCompleted: boolean;
  }[];
  tags: string[];
  color: string;
};
