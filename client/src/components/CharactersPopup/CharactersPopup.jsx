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
  foundCharactersCoordinates,
  setFoundCharactersCoordinates,
}) => {
  const charactersPopupRef = useRef(null);
  const { setShowToast, highscoreInfo, setHighscoreInfo } = useOutletContext();

  useEffect(() => {
    if (showCharactersPopup) {
      charactersPopupRef.current?.showModal();
    } else {
      charactersPopupRef.current?.close();
    }
  }, [showCharactersPopup]);

  async function onCharacterClickHandler(characterId) {
    setShowCharactersPopup(false);

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
      setShowToast(true);
      if (!attempt.ok) {
        throw new Error(attemptResult.error);
      }

      if (attemptResult.isAttemptCorrect) {
        setIsValidAttempt(true);
        setFoundCharactersIds((prev) => [...prev, characterId]);
        setFoundCharactersCoordinates([
          ...foundCharactersCoordinates,
          {
            x: clickedCoordinates.X,
            y: clickedCoordinates.Y,
          },
        ]);

        if (attemptResult.isSessionOver) {
          try {
            //send api request the end the season to update the endTime in the db
            const endSession = await fetch(
              `${API_BASE_URL}/sessions/${currentSessionId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );

            if (!endSession.ok) {
              throw new Error("Failed to update the session");
            }

            setHighscoreInfo({
              ...highscoreInfo,
              gameSessionId: currentSessionId,
            });
          } catch (error) {
            console.error(error);
          }

          //signal that the game has ended by changing the state
          setGameState("ended");

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

  // set the left and top variables to pass into the inline styles of the popup
  let left = clickedCoordinates.X;
  let top = clickedCoordinates.Y;

  if (clickedCoordinates.X > 90) {
    left = clickedCoordinates.X - 8;
  } else if (clickedCoordinates.X < 10) {
    left = clickedCoordinates.X + 8;
  } else {
    left = clickedCoordinates.X;
  }

  if (clickedCoordinates.Y < 20) {
    top = clickedCoordinates.Y + 15;
  } else if (clickedCoordinates.Y > 90) {
    top = clickedCoordinates.Y - 10;
  } else {
    top = clickedCoordinates.Y;
  }

  return (
    <>
      <dialog
        className={styles.charactersPopup}
        ref={charactersPopupRef}
        style={{
          left: `${left}%`,
          top: `${top}%`,
        }}
      >
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
