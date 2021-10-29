import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { openweather_key } from '../../config.json';

export default function SearchForm(){

    const [ciudad, setCiudad] = useState('');
    const [consultar, setConsultar] = useState(false);

    const consultarAPI = () => {
        if(ciudad.trim() === ''){
            Alert.alert('Ingrese una ciudad')
            setConsultar(false);
        } else {
            try {
                var fixed = ciudad.replace(' ', '%20')
            } catch (error) {
    
            } finally {
                setCiudad(fixed);
                setConsultar(true);
                return;
            }
        }
    }

    const [result, setResult] = useState({});

    useEffect(() => {
        const consultarAPI = async () => {
            if(consultar) {    
                const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad + '&units=metric&appid=' + openweather_key;
                try {
                    const response = await fetch(url);
                    const result = await response.json();
                    setResult(result);
                    setConsultar(false)
                } catch(error) {
                    Alert.alert("No se ha podido encontrar la ciudad");
                }
            }
        }
            consultarAPI();
    }, [consultar])
}