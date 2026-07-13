import { LoaderCircle } from "lucide-react";
import { Button } from "../../../ui/Button/Button";
import type { ChangeEvent, JSX, SubmitEventHandler } from "react";

type CreateUserFormProps = {
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPendingCreatingUser: boolean;
  onSubmit: () => void;
  error: Error | null;
};

export function CreateUserForm({
  onNameChange,
  isPendingCreatingUser,
  onSubmit,
  error: userCreationError,
}: CreateUserFormProps): JSX.Element {
  const handleSubmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidaty()) {
      return;
    }
    onSubmit();
  };
  return (
    <form
      data-testid="form"
      onSubmit={handleSubmitForm}
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
          name="name"
          placeholder="Write your name"
        />
        <Button
          data-testid="submit-button"
          disabled={isPendingCreatingUser}
          className="flex rounded-l-none h-full! box-border items-center gap-0.5"
          type="submit"
          onClick={() => {}}
        >
          <span>Submit</span>
          {isPendingCreatingUser && (
            <LoaderCircle
              data-testid="loading-spinner"
              className="animate-spin"
              size={20}
            />
          )}
        </Button>
        {userCreationError && (
          <p role="alert" className="mt-3 text-lg text-red-500">
            Error: {userCreationError.message}
          </p>
        )}
      </div>
    </form>
  );
}
