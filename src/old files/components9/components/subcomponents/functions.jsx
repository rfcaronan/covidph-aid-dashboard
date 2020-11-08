export const greeting = () => {
  console.log("hello!");
  waveHello();
};

export const waveHello = () => {
  console.log("👋");
};

export const convertValue = (value) => {
  return Math.abs(Number(value)) >= 1.0e9
    ? Math.abs(Number(value)) / 1.0e9 + "B"
    : Math.abs(Number(value)) >= 1.0e6
    ? Math.abs(Number(value)) / 1.0e6 + "M"
    : Math.abs(Number(value)) >= 1.0e3
    ? Math.abs(Number(value)) / 1.0e3 + "K"
    : Math.abs(Number(value));
};

export const convertUnicode = (input) => {
  return input.replace(/\\u(\w{4,4})/g, function (a, b) {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
};

export const categoryValue = (props) => {
  const arr = [];
  const total = 0;
  if (props.AreaFocus === props.AreaFocusEntry) {
    arr.push(props.AidValue);
  }
  for (var i = 0, len = arr.length; i < len; i++) {
    total += arr[i][1];
  }
  return total;
};
