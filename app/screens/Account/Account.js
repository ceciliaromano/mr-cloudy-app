import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../database/firebaseConfig";

import Login from "./Login";
import UserLogged from "./UserLogged";

//Pregunta a Firebase Authentication qué usuario está loggeado, si no hay usuario loggeado lo almacenamos como false en el useState, si no, true.
//Luego muestra la pantalla de Login o UserLogged según la respuesta.

export default function Account(){
    const [login, setLogin] = useState(null);
    
    onAuthStateChanged(auth, (currentUser) => {
        !currentUser ? setLogin(false) : setLogin(true);
    });
    
    return login ? <UserLogged/> : <Login/>
}