import { Stack } from "expo-router";
import Header from "../components/header";
import { Text } from "react-native";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout() {
  return <LanguageProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Header />,
        }}
      />
    </Stack>
  </LanguageProvider>;
}
