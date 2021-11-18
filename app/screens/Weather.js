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
          <CitiesList />
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
  pseudoInput: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 8,
    width: 100,
    marginBottom: 50
  },
  citiesList: {
    height: 300,
    width: "80%"
  }
})