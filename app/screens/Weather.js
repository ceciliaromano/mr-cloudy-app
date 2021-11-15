import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CitiesList from '../components/CitiesList';

//Esta pantalla contiene el botón que lleva al buscador de ciudades (Search)
//Y el listado de ciudades guardadas (CitiesList) *pendiente*

export default function Weather() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View>
        <Text
          style={styles.pseudoInput}
          onPress = {() => navigation.navigate("search")}
        > Ir a Search </Text>
      </View>

      <View style={styles.citiesList}>
        <TouchableOpacity
          onPress={() => navigation.navigate("getWeather")}
        >
          <CitiesList />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

//ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  citiesList: {
    marginTop: 10,
    borderWidth: 1,
    padding: 8,
    width: "80%"
  },
  pseudoInput: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 8,
    width: 100
  }
})