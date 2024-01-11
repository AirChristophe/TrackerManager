import React, { useState, useEffect } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { StyleSheet,View, FlatList, Text, Pressable } from "react-native";
import { widthPixel,heightPixel, fontPixel,pixelSizeVertical,pixelSizeHorizontal} from './fontsize';

export default function Page() {
  const [datas, setDatas] = useState([]);

  const _fetchData = async () => {
    const url = "http://0vh-player.georacing.com/datas/events.json";
    const response = await fetch(url);
    const d = await response.json();

    //console.log(d);
    setDatas(d);
  };

  useEffect(() => {
    _fetchData();    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={datas}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Link
              href={{
                pathname: "/event",
                // /* 1. Navigate to the details route with query params */
                params: { id: item.id, name: item.name },
              }}
            >
              <View>
                <Text>{item.name}</Text>
              </View>
            </Link>
          </View>
        )}
      />
    </View>
  );
}




const styles = StyleSheet.create({
  title: {
    color:"#014786",
    fontSize: fontPixel(35),
    marginTop: 20,
    marginBottom: 20,
  },

  container: {
    display: "flex",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    width:"100%"
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: "#014786",
    color:"#FF0000",
    fontSize: fontPixel(15),
    alignItems: 'center',
    justifyContent: "center",
    width:"100%"
  },
});