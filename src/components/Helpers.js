export const roundOff = (value) => {
  if (!isNaN(value)) {
    return Math.round(value * 100) / 100;
  }
  return value;
};

export const checkNegative = (value) => {
  if (!isNaN) {
    return Math.sign(value) === -1 ? true : false;
  }
  return false;
};
