import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Button,Pressable } from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./fontsize";
import config from "config";

export default function Page() {
  const params = useLocalSearchParams();
  console.log(params);

  const [datas, setDatas] = useState([]);

  const _affectTracker = async (tracker_name) => {
console.log("_affectTracker : tracker_name : " + tracker_name);    
    const url = "https://splanner.georacing.com/trackers/affectTrackerToEvent/" + params.id + "/" + tracker_name;
    const response = await fetch(url);
    const d = await response.json();
    console.log("_affectTracker : params.id : " + params.id);  
    _getTrackersOfEvent(params.id);
  };

  const _getTrackersOfEvent = async (event_id) => {
    const url = "https://splanner.georacing.com/trackers/getTrackersOfEvent/" + event_id;
    const response = await fetch(url);
    const d = await response.json();

    console.log(d);
    console.log("length : " + d.length);
    setDatas(d);
  };

  useEffect(() => {
    _getTrackersOfEvent(params.id);
  }, []);

  

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
//console.log("handleBarCodeScanned");
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//console.log("handleBarCodeScanned data : " + data);
    _affectTracker(data);

    
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params?.name}</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}  
      />
      {scanned && (
        <Button style={{ height: 80 }} title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
       <Text style={styles.text}>Nb trackers in Event</Text>
       <Text style={styles.text}>{datas.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
  },

  text: {
    color: "#000000",
    fontSize: fontPixel(18),
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
