import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { API_KEY } from "./utils/WeatherAPIKey";
import Weather from "./components/Weather";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    location: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error getting weather conditions"
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: parseInt(json.main.temp),
          weatherCondition: json.weather[0].main,
          location: json.name,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature, location } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching the weather</Text>
          </View>
        ) : (
          <Weather
            location={location}
            weather={weatherCondition}
            temperature={temperature}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffde4"
  },
  loadingText: {
    fontSize: 30
  }
});
