import { useState, useEffect } from "react";



const Timer = () => {
  const timeout = 1000;
  const [timeElapsed, setTimeElapsed] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setTimeElapsed(timeElapsed + 1);
    }, timeout);
  }, [timeElapsed]);

  return <p> ⏱️ {timeElapsed} s</p>;
};

export { Timer };
