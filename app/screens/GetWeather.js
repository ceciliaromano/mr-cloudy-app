import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import {doc, getDoc } from 'firebase/firestore';
import {db} from '../../database/firebaseConfig';
import { openweather_key } from '../../config.json'

//Obtiene el clima de la API OpenWeatherMap (pendiente)
export default function GetWeather({ route }){
    const [ loading, setLoading ] = useState(false);
    const [ fetchedData, setFetchedData ] = useState();

    const { name } = route.params;
    const docRef = doc(db, "users", "racoon", "savedCities", name)

    const consultarAPI = async () => {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + data.lat + '&lon=' + data.lng + '&units=metric&appid=' + openweather_key;

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

    return(
        <View>
            <Text>
                {name}
            </Text>
            <Text>
                {fetchedData != undefined ? "Clima: " + fetchedData.weather[0].description : null}
            </Text>
            <Text>
                {fetchedData != undefined ? "Temperatura: " + fetchedData.main.temp : null}
            </Text>
            <Text>
                {fetchedData != undefined ? "Temperatura máxima: " + fetchedData.main.temp_max : null}
            </Text>
            <Text>
                {fetchedData != undefined ? "Temperatura mínima: " + fetchedData.main.temp_min : null}
            </Text>
        </View>
    )
}