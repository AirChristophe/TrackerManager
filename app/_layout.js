import { View, Button,Pressable, StyleSheet, Text,Dimensions,PixelRatio } from "react-native";
import { TabRouter } from "@react-navigation/native";
import { Navigator, usePathname, Slot, Link,router } from "expo-router";
import { widthPixel,heightPixel, fontPixel,pixelSizeVertical,pixelSizeHorizontal} from './fontsize';
import config from "config";

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
    <Navigator style={styles.container} router={TabRouter}>
      <Header />
      <Slot />
      <Footer />

    </Navigator>
  );
}




function Header() {
  const { navigation, state, descriptors, router } = Navigator.useContext();

  const pathname = usePathname();

  return (
    <View style={styles.header}>
      <View style={{flexDirection: "row"}}>
        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.text}>HOME</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goBack}>
          <Text style={styles.text}>BACK</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>V {config.VERSION}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Footer() {

  return (
    <View style={styles.footer}>
      <Text style={styles.text_footer}>V {config.VERSION}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //width:"100%",
    //height:"100%",
    margin:50,
    padding:50,
    borderWidth: 5, 
    borderStyle: "solid", 
    borderColor: "#000000",
    backgroundColor: "red",
    
  },

  header: {
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    //width:"100%",
    //height:"5%",
    marginTop: 60,

    //borderWidth: 1, 
    //borderStyle: "solid", 
    //borderColor: "#000000",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    //width:"100%",
    //height:"5%",
    

    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#000000",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    //borderRadius: 4,
    //elevation: 3,
    backgroundColor: config.BG_COLOR_MENU,
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
  text_footer: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color:config.COLOR_FOOTER,
  },

  test: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    width:"100%",
    color:config.COLOR_FOOTER,
  },
});

