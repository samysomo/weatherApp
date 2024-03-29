import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const API_KEY = "98626b32dab04f3298d231628241902"
  
  const getWeather = async () =>{
    try {
      const res =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`)
      const data = await res.json()
      setWeatherData(data)
      setError(null)
    } catch (err) {
      setError("Error finding weather data")
    }
  }

  useEffect(() =>{
    city ? getWeather : setWeatherData(null)
  }, [city])

  const getBackgroundColor = () => {
    if (weatherData && weatherData.current) {
      const condition = weatherData.current.condition.text.toLowerCase();
      switch (condition) {
        case "sunny":
          return "#ffcc00"; 

        case "clear":
          return "#99ddff";

        case "partly cloudy":
          return "#d9d9d9";

        case "cloudy":
        return "#b3b3b3";

        case "stormy":
          return "#333399";

        case "snowy":
          return "#f1dae6";

        default:
          return "#66b4cc";
      }
    } else {
      return "#66b4cc";
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      {weatherData && weatherData.current ? 
        <> 
          <Text style={styles.title}>{weatherData.location.name}</Text>
          <Text>Country: {weatherData.location.country}</Text>
          <Text>Temperature: {weatherData.current.temp_c}*C</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
          <Image source={{uri : (weatherData.current.condition.icon).slice(2)}}></Image>
        </> 
       :
        <>
          <Text style={styles.title}>Welcome to weatherApp!</Text>
        </>
        
      }
     
      <TextInput
        style={styles.textInput}
        placeholder='Enter city name'
        value={city}
        onChangeText={(text) => setCity(text)}  
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text>Get Weather</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 25
  },
  image: {
    marginTop: 40,
    width: 200,
    height: 300
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#dfe6e9",
    textAlign: "center",
    padding: 10
  },
  textContainer:{
    alignItems: "center",
      justifyContent: "center",
      width: "80%",
      height: "55%",
      backgroundColor: '#e2e8e1',
      padding: 15,
      borderRadius: 50
  },
  button:{
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  textInput:{
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 120,
    textAlign: "center"
  },
});
