import type { FC, PropsWithChildren } from "react";

interface ScreenLayoutProps {}

export const ScreenLayout: FC<PropsWithChildren<ScreenLayoutProps>> = ({
  children,
}) => (
  <>
    {children}
    <div style={{ textAlign: "center", color: "#333333" }}>Linux</div>
  </>
);
