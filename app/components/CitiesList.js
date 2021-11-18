import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../../database/firebaseConfig';
import { onSnapshot } from "@firebase/firestore";
import Swipeable from "react-native-gesture-handler/Swipeable";

//Componente con lista de ciudades
export default function CitiesList() {
    const navigation = useNavigation();
    const [cities, setCities] = useState([]);

    //Recibe todas las entradas de la base de datos del usuario *pendiente CAMBIAR USUARIOS*
    useEffect(
        () =>
            onSnapshot(collection(db, "users", "racoon", "savedCities"), (snapshot) =>
                setCities(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            ),
        []
    );
    
    return (
        <ScrollView style={styles.container}>
            {cities.map((city) => {
                
                //Funcion que elimina la ciudad de la base de datos *pendiente CAMBIAR USUARIOS*
                const deleteCity = async () => {
                    await deleteDoc(doc(db, "users", "racoon", "savedCities", city.id))
                }

                //Formato de swipeable
                const rightSwipe = (progress, dragX) => {
                    const scale = dragX.interpolate({
                        inputRange: [-100, 0],
                        outputRange: [1, 0],
                        extrapolate: 'clamp'
                    });
                    return(
                        <View style={styles.deleteBox}>
                            <TouchableOpacity onPress={deleteCity} >
                                <Animated.Text style={styles.deleteText, { transform: [{scale}] }}>Delete</Animated.Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                
                return(
                    <View>
                        <Swipeable renderRightActions = {rightSwipe} >
                            <TouchableOpacity onPress={() => navigation.navigate("getWeather", {name: city.id})} >
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
        height: 30,
    },
    listItem: {
        borderWidth: 1,
        padding: 10
    },
    deleteBox: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
    },
})