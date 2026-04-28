import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const timeout = 1000;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, timeout);

    return () => clearInterval(interval);
  }, []);

  return <p className={styles.timer}> ⏱️ {timeElapsed} s</p>;
};

export { Timer };
