import { HStack, Text, VStack, Divider } from "native-base";
import { ReactElement } from "react";

interface Props {
  title: string;
  icon: ReactElement;
  children: React.ReactNode;
  withDivider?: boolean;
}

const FormSection = ({ title, icon, children, withDivider = true }: Props) => {
  return (
    <VStack space="3" pb="4">
      <HStack space={3} alignItems="center">
        {icon}
        <Text
          color="additional.medium"
          fontSize="md"
          fontWeight="bold"
          letterSpacing="lg"
        >
          {title}
        </Text>
      </HStack>
      {children}
      {withDivider ? <Divider height="0.5" /> : null}
    </VStack>
  );
};

export default FormSection;
