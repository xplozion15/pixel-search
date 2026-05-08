import styles from "./Game.module.css";
import { CharactersPopup } from "../CharactersPopup/CharactersPopup";
import { useEffect, useState } from "react";
import { getClickedCoorindates } from "../../utils/getClickedCoorindates";
import { Toast } from "../Toast/Toast";
import { useOutletContext } from "react-router";
import { GameEndPopup } from "../GameEndPopup/GameEndPopup";
import { Marker } from "../Marker/Marker";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Game = () => {
  const {
    showToast,
    foundCharactersIds,
    setFoundCharactersIds,
    characters,
    setGameState,
    gameState,
  } = useOutletContext();

  const [showCharactersPopup, setShowCharactersPopup] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [clickedCoordinates, setClickedCoorindates] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isValidAttempt, setIsValidAttempt] = useState(false);
  const [foundCharactersCoordinates, setFoundCharactersCoordinates] = useState(
    [],
  );

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
      setGameState("playing");
    };

    startSession();
  }, [setGameState]);

  // function for image click handling or co-ordinates and showing dialog
  const handleImageClick = (event) => {
    const clickedCoordinates = getClickedCoorindates(event);
    setClickedCoorindates(clickedCoordinates);
    setShowCharactersPopup(true);
  };
  console.log(foundCharactersCoordinates);
  return (
    <>
      {showCharactersPopup && (
        <CharactersPopup
          currentSessionId={currentSessionId}
          clickedCoordinates={clickedCoordinates}
          characters={characters}
          currentSessionId={currentSessionId}
          showCharactersPopup={showCharactersPopup}
          setShowCharactersPopup={setShowCharactersPopup}
          setToastMessage={setToastMessage}
          setIsValidAttempt={setIsValidAttempt}
          foundCharactersIds={foundCharactersIds}
          setFoundCharactersIds={setFoundCharactersIds}
          setGameState={setGameState}
          foundCharactersCoordinates={foundCharactersCoordinates}
          setFoundCharactersCoordinates={setFoundCharactersCoordinates}
        />
      )}
      <div className={styles.game}>
        <div className={styles.gameImageContainer}>
          <img
            onClick={handleImageClick}
            className={styles.gameImage}
            src="/game-image.png"
            alt="game-image"
          />
          {foundCharactersCoordinates.map((character) => {
            console.log(foundCharactersCoordinates);
            return <Marker x={character.x} y={character.y} />;
          })}
        </div>
      </div>
      {showToast && (
        <Toast toastMessage={toastMessage} isValidAttempt={isValidAttempt} />
      )}

      {gameState === "ended" && <GameEndPopup />}
    </>
  );
};

export { Game };
