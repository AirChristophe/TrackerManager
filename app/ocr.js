import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { fontPixel } from "./fontsize";

export default function App() {
  const [text, setText] = useState("");

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = React.useRef(null);

  console.log(permission);

  if (permission === null) {
    requestPermission();
    return <Text>Requesting for camera permission</Text>;
  }
  if (permission?.status !== "granted") {
    requestPermission();
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    console.log("TAKE PICTURE");
    if (cameraRef && cameraRef.current) {
      console.log("processing");
      const data = await cameraRef.current.takePictureAsync({
        base64: true,
        //quality: 0,
        //imageType: "jpg",
      });
      //console.log(data);
      //setImage(data.uri);

      const body = {
        base64: "data:image/png;base64," + data?.base64,
      };

      const u = "https://apiv2regioneo.foound.com/ocr";
      const resss = await fetch(u, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const path = await resss.text();
      console.log(u);
      console.log(path);

      //return false;

      const url = "https://apiv2regioneo.foound.com" + path;
      console.log(url);

      var myHeaders = new Headers();
      myHeaders.append("apikey", "K88936629588957");

      var formdata = new FormData();
      formdata.append("language", "eng");
      formdata.append("isOverlayRequired", "false");
      formdata.append("url", url);
      formdata.append("iscreatesearchablepdf", "false");
      formdata.append("issearchablepdfhidetextlayer", "false");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.ocr.space/parse/image",
        requestOptions
      );
      const result = await response.text();
      //console.log(result);
      //console.log(typeof result);

      if (typeof result === "string") {
        const json = JSON.parse(result);
        //console.log(json);
        //console.log(typeof json);
        console.log(11111);
        console.log(typeof json?.ParsedResults);
        console.log(json?.ParsedResults);
        console.log(json?.ParsedResults[0]);
        if (
          typeof json?.ParsedResults === "object" &&
          typeof json?.ParsedResults[0] === "object" &&
          typeof json?.ParsedResults[0]?.ParsedText === "string"
        ) {
          setText(json?.ParsedResults[0]?.ParsedText);
        } else {
          setText("failed");
        }
      } else {
        setText("failed");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={{
          //flex: 1,
          //flexDirection: "row",
          height: 400,
          width: 400,
          borderWidth: 1,
          borderColor: "red",
          marginVertical: 10,
        }}
      ></Camera>

      <Button title="Take Picture" onPress={() => takePicture()} />

      <View>
        <Text>{text}</Text>
      </View>
    </View>
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
