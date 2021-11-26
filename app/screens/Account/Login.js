import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../database/firebaseConfig";

export default function Login(){
    //Toma el email y contraseña que ingresa el usuario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Función para el botón de registro, toma los valores de email y password
    //Y se los pasa a createUserWithEmailAndPassword para crear el usuario en firebase
    const register = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error){
            console.log(error.message);
            Alert("No es un email válido");
        }
    };

    //Función para el botón de inicio de sesión, toma los valores de email y password
    //Y se los pasa a signInWithEmailAndPassword para buscar el usuario en firebase
    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error){
            console.log(error.message);
            Alert("No es un email válido");
        }
    };


    return(
        <View style={styles.container}>
            <TextInput
                style={styles.inputFields}
                placeholder="Email..."
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                style={styles.inputFields}
                placeholder="Password..."
                onChangeText={(password) => setPassword(password)}
            />

            <View style={styles.btnsContainer}>
                <Button
                    title = "Registrar"
                    onPress={register}
                />
                <Button
                    title = "Iniciar Sesión"
                    onPress={login}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    inputFields: {
        borderWidth: 1,
        height: 50,
    },
    btnsContainer: {
        marginTop: 15,
    }
})