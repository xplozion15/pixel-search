import { Game } from "../components/Game/Game";
import { Leaderboard } from "../components/Leaderboard/Leaderboard";
import App from "../App";
import { StartGame } from "../components/StartGame/StartGame";
import { Error404 } from "../components/Error404/Error404";

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
      {
      path : "*",
      element : <Error404/>
    },
    ],
  },
];

export { routes };
