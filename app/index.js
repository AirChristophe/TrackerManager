import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Link } from "expo-router";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./fontsize";
import config from "../config";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracker Manager</Text>
      <View style={styles.menu}>
        <Link style={styles.item} href="/events">
          Events
        </Link>
        <Link style={styles.item} href="/tracker_scanner">
          Scan tracker
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: config.COLOR1,
    fontSize: fontPixel(35),
    marginTop: 20,
    marginBottom: 20,
  },

  container: {
    display: "flex",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  menu: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: "#014786",
    color: "#FFFFFF",
    fontSize: fontPixel(30),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    width: "100%",
  },
});
