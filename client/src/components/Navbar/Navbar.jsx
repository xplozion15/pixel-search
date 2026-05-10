import { useState } from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { isCharacterIdPresentInArray } from "../../utils/includesId";
import { Timer } from "../Timer/Timer";

const Navbar = ({ foundCharactersIds, characters, gameState, loading }) => {
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [showCharacterPreview, setShowCharacterPreview] = useState(false);
  return (
    <>
      {!loading && (
        <nav className={styles.nav}>
          <Link to="/" viewTransition>
            Pixel-search
          </Link>

          <div className={styles.timeAndLeaderboardContainer}>
            {gameState === "playing" && <Timer />}

            <Link to="/leaderboard" viewTransition>
              Leaderboard
            </Link>
          </div>
        </nav>
      )}
      {gameState === "playing" && (
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <p
                key={character.id}
                onClick={() => {
                  setShowCharacterPreview(true);
                  setSelectedCharacter(character.name);
                }}
                className={
                  isCharacterIdPresentInArray(character.id, foundCharactersIds)
                    ? styles.characterNameFound
                    : styles.characterName
                }
                disabled={isCharacterIdPresentInArray(
                  character.id,
                  foundCharactersIds,
                )}
              >
                {character.name}
              </p>
            );
          })}
        </div>
      )}
      {showCharacterPreview && (
        <div
          className={styles.overlay}
          onClick={() => setShowCharacterPreview(false)}
        >
          <img
            src={`${selectedCharacter.toLowerCase()}.png`}
            className={styles.selectedCharacter}
            alt={selectedCharacter}
          />
        </div>
      )}
    </>
  );
};

export { Navbar };
