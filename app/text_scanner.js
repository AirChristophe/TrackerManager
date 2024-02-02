import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Layout from "../components/Layout";

import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./fontsize";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleTextScanned = () => {
    console.log("handleTextScanned");
    setScanned(true);
    detectText();
  };

  detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      console.log("options : " + options);
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      alert("visionResp", visionResp);
    } catch (e) {
      console.warn(e);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
    <Layout>
      <Header title="Text scanner" />
      <View style={styles.container}>
        <Text style={styles.title}>Scan your text</Text>
        <Button onPress={handleTextScanned} title="Take"></Button>
      </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#014786",
    fontSize: fontPixel(30),
  },

  container: {
    display: "flex",
    //flex:1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    //height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    marginVertical: 40,
    width: "100%",
  },

  scanner: {
    width: 300,
    height: 400,
    margin: 20,
  },
});

/*


import RNTextDetector from "react-native-text-detector";
 
export class TextDetectionComponent extends PureComponent {
 
  detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      alert('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };
 
 
}

*/
