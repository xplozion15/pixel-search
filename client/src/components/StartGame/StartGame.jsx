import { Link } from "react-router";
import styles from "./StartGame.module.css";
import { useEffect } from "react";
import { useOutletContext } from "react-router";
import { gameReset } from "../../utils/gameReset";

const StartGame = () => {
  const { setFoundCharactersIds } = useOutletContext();

  useEffect(() => {
    gameReset(setFoundCharactersIds);
  }, [setFoundCharactersIds]);
  return (
    <div className={styles.startGame}>
      <h1 className={styles.heading}>Pixel-Search</h1>
      <p className={styles.description}>
        Find the characters hiding in the image
      </p>

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
