import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { isCharacterIdPresentInArray } from "../../utils/includesId";

const Navbar = ({ showTimer, foundCharactersIds, characters }) => {
  console.log(`charactesr are ${characters}`);
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">Pixel-search</Link>
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <p
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
        <div className={styles.timeAndLeaderboardContainer}>
          {showTimer && <p className={styles.timer}> ⏱️ 15 s</p>}
          <p className={styles.timer}> ⏱️ 15 s</p>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
