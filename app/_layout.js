import { View, Button,Pressable, StyleSheet, Text,Dimensions,PixelRatio } from "react-native";
import { TabRouter } from "@react-navigation/native";
import { Navigator, usePathname, Slot, Link,router } from "expo-router";
import { widthPixel,heightPixel, fontPixel,pixelSizeVertical,pixelSizeHorizontal} from './fontsize';
console.log("layout");

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://eee40f78fc3eb4bb091cffc7fe96629f@o338749.ingest.sentry.io/4506554246889472',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});


const goBack = ({  }) => {
  //alert("Back");
  router.back();
};

const goHome = ({  }) => {
  router.push('/');
};

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
        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.text}>HOME</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goBack}>
          <Text style={styles.text}>BACK</Text>
        </Pressable>
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
    justifyContent: "center",
    //width:"100%",
    //height:"5%",
    marginTop: 40,

    //borderWidth: 1, 
    //borderStyle: "solid", 
    //borderColor: "#000000",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    //borderRadius: 4,
    //elevation: 3,
    backgroundColor: '#014786',
    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

