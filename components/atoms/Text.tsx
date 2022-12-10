import { ReactNode } from "react";

import { clsx } from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

function H1({ children, className }: Props) {
  return (
    <h1 className={clsx(className, "text-4xl font-semibold mt-6 mb-12")}>
      {children}
    </h1>
  );
}

function H2({ children }: Props) {
  return <h2>{children}</h2>;
}

export { H1, H2 };
