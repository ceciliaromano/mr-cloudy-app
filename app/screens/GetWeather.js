import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, ImageBackground} from 'react-native';
import {doc, getDoc } from 'firebase/firestore';
import {db} from '../../database/firebaseConfig';
import { openweather_key } from '../../config.json';
import { render } from 'react-dom';

//Busca la entrada en la base de datos y luego hace la petición de clima a la API de OpenWeatherMap
export default function GetWeather({ route }){
    const [ fetchedData, setFetchedData ] = useState();
    //Obtiene el nombre y UID pasados desde la pantalla Search o del item seleccionado de CitiesList
    const { name, UID } = route.params;

    const docRef = doc(db, "users", UID, "savedCities", name)

    //Consulta la API pasando las coordenadas del lugar para evitar errores
    const consultarAPI = async () => {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + data.lat + '&lon=' + data.lng + '&units=metric&lang=es&appid=' + openweather_key;

        try{
            const response = await fetch(url);
            const result = await response.json();
            setFetchedData(result);
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        consultarAPI()
    }, []);
// Solicitudes
var climaCiudad = fetchedData != undefined ? (fetchedData.weather[0].description).charAt(0).toUpperCase() + (fetchedData.weather[0].description).slice(1) : null;
var tempCiudad = fetchedData != undefined ? (fetchedData.main.temp).toFixed(1) : null;
var tempMaxCiudad = fetchedData != undefined ? (fetchedData.main.temp_max).toFixed(1) : null;
var tempMinCiudad = fetchedData != undefined ? (fetchedData.main.temp_min).toFixed(1) : null;
var climaImg = fetchedData != undefined ? 'http://openweathermap.org/img/wn/' + fetchedData.weather[0].icon + '@2x.png' : null;
// Condicionales para cambios de apariencia
var colorTemp = '#111';

if (tempCiudad <= 1) 
        {colorTemp = "#EBEBEB"} 
    else if (tempCiudad > 1 && tempCiudad < 20)
        { colorTemp = "#1856C1"}
    else if (tempCiudad >= 20 && tempCiudad < 26)
        {colorTemp = "#FFA700"}
    else {colorTemp = "#C11F18"}

    var imgClima;
    var mainClima = fetchedData != undefined ? fetchedData.weather[0].main : null;
    if ( mainClima === 'Thunderstorm')
    {
        imgClima = require("../../assets/fondos/tormenta.gif");
        }else if (mainClima === 'Rain' || mainClima === 'Drizzle') {
        imgClima = require("../../assets/fondos/lluvia.gif");
        }else if (mainClima === 'Snow') {
        imgClima = require("../../assets/fondos/nieve.gif");
        }else if (mainClima === 'Clouds') { 
        imgClima = require("../../assets/fondos/nubes.gif"); 
        }
    else {imgClima = require("../../assets/fondos/sol.gif")}
     
    if(tempCiudad != null)
    {
    return(
        <View style={Styles.all}>
            <ImageBackground source={imgClima} resizeMode="cover" style={Styles.fondo}>
                <View style={Styles.contenido}>
                    <View style={Styles.ciudadypin}>
                        <Image style={{width:20,height:32}} source={require("../../assets/fondos/pin.png")}/>
                        <Text style={Styles.textociudad}>{name}</Text>
                    </View>
                    <View style={Styles.tempylogo}>
                        <Text style={[Styles.tempPrincipal,{color: colorTemp}]}>{tempCiudad + "ºC"}</Text>
                        <Image style={{width:100,height:100}} source={{uri: climaImg}}/>
                    </View>
                    <Text style={Styles.textoclima}> {climaCiudad} </Text>
                    <Text style={Styles.maxMin}>
                        {"Max: " + tempMaxCiudad + "ºC / Min: " + tempMinCiudad + "ºC"}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
    }
    else{ 
    return(
        <View style={Styles.all}>
            <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={Styles.fondo}>
                <Image style={{flex: 1, alignSelf: 'center'}}source={require("../../assets/fondos/home2.gif")} resizeMode="center"/>
            </ImageBackground>
        </View>
            );}
}
const Styles = StyleSheet.create({
    all:{
        flex: 1,
    },
    fondo:{
        flex: 1,
        justifyContent: 'center'
    },
    contenido:{
        flexDirection: 'column',
        alignSelf: 'center',
        height: 280,
        width: 300,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    ciudadypin:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        alignSelf: 'center'
    },
    tempylogo:{
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 18,
        alignSelf: 'center',
        alignItems: 'center',
     },
    tempPrincipal:{
        fontSize: 40,
        textShadowColor: '#777',
        textShadowRadius: 5,
        fontWeight: 'bold',
    },
    textociudad:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    textoclima:{
        fontSize: 18,
        marginBottom: 5,
        alignSelf: 'center',
        fontStyle: 'italic',
      //  backgroundColor: '#aaa',
    },
    maxMin:{
        fontSize: 18,
        color: '#111',
        marginTop: 15,
        marginBottom: 13,
        alignSelf: 'center',
    }
})
