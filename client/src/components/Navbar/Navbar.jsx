import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { isCharacterIdPresentInArray } from "../../utils/includesId";
import { Timer } from "../Timer/Timer";

const Navbar = ({ foundCharactersIds, characters, gameState }) => {
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" viewTransition>
          Pixel-search
        </Link>
        {gameState === "playing" && (
          <div className={styles.charactersContainer}>
            {characters.map((character) => {
              return (
                <p
                  className={
                    isCharacterIdPresentInArray(
                      character.id,
                      foundCharactersIds,
                    )
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
        <div className={styles.timeAndLeaderboardContainer}>
          {gameState === "playing" && <Timer />}

          <Link to="/leaderboard" viewTransition>
            Leaderboard
          </Link>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
