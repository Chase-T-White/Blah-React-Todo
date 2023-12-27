interface DueBy {
  dueDate: string;
  time: string;
}

export function displayDueDate(dueBy: DueBy) {
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

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dueDateArr = dueBy.dueDate.split("-");
  const displayMonth = months[Number(dueDateArr[1]) - 1];
  let displayDate = `${displayMonth} ${dueDateArr[2]}, ${dueDateArr[0]}`;

  let headsUp = null;
  const millisecondsInDay = 86400000;
  const millisecondsInWeek = millisecondsInDay * 7;

  const currentDateTime = new Date().getTime();
  const dueByTime = new Date(displayDate).getTime();
  const remainingTime = dueByTime - currentDateTime;

  if (remainingTime <= millisecondsInDay) {
    headsUp = "today";
  } else if (remainingTime <= millisecondsInDay * 3) {
    headsUp = "close";
  }

  if (
    remainingTime <= millisecondsInDay &&
    dueDateArr[2] === String(new Date().getDate())
  ) {
    displayDate = "Today";
  } else if (
    remainingTime <= millisecondsInDay * 2 &&
    Number(dueDateArr[2]) === new Date().getDate() + 1
  ) {
    displayDate = "Tomorrow";
  } else if (remainingTime <= millisecondsInWeek) {
    const dueByDay = new Date(displayDate).getDay();
    displayDate = `Next ${weekday[dueByDay]}`;
  }

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

  return [displayDate, displayTime, headsUp];
}
