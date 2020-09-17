const getRandomNumber = () => {
  return Math.floor(Math.random() * 99) + 1;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getDigits = () => {
  const x = getRandomNumber();
  const y = getRandomNumber();
  const z = getRandomNumber();
  return [x, y, z];
};

export const getResult = (digits) => {
  return digits.reduce((curr, acc) => curr + acc);
};

export const getFormatDigits = (digits) => {
  const formatString = digits.toString().replaceAll(",", " + ");
  return formatString;
};

export const getShuffledResult = (result) => {
  let newResult = result - getRandomNumber();
  newResult = result + getRandomNumber();
  const resultArray = [newResult, result];
  return shuffle(resultArray)[0];
};
