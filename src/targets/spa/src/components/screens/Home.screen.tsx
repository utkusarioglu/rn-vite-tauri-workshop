import { useNavigate } from "react-router-dom";
import { HomeScreen } from "xp-app/screens";

export const SpaHomeScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/counter")}>counter</button>
      <HomeScreen />
    </>
  );
};
