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

import { fontPixel } from "./fontsize";
import config from "config";
import { checkAuth } from "./check_auth";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Page() {
  const params = useLocalSearchParams();
  //console.log(params);

  const [datas, setDatas] = useState([]);

  const _fetchData = async () => {
    const url =
      "https://splanner.georacing.com/events/getRacesByEvent/" + params?.id;
    const response = await fetch(url);
    const d = await response.json();
//console.log(d);
    setDatas(d);
  };

  useEffect(() => {
    checkAuth();
    _fetchData();
  }, []);

  return (
    <>
      <Layout>
        <Header title="Event" />
        <View style={styles.container}>
            <Text style={styles.title}>{params?.name}</Text>

            <View style={{ flexDirection: "row" }}>
            <Link
                style={styles.button}
                push
                href={{
                pathname: "/event_associate",
                params: { id: params?.id, name: params?.name },
                }}
            >
                <Text style={styles.text}>ASSOCIATE</Text>
            </Link>
            <Link
                style={styles.button}
                push
                href={{
                pathname: "/event_deliver",
                params: { id: params?.id, name: params?.name },
                }}
            >
                <Text style={styles.text}>DELIVER</Text>
            </Link>
            <Link
                style={styles.button}
                push
                href={{
                pathname: "/event_collect",
                params: { id: params?.id, name: params?.name },
                }}
            >
                <Text style={styles.text}>COLLECT</Text>
            </Link>

            
            </View>
            <View style={{}}>
                <Text style={{fontSize: fontPixel(22)}}>Races</Text>
            </View>

            <FlatList
            style={styles.listing}
            keyExtractor={(item) => item.R.id}
            data={datas}
            renderItem={({ item }) => (
                <View style={styles.itemRow}>
                <Link
                    push
                    href={{
                    pathname: "/actors_race",
                    // /* 1. Navigate to the details route with query params */
                    params: { id: item.R.id, name: item.R.name },
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                    <Text style={styles.itemDate}>{item.R.start_time} - </Text>
                    <Text style={styles.itemText}>{item.R.name}</Text>
                    </View>
                </Link>
                </View>
          )}
        />
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
    backgroundColor: config.BG_COLOR_MENU,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
    padding: 10,
    margin: 5,
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
});
