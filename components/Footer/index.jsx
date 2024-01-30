import React from "react";
import { View, StyleSheet, Text } from "react-native";
import config from "config";

function App(props) {
  return (
    <View style={styles.footer}>
      <Text style={styles.text_footer}>GeoRacing - V{config.VERSION}</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  footer: {
    //flex: 1,
    //display: "flex",
    //flexDirection: "row",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  text_footer: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: config.COLOR_FOOTER,
  },
});
