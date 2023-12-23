export function colorPicker() {
  const colorsArr = [
    "#ff1500",
    "#ff5e00",
    "#ffcc00",
    "#73ff00",
    "#0004ff",
    "#7300ff",
    "#ff00f7",
    "#ff0073",
    "#00ffdd",
  ];

  const randomNum = Math.floor(Math.random() * colorsArr.length);

  return colorsArr[randomNum];
}

export function tagColor() {
  const lightColors = [
    "#fdc5c1",
    "#ffc6a4",
    "#ffeda4",
    "#cdffa3",
    "#a4a6ff",
    "#cca2ff",
    "#ffa1fc",
    "#ffa2cc",
    "#a3fff3",
  ];

  const randomNum = Math.floor(Math.random() * lightColors.length);

  return lightColors[randomNum];
}
