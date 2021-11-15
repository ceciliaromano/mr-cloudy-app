import React, { useState } from 'react';
import { StyleSheet, Image, View, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { google_places_key } from '../../config.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import MapView, { Marker } from 'react-native-maps';
import {db} from '../../database/firebaseConfig';
import { doc, setDoc} from 'firebase/firestore'

export default function Search(){

    const navigation = useNavigation();
    const [cityData, setCityData] = useState({});

    //Esta función tomará los datos que devuelva la opción seleccionada y los pondrá en un objeto
    //En este caso nos interesa el nombre de la ciudad (name), su latitud y longitud para enviarla a la API de OpenWeather
    const getCoordinates = (data, details) => {

        setCityData({
            name: data.description,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        })

    };

    //Guardamos en constantes las propiedades del objeto
    const name = cityData.name;
    const latitude = cityData.latitude;
    const longitude = cityData.longitude;


    //Guarda la ciudad en la lista de ciudades pertinente al usuario loggeado
    const saveNewCity = async () => {
        if (Object.keys(cityData).length == 0){
            alert('Por favor ingrese una ciudad');
        } else {
            console.log(name, latitude, longitude);
            await setDoc(doc(db, "users", "racoon", "savedCities", name), {
                lat: latitude,
                lng: longitude
            });
        };

        try {
            navigation.navigate("getWeather");
        } catch(err){
            console.log(err);
        }
    };
    
    //Usa la API de Google Places Autocomplete a través del paquete react-native-google-places-autocomplete
    //Y react-native-maps para mostrar la busqueda en un mapa
    //Luego puede confirmarse la selección presionando el botón flotante, enviándo los datos a firebase
    return(
        <View style={styles.container}>
            <View
                style={styles.searchBarContainer}
            >
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    listViewDisplayed = "auto"
                    fetchDetails = {true}
                    query={{
                        key: google_places_key,
                        language: 'en',
                    }}
                    requestUrl={{
                        useOnPlatform: 'web',
                        url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    }}
                    onPress={getCoordinates}
                    onFail={(error) => console.error(error)}
                />
            </View>
  
            <View>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                
                {Object.keys(cityData).length !== 0 ? <Marker coordinate={{latitude: latitude, longitude: longitude}} /> : null }
             
                </MapView>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={saveNewCity}
                >
                    <Image
                        source={require('../../assets/add-city.png')}
                        style={styles.addCityBtn}
                    />
                </TouchableOpacity>
                    
            </View>

        </View>
    );
}

//ESTILOS

const halfWindow = (Dimensions.get("window").height) / 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        height: 320
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: halfWindow,
    },
    btnContainer: {
        position: 'absolute',
        bottom: -280,
        left: 300,
    },
    addCityBtn: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
    }
})