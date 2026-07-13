import type { ReactNode, ComponentPropsWithoutRef, JSX } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`px-3 py-1 shadow-sm cursor-pointer focus:outline focus:outline-purple-400 focus:outline-offset-2 focus:shadow-none active:border-b transition-all duration-200 text-purple-400 border-x border-t border-b-4 border-purple-400 rounded-md text-sm md:text-base ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
