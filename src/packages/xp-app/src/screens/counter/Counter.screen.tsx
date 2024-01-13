import { useState } from "react";
import type { FC } from "react";
import { Paragraph, DefaultButton, Section, H1 } from "package--elements";
import { Navigation } from "package--xp-navigation";

function useCounter(initialValue: number) {
  const [count, setCount] = useState(initialValue);

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

export interface CounterScreenProps {
  initialValue: number;
  hash?: string;
}

export const CounterScreen: FC<CounterScreenProps> = ({
  initialValue,
  hash = "",
}) => {
  const { count, increment, decrement } = useCounter(initialValue);
  console.log({ hash });

  return (
    <Section>
      <H1>Counter</H1>
      <Paragraph>Count: {count}</Paragraph>
      <DefaultButton onPress={increment}>Increment</DefaultButton>
      <DefaultButton onPress={decrement}>decrement</DefaultButton>
      <DefaultButton onPress={() => Navigation.push("/")}>home</DefaultButton>
    </Section>
  );
};
