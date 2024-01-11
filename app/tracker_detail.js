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
      "https://splanner.georacing.com/trackers/getTrackerDetailByName/QL001";
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
      <Text style={styles.title}>{data?.Tracker?.id_provider_tracker}</Text>
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
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    height: "100%",
    //alignItems: "center",
    //justifyContent: "center",
    //padding: 0,
    //margin: 0,
    //width: "100%",
  },
});
