import { FRUITS } from "./data.js";

export const getWordBy = (keyword) => {
  const result = FRUITS.filter(
    (fruit) =>
      fruit.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  );

  return new Promise((res) => {
    setTimeout(() => res(result), 100);
  });
};

export const debounce = (fn, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
