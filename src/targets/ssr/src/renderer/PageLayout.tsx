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
      {children}
      <div style={{ textAlign: "center" }}>- end of page -</div>
    </>
  );
};
