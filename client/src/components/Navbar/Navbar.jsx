import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = ({ showTimer }) => {
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">Pixel-search</Link>
        <div className={styles.charactersContainer}>
          <p>Waldo</p>
          <p>Dragon</p>
          <p>Robot</p>
          <p>Object</p>
        </div>
        <div className={styles.timeAndLeaderboardContainer}>
          {showTimer && <p className={styles.timer}> ⏱️ 15 s</p>}
          <p className={styles.timer}> ⏱️ 15 s</p>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
