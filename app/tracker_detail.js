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
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./fontsize";

export default function Page() {
  const params = useLocalSearchParams();
  console.log(params);

  const [data, setData] = useState({});

  const _fetchData = async () => {
    const url =
      "https://splanner.georacing.com/trackers/getTrackerDetailByName/" + params.name;
    const response = await fetch(url);
    const d = await response.json();

    console.log(d);
    console.log("Id provider : " + d.Tracker.id_provider_tracker);
    setData(d);
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params?.name}</Text>
        <View style={styles.row}>
            <Text style={styles.text}>ID Provider</Text>
                <View style={styles.right}>
                    <Text style={styles.text}>
                    {data?.Tracker?.id_provider_tracker}
                    </Text>
                </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Quality</Text>
                <View style={styles.right}>
                    <Text style={styles.text}>
                    {data?.Tracker?.quality}
                    </Text>
                </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>SIM Provider</Text>
                <View style={styles.right}>
                    <Text style={styles.text}>
                    {data?.Tracker?.sim_provider}
                    </Text>
                </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>SIM Id</Text>
                <View style={styles.right}>
                    <Text style={styles.text}>
                    {data?.Tracker?.sim_id}
                    </Text>
                </View>
        </View>

        
      
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#014786",
    fontSize: fontPixel(25),
    marginVertical: 30,
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
    width: "100%",

  },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#01478650",
        width:"100%"
    },
    right: {
        display: "flex",
        flexDirection: "row",
        alignItems: "left",
        justifyContent: "left",
        flex:0.7
    },
    text: {
        color: '#014786',
        fontSize: fontPixel(18),
    },
});
