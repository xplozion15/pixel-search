import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [showToast, setShowToast] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [foundCharactersIds, setFoundCharactersIds] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [gameState, setGameState] = useState("idle");
  const [highscoreInfo, setHighscoreInfo] = useState({});
  const [loading, setLoading] = useState(true);
  // will use idle , playing , ended for rendering components conditionally

  //to check the status if backend is on or not before showing game home page
  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await fetch(`${API_BASE_URL}/status`);

        if (!response.ok) {
          throw new Error("Failed to check the backend status");
        }

        const result = await response.json();

        if (result.ok) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    checkStatus();
  }, []);

  useEffect(() => {
    const getCharacters = async () => {
      const charactersResponse = await fetch(`${API_BASE_URL}/characters`);
      if (!charactersResponse.ok) {
        throw new Error("Failed to fetch chacaters ");
      }
      const charactersResult = await charactersResponse.json();
      setCharacters(charactersResult.characters);
    };

    getCharacters();
  }, []);

  return (
    <>
      <Navbar
        showTimer={showTimer}
        foundCharactersIds={foundCharactersIds}
        characters={characters}
        gameState={gameState}
        loading={loading}
      />
      <Outlet
        context={{
          showToast,
          setShowToast,
          setShowTimer,
          foundCharactersIds,
          setFoundCharactersIds,
          characters,
          setCharacters,
          gameState,
          setGameState,
          setHighscoreInfo,
          highscoreInfo,
          loading,
          setLoading,
        }}
      />
    </>
  );
}

export default App;
