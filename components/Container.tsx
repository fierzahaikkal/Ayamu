import { YStack } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack
      paddingVertical="$12"
      paddingHorizontal="$6"
      gap="$6"
      alignItems="center"
      justifyContent="center">
      {children}
    </YStack>
  );
};
