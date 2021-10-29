import React from 'react';
import { View, Text} from 'react-native';


const GetWeather = ({ result }) => {
    const { name, main, weather} = result;

    if(!name) return null;

    return(
        <View>
            <Text>
                { main.temp } 
            </Text>
            <Text>
                { weather[0].description }
            </Text>
        </View>
    )
}

export default GetWeather;