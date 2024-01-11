import React, { useState, useEffect } from "react";
import { View,StyleSheet, FlatList, Text, Pressable } from "react-native";
import { Link, useFocusEffect,useLocalSearchParams } from "expo-router";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { widthPixel,heightPixel, fontPixel,pixelSizeVertical,pixelSizeHorizontal} from './fontsize';

export default function Page() {
  const params = useLocalSearchParams();

console.log(params);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
  console.log("handleBarCodeScanned");    
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  


  return (
    <View style={styles.container}>
        <Text style={styles.title}>{params?.name}</Text>
        <BarCodeScanner
          
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        
    </View>
  );
}



const styles = StyleSheet.create({
  title: {
    color:"#014786",
    fontSize: fontPixel(25),
    marginTop: 20,
    marginBottom: 20,
  },

  container: {
    display: "flex",
    //backgroundColor: "#ffff44",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    width:"100%"
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: "#014786",
    color:"#FF0000",
    fontSize: fontPixel(15),
    alignItems: 'center',
    justifyContent: "center",
    width:"100%"
  },
});