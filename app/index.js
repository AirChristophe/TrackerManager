import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Link } from "expo-router";
import { fontPixel} from "./fontsize";
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
        <Link style={styles.link} href="/login">          
          <Text style={styles.item}>TEST 1</Text>
        </Link>     
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex:12,
    //backgroundColor: "#888555",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    width: "100%",
  },

  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
  },


  link: {
    padding: 10,
    paddingLeft: 30,
    margin: 5,
    backgroundColor: "#014786",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "#000000",
    width: "80%",
  },

  item: {
    backgroundColor: "#014786",
    color: "#FFFFFF",
    fontSize: fontPixel(28),
    alignItems: "center",
    justifyContent: "center",

  },
});
