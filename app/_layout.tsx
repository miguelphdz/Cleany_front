import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={{backgroundColor:COLORS.white}}>
        <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.white}}>
          <Stack screenOptions={{ headerShown: false}}>
         </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    
)
}
