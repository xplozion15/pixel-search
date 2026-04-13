import styles from "./Game.module.css";
import { CharactersPopup } from "../CharactersPopup/CharactersPopup";
import { useState } from "react";
import { getClickedCoorindates } from "../../utils/getClickedCoorindates";
import { Toast } from "../Toast/Toast";
import { useOutletContext } from "react-router";

const Game = () => {
  const { showToast } = useOutletContext();
  const [showCharactersPopup, setShowCharactersPopup] = useState(false);

  return (
    <>
      {showCharactersPopup && (
        <CharactersPopup
          showCharactersPopup={showCharactersPopup}
          setShowCharactersPopup={setShowCharactersPopup}
        />
      )}
      <div className={styles.game}>
        <img
          onClick={(e) => {
            getClickedCoorindates(e);
            setShowCharactersPopup(true);
          }}
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
