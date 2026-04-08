import { Link } from "react-router";
import styles from "./StartGame.module.css";

const StartGame = () => {
  return (
    <div className={styles.startGame}>
      <h1 className={styles.heading}>Pixel-Search</h1>
      <p>Find the characters hiding in the image</p>

      <img
        className={styles.gameStartImage}
        src="/game-image.png"
        alt="game-start-image"
      />
      <Link className={styles.gameStartButton} to="/game">
        <p>START THE GAME!</p>
      </Link>
    </div>
  );
};

export { StartGame };
