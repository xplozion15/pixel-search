import { useEffect, useRef } from "react";
import styles from "./CharactersPopup.module.css";
import { useOutletContext } from "react-router";

const CharactersPopup = ({
  characters,
  currentSessionId,
  showCharactersPopup,
  setShowCharactersPopup,
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
  console.log(characters);
  return (
    <>
      <dialog className={styles.charactersPopup} ref={charactersPopupRef}>
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <div
                key={character.id}
                className={styles.characterName}
                onClick={() => setShowToast(true)}
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
