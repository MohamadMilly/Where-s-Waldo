import { Outlet } from "react-router";
import { ScenesBar } from "../components/scoresboard/ScenesBar";
import { PageWrapper } from "../components/shared/PageWrapper";
import { useScenes } from "../hooks/api/useScenes";

export function ScoresBoard() {
  const { scenes, isLoading, error } = useScenes();
  
  return (
    <PageWrapper>
      <h1 className="text-2xl text-purple-700 md:text-4xl mb-4">Scores</h1>
      <p className="text-xs mb-2 text-gray-700 uppercase tracking-widest">
        See Who played the best!
      </p>
      <ScenesBar scenes={scenes} isLoading={isLoading} error={error} />
      {!isLoading && !error && <Outlet />}
    </PageWrapper>
  );
}
