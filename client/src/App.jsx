import "./App.css";
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
  // will use idle , playing , ended for rendering components conditionally


  useEffect(() => {
    const getCharacters = async () => {
      const charactersResponse = await fetch(`${API_BASE_URL}/characters`);
      if (!charactersResponse.ok) {
        throw new Error("Failed to fetch chacaters ");
      }
      const charactersResult = await charactersResponse.json();
      setCharacters(charactersResult.characters);
      console.log(charactersResult.characters);
    };

    getCharacters();
  }, []);

  return (
    <>
       {gameState === "ended" && (
        <p>the game has ended heheheheeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
      )}
      <Navbar
        showTimer={showTimer}
        foundCharactersIds={foundCharactersIds}
        characters={characters}
        gameState={gameState}
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
          setGameState
        }}
      />
    </>
  );
}

export default App;
