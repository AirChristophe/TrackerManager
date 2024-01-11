import { View, Pressable, StyleSheet, Text,Dimensions,PixelRatio } from "react-native";
import { TabRouter } from "@react-navigation/native";
import { Navigator, usePathname, Slot, Link } from "expo-router";
import { widthPixel,heightPixel, fontPixel,pixelSizeVertical,pixelSizeHorizontal} from './fontsize';

console.log("layout");

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://eee40f78fc3eb4bb091cffc7fe96629f@o338749.ingest.sentry.io/4506554246889472',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function HomeLayout() {
  return (
    /*
    <View style={{ margin: 40 }}>
      <Header />
      <Slot />
    </View>
    */
    <Navigator router={TabRouter}>
      <Header />
      <Slot />
    </Navigator>
  );
}




function Header() {
  const { navigation, state, descriptors, router } = Navigator.useContext();

  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <Link style={styles.menu_item} href="/">Home</Link>
        <Link style={styles.menu_item}  href="/profile">Profile</Link>
        <Link style={styles.menu_item}  href="/settings">Settings</Link>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    //justifyContent: "center",
    padding: 0,
    margin: 0,
    width:"100%",
    height:"5%",
    marginTop: 40,

    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#000000",
  },
  menu_item: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#014786",
    color:"#FFFFFF",
    padding: 5,    
    fontSize: fontPixel(25),

    //borderWidth: 1, 
    //borderStyle: "solid", 
    //borderColor: "#ff0000",
    
  },
});

