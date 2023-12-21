import { Paragraph, DefaultButton } from "elements";

export function XpApp() {
  return (
    <>
      <Paragraph>aaa2</Paragraph>
      <DefaultButton onPress={() => console.log("Works")}>
        Check console
      </DefaultButton>
    </>
  );
}
