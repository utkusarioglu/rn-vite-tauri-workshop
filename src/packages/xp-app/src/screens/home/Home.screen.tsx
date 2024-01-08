import { Paragraph, Section, H1, DefaultButton } from "package--elements";
import { Navigation } from "package--xp-navigation";

export const HomeScreen = () => {
  return (
    <Section>
      <H1>Home</H1>
      <Paragraph>This is supposed to be the home screen</Paragraph>
      <DefaultButton onPress={() => Navigation.push("/counter")}>
        counter
      </DefaultButton>
    </Section>
  );
};
