import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Footer from "../Footer";

console.log("components layout");

function App(props) {
  return (
    <View
      style={{
        //display: "flex",
        //flexDirection: "column",
        //borderWidth: 1,
        //borderColor: "blue",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          //borderWidth: 1,
          //borderColor: "red",
        }}
      >
        {props.children}
      </View>
      <Footer />
    </View>
  );
}

export default App;
