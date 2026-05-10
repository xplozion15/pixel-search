import { Link } from "react-router";
import styles from "./StartGame.module.css";
import { useEffect } from "react";
import { useOutletContext } from "react-router";
import { gameReset } from "../../utils/gameReset";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Spinner } from "../Spinner/Spinner";

const StartGame = () => {
  const { setFoundCharactersIds, setGameState, loading } = useOutletContext();

  useEffect(() => {
    gameReset(setFoundCharactersIds, setGameState);
  }, [setFoundCharactersIds, setGameState]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.startGame}>
          <h1 className={styles.heading}>🎯 Pixel-Search</h1>
          <p className={styles.description}>
            Find the characters hiding in the image
          </p>

          <img
            className={styles.gameStartImage}
            src="/game-image.png"
            alt="game-start-image"
          />
          <Link className={styles.gameStartButton} to="/game" viewTransition>
            <p>START THE GAME!</p>
          </Link>
        </div>
      )}
    </>
  );
};

export { StartGame };
