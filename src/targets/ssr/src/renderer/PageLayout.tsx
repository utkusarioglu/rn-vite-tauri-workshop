import type { FC, PropsWithChildren } from "react";

interface PageLayoutProps {
  pageContext: any;
}

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
  children,
  // pageContext,
}) => {
  // console.log({ pageContext });
  return (
    <>
      {children}
      <div style={{ textAlign: "center" }}>- end of page -</div>
    </>
  );
};
