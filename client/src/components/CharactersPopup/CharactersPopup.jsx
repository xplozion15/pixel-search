import { useEffect, useRef } from "react";
import styles from "./CharactersPopup.module.css";
import { useOutletContext } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CharactersPopup = ({
  currentSessionId,
  clickedCoordinates,
  characters,
  showCharactersPopup,
  setShowCharactersPopup,
  setToastMessage,
  setIsValidAttempt,
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
      console.log(
        `current sessions id is ${currentSessionId}, x is ${clickedCoordinates.X}, y is ${clickedCoordinates.Y} and characterid is ${characterId} `,
      );
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
      } else {
        setIsValidAttempt(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <dialog className={styles.charactersPopup} ref={charactersPopupRef}>
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <div
                key={character.id}
                className={styles.characterName}
                onClick={() => onCharacterClickHandler(character.id)}
              >
                {character.name}
              </div>
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
