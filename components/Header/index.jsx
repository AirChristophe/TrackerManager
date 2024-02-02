import React, { useState, useEffect } from "react";
import {
  useWindowDimensions,
  Pressable,
  View,
  StyleSheet,
  Text,
} from "react-native";


import { fontPixel } from "../../app/fontsize";
import config from "config";
import { Link,router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Drawer from "../Drawer";


function App(props) {
  const { action, title } = props;

  const [drawerStatus, setDrawerStatus] = useState(false);

  const dimensions = useWindowDimensions();

  const goBack = ({}) => {
    //alert("Back");

    console.log(11111);
    console.log(router.canGoBack());
    router.back();
  };

  const goHome = ({}) => {
    router.push("/");
  };

  const logout = async () => {
    console.log("logout");
    const url = "https://splanner.georacing.com/users/logout";
    const response = await fetch(url);
    router.push("/login");
  };

  const _getBackItem = () => {
    if (action == null) {
      return (
        <Pressable
          style={
            {
              //borderWidth:1,
              //borderColor:'#00f'
            }
          }
          onPress={() => {
            //router.push(action);
            router.back();
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              minWidth: 130,
              height: 60,
            }}
          >
            <Ionicons
              style={{
                color: "#FFFFFF",
                fontSize: 32,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              name="chevron-back"
            />
          </View>
        </Pressable>
      );
    }

    return <View></View>;
  };

  return (
    <>
      {drawerStatus === true && (
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          //transparent={true}
          backdropOpacity={0}
          isVisible={true}
          onBackdropPress={() => {
            //setModalVisible(false)
            //dispatch(drawerActions.setDrawer(false));
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            marginTop: 0,
            marginBottom: 0,

            marginLeft: dimensions.width - 320,
            //borderWidth: 3,
            //borderColor: 'red',
            //width: '70%',
            padding: 0,
            // marginLeft: 0
            margin: 0,
          }}
        >
          <Drawer
            hideModal={() => {
              setDrawerStatus(!drawerStatus);
            }}
            logout={logout}
          />
        </Modal>
      )}

      <View
        style={{
          backgroundColor: "#014786",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 40,
          justifyContent: "space-between",
          marginTop:40,
          marginBottom:20,
          //borderWidth: 1,
          //borderColor: "red",
        }}
      >
        <View
          style={{
            padding: 0,
            flex:1
          }}
        >
        {_getBackItem()}
        </View>

        <View
          style={{
            padding: 0,
            flex:4,
            alignItems: "center",
            //justifyContent: "flex-start",

            //borderWidth: 1,
            //borderColor: "green",
          }}
        >
          <Text
            bold
            style={{
              color: "#FFFFFF",
              fontSize: fontPixel(25),
            }}
          >
            <Link href="/">HOME</Link>
          </Text>
        </View>

        <Pressable
        style={{
          flex:1
        }}
          onPress={() => {
            //setModalVisible(true)
            //dispatch(drawerActions.setDrawer(true));
          }}
        >
          <View
            style={{
              //backgroundColor: Colors.COLOR2,
              padding: 0,
              margin: 0,
              minWidth: 60,
              height: 60,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              opacity: props.hideMenu ? 0 : 1,
              //borderWidth: 1,
              //borderColor: 'red',
            }}
          >
            <Pressable
              onPress={() => {
                setDrawerStatus(!drawerStatus);
              }}
            >
              <Ionicons
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                name="menu"
              />
            </Pressable>
          </View>
        </Pressable>
      </View>
    </>
  );

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.text}>HOME</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goBack}>
          <Text style={styles.text}>BACK</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.text}>LOGOUT</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: "#000000",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    //borderRadius: 4,
    //elevation: 3,
    backgroundColor: config.BG_COLOR_MENU,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
