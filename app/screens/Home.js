import React from "react";
import { ScrollView,TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {Icon} from "react-native-elements";

export default function Home() {
  const navigation = useNavigation();
  const climaPant = () => navigation.navigate("Clima");
  const cuentaPant = () => navigation.navigate("Cuenta");
  const quienesPant = () => navigation.navigate("Quienes Somos");

  return (
    <View style={styles.content}>
        <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
            <Text style={styles.titulo}>Mr Cloudy</Text>
            <ScrollView >
                <Text style={styles.text}>Mr Cloudy es una aplicación pensada para dar solución a un abanico de perfiles de usuario que busquen una app sencilla, agil y amigable para obtener información sobre el clima de distintas localidades. Cada usuario puede registrarse con su email para guardar en una lista de acceso rápido en la pantalla clima sus localizaciones de interés.</Text>
                <Text style={styles.titulo2}>Pantalla clima</Text>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={climaPant}
                >
                    <Icon style={styles.imagenes} type="font-awesome-5" name="cloud-sun-rain" size={50} color='#206EF5'></Icon>
                </TouchableOpacity>
                <Text style={styles.text}>En esta pantalla puedes visualizar ciudades agregadas a tu lista, además de agregar otras haciendo click en el boton AGREGAR CIUDAD.</Text>
                <TouchableOpacity
                  style={styles.pseudoInput}
                  onPress = {() => navigation.navigate("Clima")}
                ><Text style={{textAlign:'center',fontWeight:'bold',fontSize: 15}} onPress = {climaPant}>Agregar ciudad</Text></TouchableOpacity>
                 <Text style={styles.text}>Al presionar el boton se abrirá un buscador de localidades junto con un mapa que te ayudaran a visualizar la ubicación seleccionada, para añadirla a tu lista simplemente presiona el boton +</Text>
                 <Image
                        source={require('../../assets/add-city.png')}
                        style={styles.add}
                    />
                <Text style={styles.text}>{"Además, puedes eliminar ciudades o localizaciones deslizando el nombre de la ciudad hacia la izquierda <<< y presionando el boton BORRAR"}</Text>

                <Text style={styles.titulo2}>Pantalla Cuenta</Text>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={cuentaPant}
                >
                    <Icon style={styles.imagenes} type="font-awesome-5" name="user-circle" size={50} color='#206EF5'></Icon>
                </TouchableOpacity>
                <Text style={styles.text}>{"Utiliza esta pestaña para registrarte e iniciar sesión en la aplicación. Si no inicias sesión no verás ciudades agregadas en la pantalla clima"}</Text>
                <Text style={styles.titulo2}>Pantalla Quienes Somos</Text>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={quienesPant}
                >
                    <Icon style={styles.imagenes} type="font-awesome-5" name="child" size={50} color='#206EF5'></Icon>
                </TouchableOpacity>
                <Text style={styles.text}>{"Aquí encontrarás más información sobre el proyecto, sus desarrolladores y el link al repositorio de GitHub"}</Text>

            </ScrollView>
        </ImageBackground>
    </View>
    
)
}

const styles = StyleSheet.create({
content:{
    flex: 1,
    justifyContent:'center',
},
add: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginBottom: 10,
},
titulo: {
  color: "white",
  fontSize: 35,
  lineHeight: 84,
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#000000c0",
  marginTop: 35,
  marginBottom: 15
},
text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    textAlign: "left",
  },
  titulo2: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    textAlign: "center",
  },
image: {
    flex: 1,
    justifyContent: 'center',
},
imagenes:{
    resizeMode: 'contain',
    marginBottom: 20,
},
btnContainer:{
    position: "relative",
    alignSelf: 'center',
},
pseudoInput: {
  margin:10,
  borderWidth: 2,
  borderColor: '#444',
  textDecorationColor: 'red',
  backgroundColor: '#fff',
  borderRadius: 12,
  justifyContent: 'center',
  alignSelf: 'center',
  width: 150,
  height: 50,
  marginBottom: 20
},
}
);

