export const roundOff = (value) => {
  if (!isNaN(value)) {
    if (Math.round(value * 100) / 100 <= 0) {
      return value;
    }
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

export const getCurrencyNameFromId = (id) => {
  if (typeof id === "string") {
    return capitalizeEachWord(id.replace(/-/g, " "));
  }
  return "";
};

export const capitalizeEachWord = (word) =>
  word.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
