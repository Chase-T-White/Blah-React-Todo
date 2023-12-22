export function displayDueDate(dueBy) {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dueDateArr = dueBy.dueDate.split("-");
  const displayMonth = months[dueDateArr[1] - 1];
  const displayDate = `${displayMonth} ${dueDateArr[2]}, ${dueDateArr[0]}`;

  const dueTimeArr = dueBy.time.split(":");
  let displayTime;
  if (dueTimeArr[0] === "00") {
    displayTime = `12:${dueTimeArr[1]} AM`;
  } else if (Number(dueTimeArr[0]) === 12) {
    displayTime = `${dueTimeArr[0]}:${dueTimeArr[1]} PM`;
  } else if (Number(dueTimeArr[0]) > 12) {
    displayTime = `${Number(dueTimeArr[0]) - 12}:${dueTimeArr[1]} PM`;
  } else {
    displayTime = dueBy.time + " AM";
  }

  return [displayDate, displayTime];
}
