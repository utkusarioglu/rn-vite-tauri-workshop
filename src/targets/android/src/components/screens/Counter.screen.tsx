import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { CounterScreen } from "xp-app/screens";

export const AndroidCounterScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Button title="home" onPress={() => navigation.push("home")} />
      <CounterScreen />
    </>
  );
};
