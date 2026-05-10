import { Link } from "react-router";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <>
      <div className={styles.errorContainer}>
        <p className={styles.text}>Error 404. This page doesnt exist lol.</p>
        <Link className={styles.button} to="/" viewTransition>
          Go home
        </Link>
      </div>
    </>
  );
};

export { Error404 };
