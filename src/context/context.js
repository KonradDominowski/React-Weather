import React from "react";

import rain from './../media/precip/rain.svg'
import snow from './../media/precip/snow.svg'
import hail from './../media/precip/hail.svg'
import freezingRain from './../media/precip/freezing_rain.svg'

export const conditionsContextValue = {
	'snow': null,
	'snow-showers-day': null,
	'snow-showers-night': null,
	'thunder-rain': null,
	'thunder-showers-day': null,
	'thunder-showers-night': null,
	'rain': null,
	'showers-day': null,
	'showers-night': null,
	'fog': null,
	'wind': null,
	'cloudy': null,
	'partly-cloudy-day': null,
	'partly-cloudy-night': null,
	'clear-day': null,
	'clear-night': null,
}

const ConditionsContext = React.createContext({
	'partly-cloudy-day': null,
	'clear-day': null
});

export default ConditionsContext;

export const precipDefaultValue = {
	'rain': rain,
	'snow': snow,
	'ice': hail,
	'freezing_ice': freezingRain
}
export const PrecipContext = React.createContext()