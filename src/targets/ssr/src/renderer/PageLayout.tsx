import type { FC, PropsWithChildren } from "react";

interface PageLayoutProps {
  pageContext: any;
}

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
  children,
  // pageContext,
}) => {
  return (
    <>
      <div>
        <a className="navitem" href="/">
          Home
        </a>
        <a className="navitem" href="/counter">
          Counter
        </a>
      </div>
      {children}
    </>
  );
};
