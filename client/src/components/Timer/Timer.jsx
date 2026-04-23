import { useState, useEffect } from "react";

const Timer = () => {
  const timeout = 1000;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, timeout);

    return () => clearInterval(interval);
  }, []);

  return <p> ⏱️ {timeElapsed} s</p>;
};

export { Timer };
