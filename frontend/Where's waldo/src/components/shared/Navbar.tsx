import { Play, Trophy } from "lucide-react";
import { RouteLink } from "../ui/RouteLink";

export function Navbar() {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <RouteLink className="flex items-center gap-0.5" route="/scenes">
            <Play size={22} />
            <span>Play</span>
          </RouteLink>
        </li>
        <li>
          <RouteLink className="flex items-center gap-0.5" route="/scoresboard">
            <Trophy size={22} />
            <span>Scoresboard</span>
          </RouteLink>
        </li>
      </ul>
    </nav>
  );
}
