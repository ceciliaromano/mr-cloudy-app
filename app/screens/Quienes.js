import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ImageBackground} from "react-native";

export default function Quienes(){
    

    return (
        <View style={styles.content}>
            <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>¡Bienvenido!</Text>
            </ImageBackground>
        </View>
        
    )
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent:'center',
    },
    text: {
      color: "white",
      fontSize: 35,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    }
    });