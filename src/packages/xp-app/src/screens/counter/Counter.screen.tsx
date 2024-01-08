import { useState } from "react";
import { Paragraph, DefaultButton, Section, H1 } from "package--elements";
import { Navigation } from "package--xp-navigation";

function useCounter(startValue: number) {
  const [count, setCount] = useState(startValue);

  const incrementOnPress = () => {
    console.log("increment");
    setCount((current) => ++current);
  };
  const decrementOnPress = () => {
    console.log("decrement");
    setCount((current) => --current);
  };

  return {
    count,
    increment: incrementOnPress,
    decrement: decrementOnPress,
  };
}

export function CounterScreen() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <Section>
      <H1>Counter</H1>
      <Paragraph>Count: {count}</Paragraph>
      <DefaultButton onPress={increment}>Increment</DefaultButton>
      <DefaultButton onPress={decrement}>decrement</DefaultButton>
      <DefaultButton onPress={() => Navigation.push("/")}>home</DefaultButton>
    </Section>
  );
}
