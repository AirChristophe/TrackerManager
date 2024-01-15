import React, { useState, useEffect } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { fontPixel} from "./fontsize";
import config from "config";

export default function Page() {
  const [datas, setDatas] = useState([]);

  const _fetchData = async () => {
    const url = "https://player.georacing.com/datas/events.json?app=1";
    const response = await fetch(url);
    const d = await response.json();
    const da = d.slice(0, 2);

    //console.log(d);
    setDatas(da);
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList style={styles.listing}
        keyExtractor={(item) => item.id}
        data={datas}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Link
              href={{
                pathname: "/event",
                // /* 1. Navigate to the details route with query params */
                params: { id: item.id, name: item.name },
              }}
            >
              <View>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  

  container: {
    flex:12,
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
    marginBottom:10,
    //borderWidth: 1, 
    //borderStyle: "solid", 
    //borderColor: config.COLOR_TITLE,
  },

  itemRow: {
    padding: 10,
    margin: 5,
    backgroundColor: "#014786",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: fontPixel(20),
  },
});
