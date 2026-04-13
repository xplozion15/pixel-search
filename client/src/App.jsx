import "./App.css";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  return (
    <>
      <Navbar showTimer={showTimer} />
      <Outlet context={{ showToast, setShowToast, setShowTimer }} />
    </>
  );
}

export default App;
