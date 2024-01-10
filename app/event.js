import React, { useState, useEffect } from "react";

import { View, FlatList, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const params = useLocalSearchParams();
  console.log(params);

  const { event } = useLocalSearchParams();
  return (
    <View>
      <Text>EVENT {params?.name}</Text>
    </View>
  );
}
