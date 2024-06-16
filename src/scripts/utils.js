function keyHandler(key, item) {
  if (key === item) {
    return true;
  }
  return false;
}

export {keyHandler}