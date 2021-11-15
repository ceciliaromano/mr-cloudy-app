import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection } from 'firebase/firestore';
import {db} from '../../database/firebaseConfig';
import { onSnapshot } from "@firebase/firestore";

//Componente con lista de ciudades (pendiente)
export default function CitiesList() {
    const navigation = useNavigation();
    const [cities, setCities] = useState([]);

    const cosa = cities.map((city) =>
        city.id
    );

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
                return(
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("getWeather", {name: city.id})}
                        >
                            <Text key={city.id} style={styles.listItem}>
                                {city.id}
                            </Text>
                        </TouchableOpacity>
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
        padding: 5,
        borderWidth: 1
    }
})