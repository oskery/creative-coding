import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function H1({ children }: Props) {
  return <h1 className="text-4xl font-semibold mt-6 mb-12">{children}</h1>;
}

function H2({ children }: Props) {
  return <h2>{children}</h2>;
}

export { H1, H2 };
