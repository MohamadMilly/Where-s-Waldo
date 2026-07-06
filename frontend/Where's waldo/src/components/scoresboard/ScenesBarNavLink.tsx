import { NavLink } from "react-router";
import type { JSX } from "react/jsx-runtime";

type ScenesBarNavLinkProps = {
  slug: string;
  name: string;
};

export function ScenesBarNavLink({
  slug,
  name,
}: ScenesBarNavLinkProps): JSX.Element {
  const baseClass =
    "px-4 py-3 text-center text-base text-purple-400 block text-nowrap ";
  return (
    <NavLink
      className={({ isActive }) => {
        if (isActive) {
          return `${baseClass} border-b-2 border-purple-400 `;
        } else {
          return baseClass;
        }
      }}
      to={`/scoresboard/${slug}`}
    >
      {name}
    </NavLink>
  );
}
