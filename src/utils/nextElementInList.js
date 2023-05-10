const nextElementInList = (list, value) => {
  const curValueIndex = list.indexOf(value);
  const nextValueIndex = (curValueIndex + 1) % list.length;
  const nextValue = list[nextValueIndex];
  return nextValue;
};

export default nextElementInList;
