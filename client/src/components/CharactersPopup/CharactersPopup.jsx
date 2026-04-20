import { useEffect, useRef } from "react";
import styles from "./CharactersPopup.module.css";
import { useOutletContext } from "react-router";

const CharactersPopup = ({
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

  return (
    <>
      <dialog className={styles.charactersPopup} ref={charactersPopupRef}>
        <div className={styles.charactersContainer}>
          <div
            className={styles.characterName}
            onClick={() => setShowToast(true)}
          >
            Dragon
          </div>
          <div
            className={styles.characterName}
            onClick={() => setShowToast(true)}
          >
            Robot
          </div>
          <div
            className={styles.characterName}
            onClick={() => setShowToast(true)}
          >
            Boat guy
          </div>
          <div
            className={styles.characterName}
            onClick={() => setShowToast(true)}
          >
            Robot
          </div>
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
