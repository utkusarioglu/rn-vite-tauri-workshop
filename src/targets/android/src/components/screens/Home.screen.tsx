import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { HomeScreen } from "xp-app/screens";

export const AndroidHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Button title="counter" onPress={() => navigation.push("counter")} />
      <HomeScreen />
    </>
  );
};
