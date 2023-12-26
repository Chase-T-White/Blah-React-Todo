export function checkStorage(setTasksList) {
  const localStorageTasks = window.localStorage.getItem("tasks");

  if (localStorageTasks === null) return;

  return setTasksList(JSON.parse(localStorageTasks));
}

export function updateStorage(updatedTasks) {
  return window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
