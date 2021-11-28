import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Keyboard, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { google_places_key } from '../../config.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { db, auth } from '../../database/firebaseConfig';
import { doc, setDoc} from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

export default function Search(){

    const navigation = useNavigation();
    const [cityData, setCityData] = useState({});
    const [UID, setUID] = useState("");


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

    //Toma el UID del usuario
    onAuthStateChanged(auth, (currentUser) => {
        setUID(currentUser.uid);
        console.log(currentUser);
    })

    //Guarda la ciudad en la lista de ciudades pertinente al usuario loggeado
    const saveNewCity = async () => {
        if (Object.keys(cityData).length == 0){
            alert('Por favor ingrese una ciudad');
            return;
        } else {
            console.log(name, latitude, longitude);
            await setDoc(doc(db, "users", UID, "savedCities", name), {
                lat: latitude,
                lng: longitude
            });
        };

        try {
            navigation.navigate("getWeather", { name: name, UID: UID});
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
                    placeholder='Introduce una ciudad'
                    listViewDisplayed = "false"
                    fetchDetails = {true}
                    query={{
                        key: google_places_key,
                        language: 'es',
                    }}
                    requestUrl={{
                        useOnPlatform: 'web',
                        url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
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
                        style={styles.saveNewCityBtn}
                    />
                </TouchableOpacity>
                    
            </View>

        </View>
    );
}

//ESTILOS

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        position: 'absolute',
        zIndex:1,
        width: "100%"
    },
    map: {
        height: "100%",
        zIndex: 0,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        zIndex: 2,
    },
    saveNewCityBtn: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
    }
})