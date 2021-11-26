import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../database/firebaseConfig"

export default function UserLogged(){
    //Función para cerrar sesión.
    const logout = async () => {
        await signOut(auth);
    };

    //Muestra con qué email se ha loggeado y un botón para cerrar sesión
    return(
        <View style={{marginTop: 100}}>
            <Text style={{marginBottom: 10, textAlign:"center"}}>Sesión iniciada con email: {auth.currentUser.email}</Text>
            <Button
                title="Cerrar Sesión"
                onPress={logout}
            />
        </View>
    )
}
