import styles from "./Toast.module.css";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

const Toast = () => {
  const timerDuration = 1500;
  const { setShowToast } = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, timerDuration);

    return () => clearTimeout(timer);
  }, [setShowToast]);

  return (
    <div className={styles.toast}>
      <CircleX />
      {/* <CircleCheck/> */}
      <p> Something wrong happened! </p>
    </div>
  );
};

export { Toast };
