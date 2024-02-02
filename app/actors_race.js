import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Pressable,
} from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { BarCodeScanner } from "expo-barcode-scanner";
import { fontPixel } from "./fontsize";
import config from "config";
import { checkAuth } from "./check_auth";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Page() {
  const params = useLocalSearchParams();
  //console.log(params);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [datas, setDatas] = useState([]);

  const [ isAlertVisible, setIsAlertVisible ] = useState(false);
  const [msg, setMsg] = useState('');
  const _showMessage = async () => {

    setIsAlertVisible(true);
    setTimeout(() => {
                 setIsAlertVisible(false);
              }, config.DURATION_SHOW_MESSAGE);
  }

  const selectActor = (actor_id) => {
    //alert(actor_id);
    if(selectedId === actor_id)
        setSelectedId(null)
    else
        setSelectedId(actor_id)
  };


  const _affectTracker = async (tracker_name) => {       
        const url = "https://splanner.georacing.com/trackers/affectTrackerToActor/" + params.id + "/" + selectedId + "/" + tracker_name;
        console.log("_affectTracker : url : " + url);         
        const response = await fetch(url);
        const d = await response.json();
        console.log("_affectTracker : selectedId : " + selectedId);  
//alert(d.message);
        setMsg(d.message);
        _showMessage(d.message);
    
        _fetchData();
      };


  const _fetchData = async () => {
    const url =
      "https://splanner.georacing.com/events/getActorsByRace/" + params?.id;
    const response = await fetch(url);
    const d = await response.json();
//console.log(d);
    setDatas(d);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (selectedId == null)
    {
        alert("You must select a participant first !");
        return;
    }
    _affectTracker(data); 
  };

  useEffect(() => {
    checkAuth();

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      };
  
    getBarCodeScannerPermissions();

    _fetchData();
  }, []);

  return (
    <>
      <Layout>
        <Header title="Event" />
        <View style={styles.container}>
            <Text style={styles.title}>{params?.name}</Text>            
            <View style={{}}>
                <Text style={{fontSize: fontPixel(22)}}>Participants</Text>
            </View>

            <FlatList
            style={styles.listing}
            keyExtractor={(item) => item.A.id}
            data={datas}
            renderItem={({ item }) => (
                <View style={styles.itemRow}>
                    <Pressable style={item.A.id == selectedId ? styles.button_selected : styles.button} onPress={() => selectActor(item.A.id)}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.itemDate}>{item.A.start_number} - </Text>
                            <Text style={styles.itemText}>{item.A.name} - </Text>
                            <Text style={styles.itemText}>{item.T.tracker_name}</Text>
                        </View>
                    </Pressable>
                </View>
            )}
            />

            {isAlertVisible && <Text style={styles.message}>{msg}</Text>}
            <Text style={{fontSize: fontPixel(25),}}>Scan tracker</Text>
            <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.scanner}
            />
            {scanned && (
            <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
            />
        )}
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    //backgroundColor: "#888555",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    width: "100%",

    //borderWidth: 1,
    //borderColor: "red",
  },

  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
    padding: 5,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    //borderRadius: 4,
    //elevation: 3,
    backgroundColor: "#014786",
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: "#FFFFFF",
  },

  button_selected: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    //borderRadius: 4,
    //elevation: 3,
    backgroundColor: "#16520d",
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: "#FFFFFF",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  message: {
    color: "#FF0000",
    fontSize:  fontPixel(20),
  },

  listing: {
    //width: "95%",
    //height:"60%",
    marginBottom: 10,
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: config.COLOR_TITLE,
    width: "90%",
  },

  itemRow: {
    padding: 4,
    margin: 4,
    backgroundColor: "#014786",
    alignItems: "left",
    justifyContent: "center",
    //width: "100%",
    //flexShrink: 1
  },
  itemDate: {
    //backgroundColor: "#111111",
    color: "#FFFFFF",
    fontSize: fontPixel(18),
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: fontPixel(20),
    //flex:1,
    //flexWrap: 'wrap',
    flexShrink: 1,
  },

  scanner: {
    width: 300,
    height: 200,
    margin: 20,
  },
});
