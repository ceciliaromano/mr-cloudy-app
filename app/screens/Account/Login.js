import React, { useState } from "react";
import { View, TextInput, ImageBackground, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
        <ImageBackground source={require("../../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
            <Text style={styles.textLogin}>Mr Cloudy</Text>
            <TextInput
                style={styles.inputFields}
                placeholder="Email..."
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.inputFields}
                placeholder="Password..."
                onChangeText={(password) => setPassword(password)}
            />

            <View style={styles.btnsContainer}>
            <TouchableOpacity
                    style={styles.pseudoInput}
                    onPress = {register}
                >
                    <Text style={styles.boton}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pseudoInput}
                    onPress = {login}
                >
                    <Text style={styles.boton}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputFields: {
        borderWidth: 2,
        height: 50,
        borderRadius: 15,
        color:"#000",
        fontWeight: 'bold',
        paddingLeft: 15,
        marginTop: 5, 
    },
    btnsContainer: {
        marginTop: 15,
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
    textLogin: {
        color: "white",
        fontSize: 35,
        lineHeight: 84,
        marginTop: 20,
        marginBottom: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
      },
      pseudoInput: {
        borderWidth: 2,
        borderColor: '#444',
        backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 40,
        marginBottom: 3,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
    },
      boton:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 15
      }
})