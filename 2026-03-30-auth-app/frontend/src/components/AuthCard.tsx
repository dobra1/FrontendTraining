import { type ReactNode } from "react";

type PropsWithChildren = { children: ReactNode; title: string };

function AuthCard({ children, title }: PropsWithChildren) {
  return (
    <div className="auth-card">
      <h2>{title}</h2>
      <div className="auth-content">{children}</div>
    </div>
  );
}

export default AuthCard;
