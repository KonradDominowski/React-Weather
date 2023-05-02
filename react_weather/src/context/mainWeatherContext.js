import React from "react";

export const mainWeatherContext = React.createContext({
	currentWeather: '',
	setCurrentWeather: () => { },
	geoData: {},
	weather: {},
	isLoading: true,
	fetch_weather: () => { },
})

export const setCurrentWeather = (weather, e) => {
	console.log(weather)
	console.log(e)
}