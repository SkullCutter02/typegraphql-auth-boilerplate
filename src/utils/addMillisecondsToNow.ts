const addMillisecondsToNow = () => {
  let now = Date.now();
  now += 3600000; // 1 hour
  return new Date(now);
};

export default addMillisecondsToNow;
