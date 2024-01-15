import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Button,Pressable } from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { BarCodeScanner } from "expo-barcode-scanner";

import { fontPixel} from "./fontsize";
import config from "config";
import { checkAuth } from "./check_auth";

export default function Page() {
  const params = useLocalSearchParams();
//console.log(params);

  const [datas, setDatas] = useState([]);


  const _affectTracker = async (tracker_name) => {
console.log("_affectTracker : tracker_name : " + tracker_name);    
    const url = "https://splanner.georacing.com/trackers/affectTrackerToEvent/" + params.id + "/" + tracker_name;
    const response = await fetch(url);
    const d = await response.json();
    console.log("_affectTracker : params.id : " + params.id);  
    //alert(d.message);
    setMsg(d.message);
    _showMessage(d.message);

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
    checkAuth();
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



  const [ isAlertVisible, setIsAlertVisible ] = useState(false);
  const [msg, setMsg] = useState('');
  const _showMessage = async () => {

    setIsAlertVisible(true);
    setTimeout(() => {
                 setIsAlertVisible(false);
              }, 2000);
  }



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
        <Pressable style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.button_text}>Tap to Scan Again</Text>
        </Pressable>
      )}
      {isAlertVisible && <Text style={styles.message}>{msg}</Text>}

       <Text style={styles.text}>Nb trackers in Event : {datas.length}</Text>

       <FlatList style={styles.listing}
        keyExtractor={(item) => item.id}
        data={datas}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:10,
    //backgroundColor: "#888555",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    width: "100%",
  },

  title: {
    color: config.COLOR_TITLE,
    fontSize: 20,
  },

  message: {
    color: "#FF0000",
    fontSize: 20,
  },

  listing: {
    //marginBottom:10,
    //marginLeft:"5%",
    //alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    //height: 50,
  },
  itemRow: {
    //padding: 10,
    //margin: 5,
    //color: "#014786",
    alignItems: "center",
    justifyContent: "center",
    //width: "100%",
    //flexShrink: 1
    
  },

  itemText: {
    color: "#014786",
    fontSize: fontPixel(20),
  },

  button: {
    backgroundColor:config.COLOR_BUTTON,
    borderRadius:config.BUTTON_BORDER_RADIUS
  },

  button_text: {
    color:"#FFFFFF",
    fontSize: 16,
    padding:5

  },


  text: {
    color: "#000000",
    fontSize: fontPixel(18),
  },

  
  scanner: {
    width: 300,
    height: 300,
    margin: 10,

  },
});
