import {
  View,
  Pressable,
  Button,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { fontPixel } from "./fontsize";
import config from "config";
import * as SecureStore from "expo-secure-store";
import Layout from "../components/Layout";

export default function Page() {
  const [login, setLogin] = useState("");
  const [passwd, setPasswd] = useState("");
  const [msg, setMsg] = useState("");
  const [isMessageVisible, setisMessageVisible] = useState(false);

  // test a virer
  /*    
    const _fetchData = async () => {
      const url = "https://splanner.georacing.com/users/logout";
      const response = await fetch(url);

    };
*/
  useEffect(() => {
    //_fetchData();

    _loadLoginValues();
  }, []);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function _loadLoginValues() {
    let result = await SecureStore.getItemAsync("login");
    if (result) {
      setLogin(result);
    }
    result = await SecureStore.getItemAsync("passwd");
    if (result) {
      setPasswd(result);
    }
  }

  const _showMessage = async (message) => {
    setMsg(message);
    setisMessageVisible(true);
    setTimeout(() => {
      setisMessageVisible(false);
    }, config.DURATION_SHOW_MESSAGE);
  };

  const _login = async () => {
    //const url = "https://player.georacing.com/users/logout";
    //const responsevv = await fetch(url);
    if (login == "") {
      _showMessage("Login is required!");
      return;
    }
    if (passwd == "") {
      _showMessage("Passwd is required!");
      return;
    }

    save("login", login);
    save("passwd", passwd);

    fetch(
      "https://splanner.georacing.com/users/app_geotraker_management_login",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "login=" + login + "&password=" + passwd,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //setData(JSON.stringify(data));
        //console.log(data);
        // Si bon login, on redirige vers l'accueil
        if (data.state == 1) {
          global.user_id = data.user_id;
          global.user_type_id = data.user_type_id;
          router.push("/");
        }
        // Sinon on affiche le message
        else {
          _showMessage(data.message);
        }
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error("error : " + error);
      });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput
          style={styles.text_input}
          placeholder={"Login"}
          onChangeText={(e) => setLogin(e)}
          value={login}
        />
        <TextInput
          style={styles.text_input}
          secureTextEntry={true}
          placeholder={"Passwd"}
          onChangeText={(e) => setPasswd(e)}
          value={passwd}
        />

        <Pressable style={styles.button} onPress={() => _login()}>
          <Text style={styles.button_text}>LOGIN</Text>
        </Pressable>

        {isMessageVisible && <Text style={styles.message}>{msg}</Text>}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 12,
    //backgroundColor: "#888555",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    //width: "100%",
  },

  title: {
    color: config.COLOR_TITLE,
    fontSize: fontPixel(config.SIZE_TITLE),
  },
  text_input: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    fontSize: fontPixel(25),
    padding: 5,
    marginBottom: 10,
    width: "80%",
  },
  button: {
    backgroundColor: config.COLOR_BUTTON,
    borderRadius: config.BUTTON_BORDER_RADIUS,
  },

  button_text: {
    color: "#FFFFFF",
    fontSize: 22,
    padding: 8,
  },
  message: {
    color: "#FF0000",
    fontSize: 20,
  },
});
