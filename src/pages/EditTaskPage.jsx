import TaskForm from "../components/taskform/TaskForm";

const EditTaskPage = () => {
  return (
    <main>
      <TaskForm edit={true} />
    </main>
  );
};

export default EditTaskPage;
