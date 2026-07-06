import App from "./App";
import { ScoresTable } from "./components/scoresboard/ScoresTable";
import { Landing } from "./routes/Landing";
import { PlayGround } from "./routes/PlayGround";
import { ScenesPage } from "./routes/Scenes";
import { ScoresBoard } from "./routes/ScoresBoard";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Landing />,
        index: true,
      },
      {
        element: <ScenesPage />,
        path: "/scenes",
      },
      {
        element: <ScoresBoard />,
        path: "/scoresboard",
        children: [
          {
            path: "/scoresboard/:slug",
            element: <ScoresTable />,
          },
        ],
      },
    ],
  },
  {
    element: <PlayGround />,
    path: "/scenes/:slug",
  },
];
