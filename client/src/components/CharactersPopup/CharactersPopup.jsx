import { useEffect, useRef } from "react";
import styles from "./CharactersPopup.module.css";
import { useOutletContext } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { isCharacterIdPresentInArray } from "../../utils/includesId";

const CharactersPopup = ({
  currentSessionId,
  clickedCoordinates,
  characters,
  showCharactersPopup,
  setShowCharactersPopup,
  setToastMessage,
  setIsValidAttempt,
  foundCharactersIds,
  setFoundCharactersIds,
  setGameState,
}) => {
  const charactersPopupRef = useRef(null);
  const { setShowToast } = useOutletContext();

  useEffect(() => {
    if (showCharactersPopup) {
      charactersPopupRef.current?.showModal();
    } else {
      charactersPopupRef.current?.close();
    }
  }, [showCharactersPopup]);

  async function onCharacterClickHandler(characterId) {
    setShowCharactersPopup(false);
    setShowToast(true);

    try {
      const attempt = await fetch(
        `${API_BASE_URL}/sessions/${currentSessionId}/attempts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x: clickedCoordinates.X,
            y: clickedCoordinates.Y,
            characterId: characterId,
          }),
        },
      );

      const attemptResult = await attempt.json();

      setToastMessage(attemptResult.message);
      if (!attempt.ok) {
        throw new Error(attemptResult.error);
      }

      if (attemptResult.isAttemptCorrect) {
        setIsValidAttempt(true);
        setFoundCharactersIds((prev) => [...prev, characterId]);

        if(attemptResult.isSessionOver) {
          //signal that the game has ended
          setGameState("ended")
          return;
        } 
      } else {
        setIsValidAttempt(false);
      }
    } catch (error) {
      setToastMessage(error.message);
      setIsValidAttempt(false);
      console.error(error);
    }
  }

  return (
    <>
      <dialog className={styles.charactersPopup} ref={charactersPopupRef}>
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <button
                key={character.id}
                className={
                  isCharacterIdPresentInArray(character.id, foundCharactersIds)
                    ? styles.characterNameFound
                    : styles.characterName
                }
                onClick={() => onCharacterClickHandler(character.id)}
                disabled={isCharacterIdPresentInArray(
                  character.id,
                  foundCharactersIds,
                )}
              >
                {character.name}
              </button>
            );
          })}
        </div>
        <button
          className={styles.cancel}
          onClick={() => {
            setShowCharactersPopup(false);
          }}
        >
          Cancel
        </button>
      </dialog>
    </>
  );
};

export { CharactersPopup };
