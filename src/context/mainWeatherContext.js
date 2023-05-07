import React from "react";

export const mainWeatherContext = React.createContext({
	currentWeather: '',
	setCurrentWeather: () => { },
	geoData: {},
	weather: {},
	isLoading: true,
	fetch_weather: () => { },
	fetchedFromCurrentLocation: true,
	showModal: true,
	setShowModal: () => { }
})