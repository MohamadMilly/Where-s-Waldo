import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "../../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useCreateUser } from "../../../hooks/api/useCreateUser";
import { useUser } from "../../../contexts/UserContext";
import { RouteLink } from "../../ui/RouteLink";
import { Home, LoaderCircle, Trophy } from "lucide-react";

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
    <div className="fixed border bg-black/70 backdrop-blur-sm inset-0 flex justify-center items-center z-9999">
      <div className="max-w-125 h-full sm:h-100 w-full bg-white px-4 py-6 flex flex-col rounded-lg animate-popUp">
        <div>
          <h1 className="text-2xl text-purple-700">You Won !</h1>
          <p className="text-sm text-gray-700">Duration Score: {score}s</p>
        </div>
        {!user && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 grow"
            method="POST"
          >
            <label htmlFor="name" className="text-gray-700 block mb-1">
              Your Name
              <span className="text-red-500 mx-1">*</span>
            </label>
            <div className="flex h-9.5 items-center">
              <input
                className="px-2 py-1 block h-full grow rounded-y-lg rounded-l-lg user-invalid::outline-red-500 user-invalid:border-red-500 border border-purple-400 focus:outline-1 focus:outline-offset-2 focus:outline-purple-400"
                onChange={onNameChange}
                type="text"
                id="name"
                required
                placeholder="Write your name"
              />
              <Button
                disabled={isPendingCreatingUser}
                className="flex rounded-l-none h-full! box-border items-center gap-0.5"
                type="submit"
                onClick={onSubmit}
              >
                <span>Submit</span>
                {isPendingCreatingUser && (
                  <LoaderCircle className="animate-spin" size={20} />
                )}
              </Button>
              {userCreationError && (
                <p className="mt-3 text-lg text-red-500">
                  Error: {userCreationError.message}
                </p>
              )}
            </div>
          </form>
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
