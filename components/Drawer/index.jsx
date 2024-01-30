/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { useWindowDimensions } from "react-native";

export default function App(props) {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        //width: width,
        //height: height - 102,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={[styles.container, { height: dimensions.height - 20 }]}>
        <View
          style={{
            padding: 15,
            paddingTop: Constants.statusBarHeight + 10,
            //paddingLeft: 15,
            backgroundColor: "green",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Georacing
          </Text>
        </View>

        <ScrollView bounces={true}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                props.hideModal();
              }}
            >
              <View style={styles.item}>
                <Ionicons name="md-settings" size={20} color={20} />
                <Text
                  style={[
                    styles.text,
                    {
                      color: "#000000",
                    },
                  ]}
                >
                  CLOSE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <View
            style={{
              backgroundColor: "#f2f2f2",
              width: "100%",
              displey: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.hideModal();
                props.logout();
                //onLogout()
                // dispatch(loginActions.logOut());
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign name="closecircleo" size={20} color="black" />

                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                  }}
                >
                  LOGOUT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {},

  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  icon: {
    color: "#7C7C7C",
    marginHorizontal: 10,
  },
  text: {
    color: "#7C7C7C",
    marginVertical: 12,
    paddingHorizontal: 10,
    textTransform: "uppercase",
  },
});
