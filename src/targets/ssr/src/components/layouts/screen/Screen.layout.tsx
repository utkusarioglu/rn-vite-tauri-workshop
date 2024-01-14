import type { FC, PropsWithChildren } from "react";

interface ScreenLayoutProps {
  pageContext: any;
}

export const ScreenLayout: FC<PropsWithChildren<ScreenLayoutProps>> = ({
  children,
  // pageContext,
}) => {
  // console.log({ pageContext });
  return (
    <>
      {children}
      <div style={{ textAlign: "center", color: "#333333" }}>SSR</div>
    </>
  );
};
