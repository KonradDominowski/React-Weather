import React from "react";

import rain from './../media/precip/rain.svg'
import snow from './../media/precip/snow.svg'
import hail from './../media/precip/hail.svg'
import freezingRain from './../media/precip/freezing_rain.svg'

export const precipDefaultValue = {
	'rain': rain,
	'snow': snow,
	'ice': hail,
	'freezing_ice': freezingRain
}
export const PrecipContext = React.createContext()