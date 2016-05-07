// Object -> String
function cx(classMap) {
  return Object.keys(classMap)
    .filter(key => classMap[key])
    .join(' ');
}

export {
  cx,
};
