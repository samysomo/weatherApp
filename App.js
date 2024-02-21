import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Text>Welcome to weatherapp!</Text>
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
      {weatherData && (
        <View>
          <Text>City: {weatherData.location.name}</Text>
          <Text>Country: {weatherData.location.country}</Text>
          <Text>Temperature: {weatherData.current.temp_c}*C</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
        </View>
      )}
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
    backgroundColor: '#66b4cc',
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
    width: 45
  },
  weatherData: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    display: flex,
    justifyContent: center,
    alignItems: center
  }
});
