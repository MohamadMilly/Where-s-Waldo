import type { Score } from "@app/types";
import type { JSX } from "react/jsx-runtime";
import { useUser } from "../../contexts/UserContext";

type ScoreListItem = {
  score: Required<Score>;
  index: number;
};

export function ScoreListItem({ score, index }: ScoreListItem): JSX.Element {
  const scoreUser = score.user;
  const { user } = useUser();
  const isCurrentUserScore = user?.id === score.user.id;
  return (
    <li className="flex justify-between p-2">
      <span className="text-sm bg-gray-300/20 rounded-full min-w-5 h-5 mr-2 text-center text-purple-400">
        {index + 1}
      </span>
      <p className={`grow ${isCurrentUserScore ? "text-purple-700" : ""}`}>
        {scoreUser.name}
        {isCurrentUserScore && " (You) "}
      </p>
      <span className="text-sm text-gray-400">{score.duration / 1000}S</span>
    </li>
  );
}
