import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert , ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CitiesList from '../components/CitiesList';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";

//Esta pantalla contiene el botón que lleva al buscador de ciudades (Search)
//Y el listado de ciudades guardadas (CitiesList)

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
    <ImageBackground source={require("../../assets/fondos/fondohome.jpg")} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.pseudoInput}
          onPress = {() => navigation.navigate("search")}
        ><Text style={{textAlign:'center',fontWeight:'bold',fontSize: 15}} onPress = {goToSearch}>Agregar ciudad</Text></TouchableOpacity>
      </View>
      
      <View style={styles.citiesList}>
          {login ? <CitiesList/> : <UserNotLogged/>}
      </View>
    
    </View>
    </ImageBackground>
  );
}
//Advierte al usuario que debe iniciar sesión o registrarse
function UserNotLogged(){
  return(
    <View style={styles.userNotLogged}>
      <Text style={{textAlign: "center", fontWeight: 'bold'}}>
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
    marginTop: 50,
  },
  image: {
    flex: 1,
  },
  pseudoInput: {
    margin:50,
    borderWidth: 2,
    borderColor: '#444',
    textDecorationColor: 'red',
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    width: 150,
    height: 50,
    marginBottom: 50
  },
  citiesList: {
    height: 480,
    width: "100%",
  },
  userNotLogged: {
    borderWidth: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 50,
    height: 300,
    width: 300,
    padding: 8,
  }
})