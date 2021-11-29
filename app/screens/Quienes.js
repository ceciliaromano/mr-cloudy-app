import React from "react";
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking, Alert } from "react-native";

export default function Quienes() {

    return (
        <View style={styles.content}>
            <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
                <Text style={styles.titulo}>Quienes somos</Text>
                <ScrollView >
                    <Text style={styles.text}>¡Hola! Somos Cecilia, Bryan, Joel y Mauricio, nos encanta la Tecnología.
                        Dado que la programación es nuestra pasión, codificamos la app Mr Cloudy como proyecto educativo.
                        La versión original se inspiró en gran medida en las necesidades de Paula, que es vendedora de helados,
                        tiene un local en una playa ubicada a una hora de la ciudad. Paula necesita estar al tanto de un elemento que hasta
                        entonces no le había preocupado, el clima.
                        Así nació Mr Cloudy nuestro objetivo es mantener a Mr Cloudy para que sea accesible en los lugares más remotos de nuestro país y
                        convertirnos en la principal fuente de información meteorológica para los gobiernos, las instituciones y las personas en
                        las zonas afectadas. Así proporcionar el mejor servicio de predicción meteorológica de la Argentina.</Text>
                    <Text style={styles.text}>Hemos escrito el codigo en React Native.</Text>
                    <Text style={styles.text}>- Fuente de datos: OpenWeatherMaps</Text>
                    <Text style={styles.text}>- Persistencia de datos: Firebase</Text>
                    <Text style={styles.text}>- Versionamiento de código: Git y Github.</Text>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={gitLink}
                    >
                        <Image style={styles.github} source={require("../../assets/fondos/github.png")} />
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>

    )
}
const gitLink = () => Linking.openURL('https://github.com/ceciliaromano/clima-app/');

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    titulo: {
        color: "white",
        fontSize: 35,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
        marginTop: 35,
        marginBottom: 10
    },
    text: {
        color: "black",
        // fontSize: 15,
        fontWeight: "bold",
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        textAlign: "left",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    github: {
        resizeMode: 'contain',
        width: 120,
        height: 120,
    },
    btnContainer: {
        position: "relative",
        alignSelf: 'center',
    },
}
);

