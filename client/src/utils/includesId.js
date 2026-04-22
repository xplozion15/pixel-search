function isCharacterIdPresentInArray(characterId, array) {
  const presenceOfIdChecker = array.includes(characterId);

  return presenceOfIdChecker;
}

export { isCharacterIdPresentInArray };
