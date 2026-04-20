import styles from "./Game.module.css";
import { CharactersPopup } from "../CharactersPopup/CharactersPopup";
import { useEffect, useState } from "react";
import { getClickedCoorindates } from "../../utils/getClickedCoorindates";
import { Toast } from "../Toast/Toast";
import { useOutletContext } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Game = () => {
  const { showToast } = useOutletContext();
  const [showCharactersPopup, setShowCharactersPopup] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const startSession = async () => {
      const newSession = await fetch(`${API_BASE_URL}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!newSession.ok) {
        throw new Error("Failed to create a sesion");
      }

      const newSessionResult = await newSession.json();
      setCurrentSessionId(newSessionResult.sessionId);
    };

    startSession();
  }, []);

  const handleImageClick = (event) => {
    getClickedCoorindates(event);
    setShowCharactersPopup(true);
  };

  return (
    <>
      {showCharactersPopup && (
        <CharactersPopup
          currentSessionId={currentSessionId}
          showCharactersPopup={showCharactersPopup}
          setShowCharactersPopup={setShowCharactersPopup}
        />
      )}
      <div className={styles.game}>
        <img
          onClick={handleImageClick}
          className={styles.gameImage}
          src="/game-image.png"
          alt="game-image"
        />
      </div>
      {showToast && <Toast />}
    </>
  );
};

export { Game };
