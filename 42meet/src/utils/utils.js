export const jsonToArray = json => {
  const arr = [];
  for (let i in json) arr.push(json[i]);
  return arr;
};
