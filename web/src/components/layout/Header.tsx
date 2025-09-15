import type { ReactNode } from "react";

interface HeaderProps {
  className?: string;
  title?: string | ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function Header({
  className,
  title,
  leftContent,
  rightContent,
}: HeaderProps) {
  return (
    <header className={`header ${className || ""}`}>
      <div className="header-top">
        <div className="btn-side-left">{leftContent}</div>
        <div className="page-title">{title}</div>
        <div className="btn-side">{rightContent}</div>
      </div>
    </header>
  );
}
