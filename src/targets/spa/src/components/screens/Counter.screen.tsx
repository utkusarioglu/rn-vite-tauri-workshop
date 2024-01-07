import { useNavigate } from "react-router-dom";
import { CounterScreen } from "xp-app/screens";

export const SpaCounterScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/")}>home</button>
      <CounterScreen />
    </>
  );
};
