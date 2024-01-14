import type { FC, PropsWithChildren } from "react";

interface PageLayoutProps {}

export const ScreenLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      {children}
      <div style={{ textAlign: "center", color: "#333333" }}>SPA</div>
    </>
  );
};
