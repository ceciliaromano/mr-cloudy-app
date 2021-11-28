import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../database/firebaseConfig"

export default function UserLogged(){
    //Función para cerrar sesión.
    const logout = async () => {
        await signOut(auth);
    };

    //Muestra con qué email se ha loggeado y un botón para cerrar sesión
    return(
        <View style={styles.container}>
            <ImageBackground source={require("../../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
                <View style={styles.logged}>
                <Text style={styles.text}>¡Bienvenido/a!</Text>
                <Image style={{flex: 1, alignSelf: 'center'}}source={require("../../../assets/fondos/carga.gif")} resizeMode="center"/>
                <Text style={styles.textoIng}>{"Ingresaste con el email:"}</Text>
                <Text style={styles.email}>{auth.currentUser.email}</Text>
                    <TouchableOpacity
                        style={styles.pseudoInput}
                        onPress = {logout}
                    ><Text style={{textAlign:'center',fontWeight:'bold',fontSize: 15}}>Cerrar sesión</Text></TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image: {
        flex: 1,
    },
    textoIng:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    }, 
    email:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    logged: {
        flex: 1,
    },
    text: {
        color: "white",
        fontSize: 35,
        lineHeight: 84,
        marginTop: 100,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
      },
      pseudoInput: {
        borderWidth: 2,
        borderColor: '#444',
        textDecorationColor: 'red',
        backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        marginBottom: 90
      },
  })