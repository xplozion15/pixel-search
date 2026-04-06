import "./App.css";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import { StartGame } from "./components/StartGame/StartGame";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
