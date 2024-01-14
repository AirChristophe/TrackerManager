import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./fontsize";
import config from "config";

export default function Page() {
  const params = useLocalSearchParams();
  const [data, setData] = useState({});

  const _fetchData = async () => {
    const url =
      "https://splanner.georacing.com/trackers/getTrackerDetailByName/" + params.name;
    const response = await fetch(url);
    const d = await response.json();

//console.log(d);
//console.log("Id provider : " + d.id_provider_tracker);

    setData(d);
  };

  const _setQualityTracker = async (quality) => {
    const url =
      "https://splanner.georacing.com/trackers/setTrackerQualityByName/" + params.name + "/" + quality;
    const response = await fetch(url);
    const d = await response.json();

    _fetchData();
  };


  

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.name}</Text>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>ID Provider</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.id_provider_tracker} 
            </Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>Quality</Text>
          </View>
          <View style={styles.right}>

            <Text style={styles.text_right}>
                    {data?.quality} 
                    </Text>             
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('POOR')}>
                          <Text style={styles.button_text}>Poor</Text>
                      </Pressable>
    
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('GOOD')}>
                          <Text style={styles.button_text}>Good</Text>
                      </Pressable>

            
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>SIM Provider</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.sim_provider} 
            </Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>SIM Id</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.sim_id} 
            </Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>Next event</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.next_event} 
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>Last event</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.last_event} 
            </Text>
          </View>
        </View>

        
      
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

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#01478650",
        width:"100%",
        //height:"10%",

        //borderWidth: 1,
        //borderStyle: "solid",
        //borderColor: "#000000",
    },

    left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex:0.3,
      backgroundColor: '#014786',
     height:"100%"
  },
    right: {
        display: "flex",
        flexDirection: "row",
        alignItems: "left",
        justifyContent: "left",
        flex:0.7,
        backgroundColor: 'white',
        paddingLeft:10
    },
    button: {
      //flexDirection: "row",
        //alignItems: 'center',
        //justifyContent: 'center', 
     
        margin:5,
        backgroundColor: config.BG_COLOR_BUTTON,
        
        //borderWidth: 1, 
        //borderStyle: "solid", 
        //borderColor: "#FF0000",
      },
      button_text: {
        fontSize: fontPixel(21),
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding:5,
      },
      text_right: {
        fontSize: fontPixel(18),
        fontWeight: 'bold',
        color: '#014786',
        padding:5,
      },

      text_left: {
        //display: "flex",
        //flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
       
        color:"white",
        //height:"100%",

        //borderWidth: 1,
        //borderStyle: "solid",
        //borderColor: "#FF0000",
    },
});
