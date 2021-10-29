import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchProvisorio from '../components/SearchProvisorio';
import CitiesList from '../components/CitiesList';


export default function Weather() {
  return (
    <View style={styles.container}>

      <View>
        <SearchProvisorio/>
      </View>
      <View style={styles.citiesList}>
        <CitiesList />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      marginTop: 10
  },
  citiesList: {
    marginTop: 10,
    borderWidth: 1,
    padding: 8
  }
})