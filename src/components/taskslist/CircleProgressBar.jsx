import styled from "styled-components";

const CircleProgressBar = ({ subTasks }) => {
  const subTasksCompleted = subTasks.filter((subTask) => subTask.isCompleted);
  const percentage = (
    (subTasksCompleted.length / subTasks.length) *
    100
  ).toFixed(0);
  const dashArray = 25 * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <Circle>
      <p>{percentage}%</p>
      <svg width={100} height={100} viewBox="0 0 100 100">
        <circle
          cx={50}
          cy={50}
          strokeWidth={"3px"}
          r={25}
          className="circle-bg"
        />
        <circle
          cx={50}
          cy={50}
          strokeWidth={"3px"}
          r={25}
          className="circle-progress"
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </Circle>
  );
};

export default CircleProgressBar;

const Circle = styled.div`
  width: 100px;
  position: absolute;
  right: 0;
  top: 55px;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .circle-bg {
    fill: none;
    stroke: var(--background);
  }
  .circle-progress {
    fill: none;
    stroke: magenta;
  }
`;
