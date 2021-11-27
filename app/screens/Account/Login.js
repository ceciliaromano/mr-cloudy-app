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
            let mensaje;
            switch (error.message) {
                case "Firebase: Error (auth/invalid-email).":
                    mensaje = "Email invalido";
                    break;
                case "Firebase: Error (auth/internal-error).":
                    mensaje = "Por favor completa los campos";  
                    break;
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    mensaje = "La contraseña debe tener al menos 6 caracteres";  
                    break;
                case "Firebase: Error (auth/email-already-in-use).":
                    mensaje = "Email en uso";  
                    break;
                default:
                    mensaje = "Complete los campos";    
                    break;
            }
            Alert.alert(mensaje)
        }
    };

    //Función para el botón de inicio de sesión, toma los valores de email y password
    //Y se los pasa a signInWithEmailAndPassword para buscar el usuario en firebase
    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error){
            let mensaje = "nada";
            switch (error.message) {
                case "Firebase: Error (auth/invalid-email).":
                    mensaje = "Email invalido"; 
                    break;
                case "Firebase: Error (auth/user-not-found).":
                    mensaje = "Email invalido"; 
                    break;
                case "Firebase: Error (auth/internal-error).":
                    mensaje = "Por favor completa los campos"; 
                    break;
                case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                    mensaje = "Demasiados intentos, cuenta bloqueada temporalmente"; 
                    break;
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    mensaje = "La contraseña debe tener al menos 6 caracteres"; 
                    break;
                case "Firebase: Error (auth/wrong-password).":
                    mensaje = "Contraseña incorrecta"; 
                    break;
                default:
                    mensaje = "Ingrese sus datos"
            }
            Alert.alert(mensaje)
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