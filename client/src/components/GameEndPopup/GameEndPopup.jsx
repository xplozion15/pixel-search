import { useRef, useEffect } from "react";
import styles from "./GameEndPopup.module.css";
import { useOutletContext } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from "react-router";

const GameEndPopup = () => {
  const navigate = useNavigate();
  const gameEndPopupRef = useRef(null);
  const { gameState, setGameState, highscoreInfo, setHighscoreInfo } =
    useOutletContext();

  useEffect(() => {
    if (gameState === "ended") {
      gameEndPopupRef.current?.showModal();
    } else {
      gameEndPopupRef.current?.close();
    }
  }, [gameState]);

  async function onSaveHandler() {
    try {
      setGameState("idle");
      const highscoreResponse = await fetch(`${API_BASE_URL}/highscores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: highscoreInfo.time,
          playerName: highscoreInfo.playerName,
        }),
      });

      if (!highscoreResponse.ok) {
        throw new Error("Failed to save the highscore");
      }

      return navigate("/leaderboard");
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

  return (
    <>
      <dialog className={styles.gameEndPopup} ref={gameEndPopupRef}>
        <div className={styles.gameEndPopupContainer}>
          <p>You found them all</p>

          <p>Enter you name</p>
          <input
            type="text"
            onChange={(e) => {
              setHighscoreInfo({
                ...highscoreInfo,
                playerName: e.target.value,
              });
            }}
          />
        </div>
        <button
          className={styles.cancel}
          onClick={() => {
            setGameState("idle");
            navigate("/");
          }}
        >
          Cancel
        </button>
        <button
          className={styles.save}
          onClick={() => {
            onSaveHandler();
          }}
        >
          Save
        </button>
      </dialog>
    </>
  );
};

export { GameEndPopup };
