import React from "react";

export const mainWeatherContext = React.createContext({
	currentWeather: '',
	setCurrentWeather: () => { }
})

export const setCurrentWeather = (weather, e) => {
	console.log(weather)
	console.log(e)
}