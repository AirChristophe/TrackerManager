import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Pressable, Text, View, StyleSheet, FlatList } from "react-native";
import { router, Link } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { fontPixel } from "./fontsize";
import config from "config";
import Header from "../components/Header";

export default function App() {
  const [text, setText] = useState("");
  const [isWaitingVisible, setisWaitingVisible] = useState(false);
  const [isShowResultsVisible, setisShowResultsVisible] = useState(false);
  const [texts, setTexts] = useState([]);

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
    //console.log("TAKE PICTURE");
    if (cameraRef && cameraRef.current) {
      /*
      const supportedRatios = await cameraRef.current.getSupportedRatiosAsync();

      const pictureSizes = await Promise.all(
        supportedRatios.map((ratio) =>
          cameraRef.current.getAvailablePictureSizesAsync(ratio).catch(() => [])
        )
      );

      console.log(supportedRatios);
      console.log(pictureSizes);

      return false;
      */

      //console.log("processing");
      setisWaitingVisible(true);
      setisShowResultsVisible(false);
      const data = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
        //imageType: "jpg",
      });
      //console.log(data);
      //setImage(data.uri);

      /*
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
      */

      var myHeaders = new Headers();
      myHeaders.append("apikey", config.OCR_API_KEY);

      var formdata = new FormData();
      formdata.append("language", "eng");
      formdata.append("isOverlayRequired", "false");
      //formdata.append("url", url);
      formdata.append("base64image", "data:image/png;base64," + data?.base64);
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
      console.log(result);
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
          //setText(json?.ParsedResults[0]?.ParsedText);
          if (json?.ParsedResults[0]?.ParsedText == "") {
            setisWaitingVisible(false);
            setText("Failed");
            return;
          }
          if (json?.ParsedResults[0]?.ParsedText.split("\n").length == 0) {
            setisWaitingVisible(false);
            setText("Failed");
            return;
          }
          console.log("ParsedText : " + json?.ParsedResults[0]?.ParsedText);
          setTexts(json?.ParsedResults[0]?.ParsedText.split("\n"));
          console.log("texts : " + texts);
          setisShowResultsVisible(true);
        } else {
          setisWaitingVisible(false);
          setText("Failed");
        }
      } else {
        setisWaitingVisible(false);
        setText("Failed");
      }
    }
    setisWaitingVisible(false);
  };

  return (
    <>
      <Header title="tracker scanner text" action="/" />
      <View style={styles.container}>
        <Text style={styles.title}>Scan tracker</Text>
        <Camera
          pictureSize="640x480"
          ref={cameraRef}
          style={{
            //flex: 1,
            //flexDirection: "row",
            height: 300,
            width: 300,
            borderWidth: 1,
            borderColor: "red",
            marginVertical: 10,
          }}
        ></Camera>

        <Pressable style={styles.button} onPress={takePicture}>
          <Text style={styles.button_text}>Take Picture</Text>
        </Pressable>
        <View>
          <Text style={{ fontSize: fontPixel(20) }}>{text}</Text>
        </View>

        {isShowResultsVisible && (
          <FlatList
            style={styles.listing}
            keyExtractor={(item) => item}
            data={texts}
            renderItem={({ item }) => {
              const path = `/tracker_detail?name=${item}`;
              //console.log(path);
              return (
                <View style={styles.itemRow}>
                  <Link style={styles.link} href={path}>
                    <Text style={styles.item}>{item}</Text>
                  </Link>
                </View>
              );
            }}
          />
        )}

        {isWaitingVisible && <Text style={styles.message}>Processing...</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(30),
  },

  container: {
    flex: 12,
    //backgroundColor: "#888555",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    width: "100%",
  },

  button: {
    backgroundColor: config.COLOR_BUTTON,
    borderRadius: config.BUTTON_BORDER_RADIUS,
  },

  button_text: {
    color: "#FFFFFF",
    fontSize: 22,
    padding: 7,
  },
  message: {
    color: "#0d822c",
    fontSize: 20,
  },

  listing: {
    marginTop: 5,
    width: "100%",
    height: 20,
  },

  itemRow: {
    padding: 0,
    //margin: 5,
    //backgroundColor: "#014786",
    alignItems: "center",
    justifyContent: "center",
  },

  link: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    fontSize: fontPixel(22),
    color: "#014786",
  },
});
