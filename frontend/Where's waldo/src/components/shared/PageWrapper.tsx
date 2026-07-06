import type { JSX, ReactNode } from "react";

export function PageWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <main className="border-x col-start-1 col-end-2 sm:col-start-2 sm:col-end-3 border-gray-200 px-2.5 md:px-6 pt-12 md:pt-18 pb-6 row-start-2 row-end-3">
      {children}
    </main>
  );
}
