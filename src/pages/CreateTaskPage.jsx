import TaskForm from "../components/taskform/TaskForm";

const CreateTaskPage = () => {
  return (
    <main>
      <TaskForm edit={false} />
    </main>
  );
};

export default CreateTaskPage;
