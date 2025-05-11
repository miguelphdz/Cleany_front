import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={{ backgroundColor: COLORS.white }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
