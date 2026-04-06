import { Game } from "../components/Game/Game";
import { Leaderboard } from "../components/Leaderboard/Leaderboard";
import App from "../App";
import { StartGame } from "../components/StartGame/StartGame";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <StartGame /> },
      {
        path: "/game",
        element: <Game />,
      },
      { path: "/leaderboard", element: <Leaderboard /> },
    ],
  },
];

export { routes };
