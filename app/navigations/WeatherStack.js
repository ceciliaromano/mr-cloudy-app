import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Weather from "../screens/Weather";
import Search from "../screens/Search";
import GetWeather from "../screens/GetWeather"

const Stack = createStackNavigator();

export default function WeatherStack(){
    //Pantallas de la pestaña WeatherStack, contiene Weather (predeterminada), Search y GetWeather
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "weather"
                component={Weather}
                options={{ title: "Espacio de clima" }}
            />
            <Stack.Screen
                name="search"
                component={Search}
                options={{ title: "Buscador" }}
            />
            <Stack.Screen
                name="getWeather"
                component={GetWeather}
                options={{  title: "Clima" }}
            />
        </Stack.Navigator>
    );
}