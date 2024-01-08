import type { FC, PropsWithChildren } from "react";
type ScreenWrapperProps = PropsWithChildren;
import { useNavigate } from "react-router-dom";
import { Navigation } from "package--xp-navigation";

Navigation.setPathTransformer((path, options = {}) => ({ path, options }));

export const ScreenWrapper: FC<ScreenWrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  Navigation.setHandlers({
    push: navigate,
  });

  return <>{children}</>;
};
