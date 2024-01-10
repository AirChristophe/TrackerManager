import { Slot } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ margin: 50 }}>
      <Slot />
    </View>
  );
}
