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
import config from "config";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracker Manager</Text>
      
        <Link style={styles.link} href="/events">          
          <Text style={styles.item}>Events</Text>
        </Link>
        <Link style={styles.link} href="/tracker_scanner">          
          <Text style={styles.item}>Scan tracker</Text>
        </Link>     
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
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


  link: {
    padding: 10,
    margin: 5,
    backgroundColor: "#014786",
    //color: "#FFFFFF",
    //fontSize: fontPixel(30),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "#000000",
    width: "80%",
  },

  item: {
    //padding: 10,
    //margin: 5,
    paddingLeft: 20,
    backgroundColor: "#014786",
    color: "#FFFFFF",
    fontSize: fontPixel(30),
    alignItems: "center",
    justifyContent: "center",

  },
});
