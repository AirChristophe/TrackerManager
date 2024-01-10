import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { View, FlatList, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useFocusEffect } from "expo-router";

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
    <View>
      <Text>EVENTS</Text>

      <FlatList
        keyExtractor={(item) => item.id}
        data={datas}
        renderItem={({ item }) => (
          <View
            style={{
              //height: 50,
              borderBottomColor: "#CCCCCC",
              borderBottomWidth: 1,
              marginBottom: 5,
              padding: 5,
            }}
          >
            <Link
              href={{
                pathname: "/event",
                // /* 1. Navigate to the details route with query params */
                params: { id: item.id, name: item.name },
              }}
            >
              <View>
                <Text>{item.name}</Text>
                <Text>{item.start_time}</Text>
              </View>
            </Link>
          </View>
        )}
      />
    </View>
  );
}