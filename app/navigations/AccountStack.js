import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import UserLogged from "../screens/Account/UserLogged";

const Stack = createStackNavigator();

export default function AccountStack() {
    //Pantallas de la pestaña AccountStack, contiene Account (predeterminada y deriva a las otras dependiendo si el usuario está loggeado o no), Login y UserLogged
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
            />
            <Stack.Screen
                name = "login"
                component={Login}
            />
            <Stack.Screen
                name = "logged"
                component={UserLogged}
            />
        </Stack.Navigator>
    )
}