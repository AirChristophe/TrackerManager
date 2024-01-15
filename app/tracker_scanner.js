import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TextInput,Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import { fontPixel} from "./fontsize";
import config from "config";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //router.replace('/tracker_detail');
    router.push({ pathname: "/tracker_detail", params: { name: data } });
  };

  const _goToTracker = () => {
    //alert(tracker_name);
    router.push({ pathname: '/tracker_detail', params: { name: text } });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan tracker</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      <Text style={styles.or}>OR</Text>

      <TextInput
        style={styles.text_input}
        placeholder={"Tracker name"}
        onChangeText={(e) => setText(e)}
        value={text}
      />
      <Pressable style={styles.button} onPress={_goToTracker}>
            <Text style={styles.button_text}>OK</Text>
        </Pressable>
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

  scanner: {
    width: 300,
    height: 300,
    margin: 20,
  },

  text_input: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    fontSize: fontPixel(25),
    padding: 5,
    marginBottom: 10,
  },

  or: {
    color: "#014786",
    fontSize: fontPixel(25),
    marginBottom: 10,
  },

  button: {
    backgroundColor:config.COLOR_BUTTON,
    borderRadius:config.BUTTON_BORDER_RADIUS
  },

  button_text: {
    color:"#FFFFFF",
    fontSize: 22,
    padding:7

  },

});
