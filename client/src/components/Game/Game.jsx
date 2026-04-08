import styles from "./Game.module.css";

const Game = () => {
  return (
    <div className={styles.game}>
      
      <img className={styles.gameImage} src="/game-image.png" alt="game-image" />
    </div>
  );
};

export { Game };
