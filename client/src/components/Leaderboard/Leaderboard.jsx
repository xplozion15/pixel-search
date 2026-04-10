import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
  return (
    <>
      <div className={styles.leaderboard}>
        <h2>LEADERBOARD!</h2>
        <div className={styles.leaderboardItem}>
          <p className={styles.playerName}>Xplo</p>
          <p className={styles.highscore}>10 s</p>
        </div>

        <div className={styles.leaderboardItem}>
          <p className={styles.playerName}>Xajx</p>
          <p className={styles.highscore}>30 s</p>
        </div>

        <div className={styles.leaderboardItem}>
          <p className={styles.playerName}>Viena</p>
          <p className={styles.highscore}>50 s</p>
        </div>
      </div>
    </>
  );
};

export { Leaderboard };
