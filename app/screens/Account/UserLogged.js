import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
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
                <Text style={styles.email}>{"¡Hola! Estas conectado con el usuario"}</Text>
                    <Text style={styles.email}>{auth.currentUser.email}</Text>
                    <Button
                        title="Cerrar Sesión"
                        onPress={logout}
                    />
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
    email:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15,
    },
    logged: {
        flex: 1,
        justifyContent: 'center'
    },
  })