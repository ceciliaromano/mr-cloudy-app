import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import Home from "../screens/Home";
import WeatherStack from "./WeatherStack";
import Account from "../screens/Account/Account";
import Quienes from "../screens/Quienes";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    
    //Crea barra de navegación inferior, contiene las pestañas Home, WeatherStack, Account y Quienes.
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Cuenta"
                tabBarOptions={{
                    inactiveTintColor: '#646464',
                    activeTintColor: '#206EF5'
                }}
                screenOptions={({route})=> ({
                    tabBarIcon: ({color}) => screenOptions(route,color),
                })}
            >
                <Tab.Screen
                    name = "Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name = "Clima"
                    component={WeatherStack}
                    options={{ headerShown: false}}
                />
                <Tab.Screen
                    name = "Quienes Somos"
                    component={Quienes}
                    options={{ headerShown: false}}
                />
                <Tab.Screen
                    name = "Cuenta"
                    component={Account}
                    options={{ headerShown: false}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route,color){
    let iconName;
    switch(route.name) {
        case "Home":
            iconName = "home"
            break;
        case "Clima":
            iconName = "cloud-sun-rain"
            break;
        case "Quienes Somos":
            iconName = "child"
            break;
        case "Cuenta":
            iconName = "user-circle"
        break;
        
        default:
            break;
    }
    return <Icon type="font-awesome-5" name={iconName} size={22} color={color}/>
}
