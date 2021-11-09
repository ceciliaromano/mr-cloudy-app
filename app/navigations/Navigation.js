import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home"
import WeatherStack from "./WeatherStack"

const Tab = createBottomTabNavigator();

export default function Navigation(){
    //Crea barra de navegación inferior, contiene las pestañas Home y WeatherStack
    //*Le falta la pestaña de Usuarios*
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name = "home"
                    component={Home}
                    options={{ title: "Home" }}
                />
                <Tab.Screen
                    name = "weather-stack"
                    component={WeatherStack}
                    options={{ headerShown: false}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}