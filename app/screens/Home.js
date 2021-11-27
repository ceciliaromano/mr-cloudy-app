import React from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ImageBackground, Image} from 'react-native';

//Sección Home, debe incluir descripcion de la app, modo de uso, etc. (pendiente)
export default function Home() {
    return(
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>¡Bienvenido!</Text>
                <Image style={{flex: 1, alignSelf: 'center'}}source={require("../../assets/fondos/home2.gif")} resizeMode="center"/>
            </ImageBackground>
        </View>
    )}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#CBF9FF'
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 35,
    lineHeight: 84,
    marginTop: 50,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});