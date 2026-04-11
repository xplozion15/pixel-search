import { useEffect, useRef } from "react";
import styles from "./CharactersPopup.module.css";
const CharactersPopup = ({ showCharactersPopup, setShowCharactersPopup }) => {
  const charactersPopupRef = useRef(null);

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
        <div>
          <div className={styles.characterName}>Dragon</div>
          <div className={styles.characterName}>Robot</div>
        </div>
        <button
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
