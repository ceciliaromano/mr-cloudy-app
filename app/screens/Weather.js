import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CitiesList from '../components/CitiesList';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";

//Esta pantalla contiene el botón que lleva al buscador de ciudades (Search)
//Y el listado de ciudades guardadas (CitiesList) *pendiente*

export default function Weather() {

  const navigation = useNavigation();
    
  const [login, setLogin] = useState(null);
  
  //Chequea que el usuario esté loggeado
  onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      !currentUser ? setLogin(false) : setLogin(true);
  });

  //Lleva a la pantalla de Search si el usuario está loggeado
  const goToSearch = () => {
    if(login){
      navigation.navigate("search");
    } else{
      Alert.alert("Inicia sesión para buscar ciudades");
    }
  }

  return (
    <View style={styles.container}>

      <View>
        <Text
          style={styles.pseudoInput}
          onPress = {goToSearch}
        > Buscar ciudad </Text>
      </View>

      <View style={styles.citiesList}>
          {login ? <CitiesList/> : <UserNotLogged/>}
      </View>
      
    </View>
  );
}

//Advierte al usuario que debe iniciar sesión o registrarse
function UserNotLogged(){
  return(
    <View style={styles.userNotLogged}>
      <Text style={{textAlign: "center"}}>
        Inicia sesión o registrate para ver tus ciudades guardadas
      </Text>
    </View>
  )
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
    width: 150,
    marginBottom: 50,
    textAlign: 'center'
  },
  citiesList: {
    height: 300,
    width: "80%"
  },
  userNotLogged: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    padding: 8,
    backgroundColor: "#dad8d8"
  }
})