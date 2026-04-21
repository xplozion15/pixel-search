function isAttemptCorrect(x, y, characterCoordinates) {
  const { xLeft, xRight, yBottom, yTop } = characterCoordinates;
  console.log(`x is ${x} and y is ${y}`);
  return x >= xLeft && x <= xRight && y <= yBottom && y >= yTop;
}

export { isAttemptCorrect };
