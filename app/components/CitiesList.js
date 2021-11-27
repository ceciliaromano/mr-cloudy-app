import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../database/firebaseConfig';
import { onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


//Componente con lista de ciudades
export default function CitiesList() {
    const navigation = useNavigation();
    const [cities, setCities] = useState([]);
    const [login, setLogin] = useState(false);
    const [UID, setUID] = useState("");
    

    //Toma el UID del usuario
    onAuthStateChanged(auth, (currentUser) => {
        setUID(currentUser.uid);
        !currentUser ? setLogin(false) : setLogin(true);
    })

    //Recibe todas las entradas de la base de datos del usuario
    useEffect(() =>{
        if(login){
            onSnapshot(collection(db, "users", UID, "savedCities"), (snapshot) =>
                setCities(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            )
        }
    }, [login] );

    return (
        <ScrollView style={styles.container}>
            {cities.length === 0 ? <Text style={styles.noListItems}>¡Tu lista de ciudades está vacía! Busca ciudades para agregarlas a la lista</Text> : null}
            {cities.map((city) => {
                
                //Funcion que elimina la ciudad de la base de datos
                const deleteCity = async () => {
                    await deleteDoc(doc(db, "users", UID, "savedCities", city.id))
                }

                //Formato de swipeable
                const rightSwipe = (progress,dragX) => {
                    const scale = dragX.interpolate({
                        inputRange: [-100, 0],
                        outputRange: [1, 0],
                        extrapolate: 'clamp'
                    });
                    return(
                        <View style={styles.deleteBox}>
                            <TouchableOpacity onPress={deleteCity} >
                                <Animated.Text style={{ transform: [{scale}],fontSize:15,fontWeight:'bold',color: "#fff"}}>Borrar</Animated.Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                return(
                    <View>
                        <Swipeable renderRightActions = {rightSwipe} >
                            <TouchableOpacity onPress={() => navigation.navigate("getWeather", {name: city.id, UID: UID})} >
                                <Text key={city.id} style={styles.listItem}>
                                    {city.id}
                                </Text>
                            </TouchableOpacity>
                        </Swipeable>
                    </View>
                )
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    noListItems: {
        padding: 60,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 20
    },
    listItem: {
        padding: 10,
        fontSize: 15
    },
    deleteBox: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: 90,
        marginLeft: 10,
    },
})