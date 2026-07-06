import { useParams } from "react-router";
import { useScores } from "../../hooks/api/useScores";
import { ScoreListItem } from "./Score";

export function ScoresTable() {
  const { slug } = useParams();
  const { scores, isLoading, error } = useScores({ slug: slug });
  if (isLoading) return <p className="text-lg text-purple-400">Loading...</p>;
  if (error)
    return <p className="text-lg text-red-500">Error: {error.message}</p>;

  return (
    <ul className="mx-auto max-x-200 shadow-lg shadow-purple-400/20 rounded-lg mt-6">
      {scores.map((score, index) => {
        return <ScoreListItem score={score} index={index} />;
      })}
    </ul>
  );
}
