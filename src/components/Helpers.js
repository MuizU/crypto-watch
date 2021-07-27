export const roundOff = (value) => {
  if (!isNaN(value)) {
    return Math.round(value * 100) / 100;
  }
  return value;
};

export const checkNegative = (value) => {
  if (!isNaN(value)) {
    return value > 1 ? false : true;
  }
  return false;
};
