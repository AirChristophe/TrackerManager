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

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Header title="Event" action="/events" />
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
    width: "90%",
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
});
