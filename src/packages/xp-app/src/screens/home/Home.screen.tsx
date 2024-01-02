import { Paragraph, Section, H1 } from "elements";

console.log({ env: process.env });

export const HomeScreen = () => {
  return (
    <Section>
      <H1>Home</H1>
      <Paragraph>This is supposed to be the home screen</Paragraph>
    </Section>
  );
};
