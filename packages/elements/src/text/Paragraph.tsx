import type { FC, PropsWithChildren } from "react";
import { Text } from "@tamagui/core";

interface ParagraphProps {}

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  children,
}) => {
  return <Text>{children}</Text>;
};
