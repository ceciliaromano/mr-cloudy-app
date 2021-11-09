import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Weather from "../screens/Weather";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function WeatherStack(){
    //Pantallas de la pestaña WeatherStack, contiene Weather (predeterminada) y Search
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "weather"
                component={Weather}
                options={{ title: "Clima" }}
            />
            <Stack.Screen
                name="search"
                component={Search}
                options={{ title: "Buscador" }}
            />
        </Stack.Navigator>
    );
}