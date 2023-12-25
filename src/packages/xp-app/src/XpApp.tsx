import { useState } from "react";
import { Paragraph, DefaultButton, Section, H1 } from "elements";

export function XpApp() {
  const [count, setCount] = useState(0);

  const countOnPress = () => {
    setCount((current) => {
      const newCount = current + 1;
      console.log(`Setting the count to ${newCount}`);
      return newCount;
    });
  };

  return (
    <Section>
      <H1>Hi</H1>
      <Paragraph>Count: {count}</Paragraph>
      <DefaultButton onPress={countOnPress}>Increment</DefaultButton>
    </Section>
  );
}
