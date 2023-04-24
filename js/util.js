const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloating = (a, b) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower + 1) + lower;
  return result.toFixed(5);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export {getRandomInteger, getRandomFloating, getRandomArrayElement};
