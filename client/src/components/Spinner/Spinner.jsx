import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loadingWrapper}>
      <span className={styles.loader}></span>
      <h2 className={styles.text}>Loading...</h2>
    </div>
  );
};

export { Spinner };
