import React, { useState, useEffect } from "react";
import {View,TextInput,StyleSheet,FlatList,Text,Pressable,} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import Moment from 'moment';
import { fontPixel} from "./fontsize";
import config from "config";
import { checkAuth } from "./check_auth";

export default function Page() {
  const params = useLocalSearchParams();
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [ isMessageVisible, setisMessageVisible ] = useState(false);
  const [ isShowMessageVisible, setisShowMessageVisible ] = useState(false);


  const [addMessage, setAddMessage] = useState("");

  const _showHideMessage =  () => {
   if (isShowMessageVisible)
    {
      setisShowMessageVisible(false);
    }
    else
    {
      setisShowMessageVisible(true);
    }
  };
  
  
  const _showMessage = async (message) => {
    setMsg(message);
    setisMessageVisible(true);
    setTimeout(() => {
      setisMessageVisible(false);
    }, config.DURATION_SHOW_MESSAGE);
  };

  const _fetchData = async () => {
//console.log("params.name : " + params.name);    
    if ( (params.name === undefined) && (params.name == "") )
    {
        return;
    }
    const url =
      "https://splanner.georacing.com/trackers/getTrackerDetailByName/" + params.name;
    const response = await fetch(url);
    const d = await response.json();
//console.log("--------");
//console.log(d);
    if (d.id === undefined)
    {
        return;
    }

//console.log("Id provider : " + d.id_provider_tracker);
console.log(d.sim_states);
    setSimStateValue(d.sim_state_id)
    setSimPlanValue(d.sim_plan_id)
    setData(d);
    setLoaded(true);
  };

  const _setQualityTracker = async (quality) => {
    //const url =
    //  "https://splanner.georacing.com/trackers/setTrackerValueByName/" + params.name + "/quality/" + quality;
    //const response = await fetch(url);
    //const d = await response.json();

    fetch("https://splanner.georacing.com/trackers/setTrackerValueById",
    { method: 'POST',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',}),
      body: "tracker_id=" + data.id + "&field=quality&value=" + quality
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
        _fetchData();
    }) 
    .catch((error) => {  
          console.error("error : " + error); 
          _showMessage(error);          
    }); 

    
  };

  const _addTrackerMessage = async () => {
//console.log("addMessage : " + params.name);    
//console.log("addMessage : " + data.id); 
    fetch("https://splanner.georacing.com/trackers/addTrackerManagementMessage",
    { method: 'POST',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',}),
      body: "tracker_id=" + data.id + "&message=" + addMessage
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
//alert(data);
        _fetchData();
        setisShowMessageVisible(false);
    }) 
    .catch((error) => {  
          console.error("error : " + error); 
          _showMessage(error);          
    }); 

  };

  const _delTrackerMessage = async (tracker_management_message_id) => {
//alert(tracker_management_message_id);    
    fetch("https://splanner.georacing.com/trackers/delTrackerManagementMessage",
    { method: 'POST',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',}),
      body: "tracker_management_message_id=" + tracker_management_message_id 
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
        _fetchData();
        setisShowMessageVisible(false);
    }) 
    .catch((error) => {  
          console.error("error : " + error); 
          _showMessage(error);          
    }); 

  };


  

  const _changeSimState = async (value) => { 
    setSimStateValue(value);

    fetch("https://splanner.georacing.com/trackers/setTrackerValueById",
    { method: 'POST',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',}),
      body: "tracker_id=" + data.id + "&field=sim_state_id&value=" + value
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
          _showMessage("Tracker updated");
    }) 
    .catch((error) => {  
          console.error("error : " + error); 
          _showMessage(error);          
    }); 
  }

  const _changeSimPlan = async (value) => { 
    setSimPlanValue(value);

    fetch("https://splanner.georacing.com/trackers/setTrackerValueById",
    { method: 'POST',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',}),
      body: "tracker_id=" + data.id + "&field=sim_plan_id&value=" + value
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
          _showMessage("Tracker updated");
    }) 
    .catch((error) => {  
          console.error("error : " + error); 
          _showMessage(error);          
    }); 

  }


  

  useEffect(() => {
    checkAuth();
    _fetchData();
  }, []);



  const [simStateValue, setSimStateValue] = useState(null);
  const [simPlanValue, setSimPlanValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ }}>
        <Text style={styles.title}>{data?.name}</Text>
      </View>
      <View style={{ }}>
        <Text style={[ (data?.quality == "VERYGOOD" || data?.quality == "GOOD" )   ? {color:"green"} : (data?.quality == "POOR" )   ? {color:"orange"} : {color:"red"} ,{fontSize: fontPixel(22),}  ]}> {data?.quality} </Text>    
      </View>
      {isMessageVisible && <Text style={styles.message}>{msg}</Text>}

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>ID Tracker</Text>
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

                      {(data?.quality != "VERYGOOD") && (
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('VERYGOOD')}>
                          <Text style={styles.button_text}>Very Good</Text>
                      </Pressable>
                      )}
                      {(data?.quality != "GOOD") && (
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('GOOD')}>
                          <Text style={styles.button_text}>Good</Text>
                      </Pressable>
                      )}
                      {(data?.quality != "POOR") && (
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('POOR')}>
                          <Text style={styles.button_text}>Poor</Text>
                      </Pressable>
                      )}
                      {(data?.quality != "BROKEN") && (
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('BROKEN')}>
                          <Text style={styles.button_text}>Broken</Text>
                      </Pressable>
                      )}
                      {(data?.quality != "CHECK") && (
                      <Pressable style={styles.button} onPress={() => _setQualityTracker('CHECK')}>
                          <Text style={styles.button_text}>Check</Text>
                      </Pressable>
                      )}

            
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>SIM ID</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
               {data?.sim_id} 
            </Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>SIM state</Text>
          </View>
          <View style={styles.right}>
            {loaded && (
            <Dropdown
              //style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              //iconStyle={styles.iconStyle}
              data={data.sim_states}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              //placeholder={!isFocus ? 'Select state' : '...'}
              placeholder={'Select state'}
              //searchPlaceholder="Search..."
              value={simStateValue}
              //onFocus={() => setIsFocus(true)}
              //onBlur={() => setIsFocus(false)}
              onChange={item => {                
                _changeSimState(item.id);
                //setIsFocus(false);
              }}
              />
              )}

          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>SIM Plan</Text>
          </View>
          <View style={styles.right}>
            {loaded && (
            <Dropdown
              //style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              //iconStyle={styles.iconStyle}
              data={data.sim_plans}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              //placeholder={!isFocus ? 'Select state' : '...'}
              placeholder={'Select plan'}
              //searchPlaceholder="Search..."
              value={simPlanValue}
              //onFocus={() => setIsFocus(true)}
              //onBlur={() => setIsFocus(false)}
              onChange={item => {
                _changeSimPlan(item.id);
                //setIsFocus(false);
              }}
              />
              )}
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>Next event</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
            {data?.next_event_start_time} - {data?.next_event} 
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text_left}>Last event</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text_right}>
            {data?.last_event_start_time} - {data?.last_event} 
            </Text>
          </View>
        </View>


        <View style={{ }}>
          <Text style={styles.title_message}>MESSAGES</Text>
        </View>
        <Pressable style={styles.button} onPress={() => _showHideMessage()}>
            <Text style={styles.button_text}>ADD</Text>
        </Pressable>
        {isShowMessageVisible && (        
          <TextInput
              style={styles.text_input}
              placeholder={"Message"}
              onChangeText={(e) => setAddMessage(e)}
              //value={login}
          />

         
        )}
        {isShowMessageVisible && ( 
        <Pressable style={styles.button} onPress={() => _addTrackerMessage()}>
            <Text style={styles.button_text}>OK</Text>
          </Pressable>
         )}

        <FlatList style={styles.listing}
        keyExtractor={(item) => item.tracker_management_messages.id}
        data={data.tracker_management_messages}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemDate}>{Moment(item.tracker_management_messages.created).format('YYYY-MM-DD')} </Text>
                <Text style={styles.itemText}>{item.tracker_management_messages.message}</Text>
                <Pressable style={styles.button_del} onPress={() => _delTrackerMessage(item.tracker_management_messages.id)}>
                  <Text style={styles.button_del_text}>DEL</Text>
                </Pressable>
              </View>

          </View>
        )}
      />

        
      
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
     
        marginLeft:5,
        backgroundColor: config.BG_COLOR_BUTTON,
        
        //borderWidth: 1, 
        //borderStyle: "solid", 
        //borderColor: "#FF0000",
      },
      button_text: {
        fontSize: fontPixel(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding:4,
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
    message: {
      color: "#0d822c",
      fontSize: 20,
    },

    title_message: {
      color: config.COLOR_TITLE,
    fontSize: fontPixel(25),
    },




    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width:200
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },



    listing: {
      marginTop:5,
      width: "100%",

      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "#000000",
    },
  
    itemRow: {
      padding: 0,
      //margin: 5,
      //backgroundColor: "#014786",
      alignItems: "left",
      justifyContent: "center",

      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "#000000",

      
    },
    itemDate: {
      flex:2,
      color: "#014786",
      fontSize: fontPixel(18),
    },
    itemText: {
      flex:5,
      color: "#014786",
      fontSize: fontPixel(22),
      flexShrink: 1
    },

    text_input: {

      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#000000",
      fontSize: fontPixel(25),
      padding: 5,
      marginBottom: 10,
      width:"80%",
      height:30
    },

    button_del: {
        margin:1,
        marginLeft:5,
        backgroundColor: "#b52316",        
      },
      button_del_text: {
        fontSize: fontPixel(15),
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin:4,
      },
});
