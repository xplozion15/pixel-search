import { useRef, useEffect, useState } from "react";
import styles from "./GameEndPopup.module.css";
import { useOutletContext } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from "react-router";

const GameEndPopup = () => {
  const navigate = useNavigate();
  const gameEndPopupRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { gameState, setGameState, highscoreInfo, setHighscoreInfo } =
    useOutletContext();

  useEffect(() => {
    if (gameState === "ended") {
      gameEndPopupRef.current?.showModal();
    } else {
      gameEndPopupRef.current?.close();
    }
  }, [gameState]);

  //frontend validation
  function formValidation(playerName) {
    const trimmedPlayerName = playerName.trim();
    if (trimmedPlayerName.length === 0) {
      setErrorMessage("Please enter a username");
      return false;
    } else if (trimmedPlayerName.length > 12) {
      setErrorMessage("Please enter a shorter username (max 12 characteres)");
      return false;
    }
    return true;
  }

  async function onSaveHandler() {
    //backend request

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
          <h3>You found them all!!!!!</h3>

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
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
        <div>
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
              const isFrontendInputValid = formValidation(
                highscoreInfo.playerName || "",
              );

              if (!isFrontendInputValid) {
                return;
              }

              onSaveHandler();
            }}
          >
            Save
          </button>
        </div>
      </dialog>
    </>
  );
};

export { GameEndPopup };
