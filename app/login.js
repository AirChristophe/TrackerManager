import {
    View,
    Pressable,
    Button,
    StyleSheet,
    Text,
    TextInput
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { router } from "expo-router";
  import { fontPixel} from "./fontsize";
  import config from "config";
  
  export default function Page() {

    const [login, setLogin] = useState("");
    const [passwd, setPasswd] = useState("");
    const [msg, setMsg] = useState("");
    const [ isMessageVisible, setisMessageVisible ] = useState(false);


    // test a virer
    
    const _fetchData = async () => {
      const url = "https://splanner.georacing.com/users/logout";
      const response = await fetch(url);

    };
  
    useEffect(() => {
      _fetchData();
    }, []);




    const _login = async () => {

          //const url = "https://player.georacing.com/users/logout";
          //const responsevv = await fetch(url);

          fetch("https://splanner.georacing.com/users/app_geotraker_management_login",
          { method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "login=" + login + "&password=" + passwd

          }) 
            .then((response) => response.json()) 
            .then((data) => { 
                //setData(JSON.stringify(data)); 
                console.log(data); 
                           
                if (data.state == 1)
                {
                    router.push("/");
                }
                else
                {
                  setMsg(data.message);
                  setisMessageVisible(true);
                }
            }) 
            .catch((error) => { 
                // Handle any errors that occur 
                console.error("error : " + error); 
            }); 
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

        <Pressable style={styles.button} onPress={() => _login()}>
            <Text style={styles.button_text}>LOGIN</Text>
        </Pressable>

        {isMessageVisible && <Text style={styles.message}>{msg}</Text>}
            
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
    

      button: {
        backgroundColor:config.COLOR_BUTTON,
        borderRadius:config.BUTTON_BORDER_RADIUS
      },
    
      button_text: {
        color:"#FFFFFF",
        fontSize: 22,
        padding:8
    
      },
      message: {
        color: "#FF0000",
        fontSize: 20,
      },
  });
  