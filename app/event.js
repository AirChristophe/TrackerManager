import React, { useState, useEffect } from "react";
import { View,StyleSheet, FlatList, Text, Pressable } from "react-native";
import { Link, useFocusEffect,useLocalSearchParams } from "expo-router";
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    <View>
        <Text>{params?.name}</Text>
        <BarCodeScanner
          
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});