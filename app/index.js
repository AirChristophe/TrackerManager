import { View, Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Home page</Text>
      <Link href="/events">Events</Link>
      <Link href="/page1">Page 1</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
  },
  item: {
    backgroundColor: "pink",
    padding: 10,
  },
});
