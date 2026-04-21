import styles from "./Toast.module.css";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

const Toast = ({ toastMessage, isValidAttempt }) => {
  const timerDuration = 1500;
  const { setShowToast } = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, timerDuration);

    return () => clearTimeout(timer);
  }, [setShowToast, isValidAttempt]);

  return (
    <div className={styles.toast}>
      {isValidAttempt ? <CircleCheck /> : <CircleX />}
      <p> {toastMessage} </p>
    </div>
  );
};

export { Toast };
