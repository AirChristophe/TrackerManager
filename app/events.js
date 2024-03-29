import React, { useState, useEffect } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { fontPixel } from "./fontsize";
import config from "config";
import { checkAuth } from "./check_auth";
import Header from "../components/Header";
import Layout from "../components/Layout";
//import { sayHello } from './MyFunctions';

export default function Page() {
  const [datas, setDatas] = useState([]);

  const _fetchData = async () => {
    //const url = "https://player.georacing.com/datas/events.json?app=1";
    // TODO a remplacer par variable globales mis a jor apres login
    //console.log("events user_id :" + global.user_id);
    const url =
      "https://splanner.georacing.com/events/getEventsByUser/" +
      global.user_id +
      "/" +
      global.user_type_id;
    const response = await fetch(url);
    const d = await response.json();
    console.log(d);
    setDatas(d);
  };

  useEffect(() => {
    checkAuth();
    _fetchData();
  }, []);

  return (
    <>
      <Layout>
      <Header title="Events" />
      <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
        <FlatList
          style={styles.listing}
          keyExtractor={(item) => item.E.id}
          data={datas}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Link
                push
                href={{
                  pathname: "/event_choice",
                  // /* 1. Navigate to the details route with query params */
                  params: { id: item.E.id, name: item.E.name },
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.itemDate}>{item.E.start_time} - </Text>
                  <Text style={styles.itemText}>{item.E.name}</Text>
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
    flex: 12,
    //backgroundColor: "#888555",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    width: "100%",
  },

  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
  },

  listing: {
    //width: "95%",
    //height:"60%",
    marginBottom: 10,
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: config.COLOR_TITLE,
    width: "100%",
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
