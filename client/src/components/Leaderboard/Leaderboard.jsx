import styles from "./Leaderboard.module.css";
import { gameReset } from "../../utils/gameReset";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Leaderboard = () => {
  const { setFoundCharactersIds, setGameState } = useOutletContext();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    gameReset(setFoundCharactersIds, setGameState);
  }, [setFoundCharactersIds, setGameState]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const leaderboardResponse = await fetch(`${API_BASE_URL}/highscores`);

        if (!leaderboardResponse.ok) {
          throw new Error("Failed to fetch the leaderboard");
        }
        let leaderboard = await leaderboardResponse.json();
        console.log(leaderboard.highscores);

        await setLeaderboardData(leaderboard.highscores);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLeaderboard();
  }, []);
  return (
    <>
      <div className={styles.leaderboard}>
        <h2 className={styles.leaderboardHeading}>LEADERBOARD!</h2>
        {leaderboardData?.map((leaderboardItem) => {
          return (
            <div className={styles.leaderboardItem} key={leaderboardItem.id}>
              <p className={styles.playerName}>{leaderboardItem.playerName}</p>
              <p className={styles.highscore}>
                {leaderboardItem.gameSession.durationSeconds} s
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Leaderboard };
