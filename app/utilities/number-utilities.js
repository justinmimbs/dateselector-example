// Ord a => (a, a, a) -> a
function clamp(min, max, x) {
  if (x < min) {
    return min;
  } else if (x > max) {
    return max;
  }

  return x;
}

// Ord a => (a, a, a) -> Boolean
function isBetween(start, end, x) {
  return x >= start && x <= end;
}

// (Number, Number, Number) -> [Number]
function range(start, end, step = 1) {
  const a = [];
  let i = start;
  while (i < end) {
    a.push(i);
    i += step;
  }

  return a;
}

export {
  clamp,
  isBetween,
  range,
};
