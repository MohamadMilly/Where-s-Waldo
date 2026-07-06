import type { JSX, ReactNode } from "react";
import { NavLink } from "react-router";

type RouteLinkProps = {
  route: string;
  children: ReactNode;
  className?: string;
};

export function RouteLink({
  route,
  children,
  className = "",
}: RouteLinkProps): JSX.Element {
  const baseClass = `px-3 py-1 shadow-sm cursor-pointer focus:outline focus:outline-purple-400 focus:outline-offset-2 focus:shadow-none active:border-b transition-all duration-200 text-purple-400 border-x border-t border-b-4 border-purple-400 rounded-md text-sm md:text-base ${className}`;
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }): string => {
        if (isActive) {
          return `${baseClass} bg-purple-400 text-white`;
        } else {
          return baseClass;
        }
      }}
      to={route}
    >
      {children}
    </NavLink>
  );
}
