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
  const [characters, setCharacters] = useState(null);

  //useEffect for starting the session on component mount
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

  //useEffect for getting the characters of the game to pass to the dialog component for rednering the options
  useEffect(() => {
    const getCharacters = async () => {
      const characters = await fetch(`${API_BASE_URL}/characters`);
      if (!characters.ok) {
        throw new Error("Failed to fetch chacaters ");
      }
      const charactersResult = await characters.json();
      setCharacters(charactersResult.characters);
    };

    getCharacters();
  }, []);

  // function for image click handling or co-ordinates and showing dialog
  const handleImageClick = (event) => {
    getClickedCoorindates(event);
    setShowCharactersPopup(true);
  };

  return (
    <>
      {showCharactersPopup && (
        <CharactersPopup
          characters={characters}
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
