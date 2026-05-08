import styles from "./Marker.module.css";

const Marker = ({ x, y }) => {
  return (
    <div
      className={styles.marker}
      style={{ left: `${x}%`, top: `${y}%` }}
    ></div>
  );
};

export { Marker };
