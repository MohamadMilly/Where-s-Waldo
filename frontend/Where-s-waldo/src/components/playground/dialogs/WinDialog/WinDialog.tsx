import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "../../../ui/Button/Button";
import { useNavigate, useParams } from "react-router";
import { useCreateUser } from "../../../../hooks/api/useCreateUser";
import { useUser } from "../../../../contexts/UserContext";
import { RouteLink } from "../../../ui/RouteLink/RouteLink";
import { Home, Trophy } from "lucide-react";
import { CreateUserForm } from "../../forms/CreateUserForm/CreateUserForm";

export function WinDialog({ score }: { score: number }) {
  const [name, setName] = useState<string | null>(null);
  const { slug } = useParams();

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const {
    mutate: createUser,
    isPending: isPendingCreatingUser,
    error: userCreationError,
  } = useCreateUser();
  
  const { user } = useUser();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (!name?.trim()) return;
    createUser(name);
  };
  return (
    <div
      data-testid="win-dialog"
      className="fixed border bg-black/70 backdrop-blur-sm inset-0 flex justify-center items-center z-9999"
    >
      <div className="max-w-125 h-full sm:h-100 w-full bg-white px-4 py-6 flex flex-col rounded-lg animate-popUp">
        <div>
          <h1 className="text-2xl text-purple-700">You Won !</h1>
          <p className="text-sm text-gray-700">Duration Score: {score}s</p>
        </div>
        {!user && (
          <CreateUserForm
            onNameChange={onNameChange}
            isPendingCreatingUser={isPendingCreatingUser}
            error={userCreationError}
            onSubmit={onSubmit}
          />
        )}
        <div className="mt-auto flex flex-col gap-1">
          <RouteLink
            className="text-center py-1.5! flex items-center justify-center gap-1"
            route={`/scoresboard/${slug}`}
          >
            <Trophy size={25} />
            <span>View Scores</span>
          </RouteLink>
          <Button
            className="py-1.5! flex justify-center items-center gap-1"
            type="button"
            onClick={() => navigate("/scenes")}
          >
            <Home size={25} />
            <span>Main menu</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
