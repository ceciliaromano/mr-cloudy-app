import React from 'react';
import { View, Text} from 'react-native';

export default function GetWeather(){
    return(
        <View>
            <Text>
                Mostrar Clima ....
            </Text>
        </View>
    )
}

/*
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


const [ciudad, setCiudad] = useState('');
    const [consultar, setConsultar] = useState(false);

    const consultarAPI = () => {
        setCiudad(handleTextChange)
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
*/