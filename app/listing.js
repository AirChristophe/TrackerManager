import React, { useState, useEffect } from "react";

import { View, FlatList, Text } from "react-native";
import { Link } from "expo-router";
import { useFocusEffect } from "expo-router";

export default function Page() {
  const [datas, setDatas] = useState([]);

  const _fetchData = async () => {
    const url = "http://0vh-player.georacing.com/datas/events.json";
    const response = await fetch(url);
    const d = await response.json();

    console.log(d);
    setDatas(d);
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <View>
      <Text>LISTING</Text>

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
            <Text>{item.name}</Text>
            <Text>{item.timezone}</Text>
            <Text>{item.sport}</Text>
          </View>
        )}
      />
    </View>
  );
}
