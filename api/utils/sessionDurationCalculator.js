function getSessionDuration(startTime, finishTime) {
  const startTimeInMs = new Date(startTime).getTime();
  const finishTimeInMs = new Date(finishTime).getTime();

  //convert into seconds by diving by 1000
  const durationInSeconds = (finishTimeInMs - startTimeInMs) / 1000;
  return durationInSeconds;
}

export { getSessionDuration };
