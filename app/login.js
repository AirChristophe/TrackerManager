import {
    View,
    Pressable,
    Button,
    StyleSheet,
    Text,
    TextInput
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Link } from "expo-router";
  import {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
  } from "./fontsize";
  import config from "config";
  
  export default function Page() {

    const [login, setLogin] = useState("");
    const [passwd, setPasswd] = useState("");

    const _login = async () => {
        

        const response = await fetch('https://splanner.georacing.com/users/app_geotraker_management_login/', {
            method: 'POST',
            //headers: {
            //    Accept: 'application/json',
            //    'Content-Type': 'application/json',
            //},
            body: JSON.stringify({
                "data[User][email]": login,
                "data[User][password]": passwd,
            }),
            });

            //const response = await fetch('https://splanner.georacing.com/users/app_geotraker_management_login');
            //const response = await fetch("http://0vh-player.georacing.com/datas/events.json");
console.log("---------------LLL -----");             
//console.log(response.text()); 
//alert(response.text());
        const d = await response.json();
console.log(d);        
        
      };


    return (
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
        <Button style={styles.button_ok} onPress={_login} title="LOGIN" />
            
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
  



    text_input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000",
        fontSize: fontPixel(25),
        padding: 5,
        marginBottom: 10,
        width:"80%"
      },
    

      button_ok: {
        backgroundColor: "#014786",
        fontSize: fontPixel(25),
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding:5,
      },
  });
  