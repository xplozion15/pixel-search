import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">Pixel-search</Link>
        <p className={styles.timer}> ⏱️ 15 s</p>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
    </>
  );
};

export { Navbar };
