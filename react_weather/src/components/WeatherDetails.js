import React, { useContext } from 'react'

import classes from './WeatherDetails.module.css'

import location_pin_on from './../media/location_pin_on.svg'
import location_pin_off from './../media/location_pin_off.svg'
import wind from './../media/wind.svg'
import cloud from './../media/cloud.svg'
import rain from './../media/rain.svg'

import ConditionsContext, { PrecipContext, precipDefaultValue } from '../context/context'

export default function Today({ weather, geoData, notLocation }) {
	const ctx = useContext(PrecipContext)
	console.log(notLocation)
	let minMax
	if (weather.tempmin && weather.tempmax) {
		minMax = <p> &#8595; { weather.tempmin } °C &#8593; { weather.tempmax } °C</p>
	}

	const precipitates = weather.preciptype?.map(precip =>
		<img key={ Math.random() } className={ classes.weatherIcon } src={ ctx[precip] } />)

	return (
		<div className={ classes.todayContainer }>
			<h1>
				<img
					className={ classes.icon }
					src={ (notLocation) ? location_pin_on : location_pin_off } />
				{ `${geoData?.city}, ${geoData?.country}` }

			</h1>
			<div className={ classes.weatherInfo }>
				<div>
					<h1>{ weather.temp } °C <span>{ weather.feelslike } °C</span></h1>
					{ minMax }
				</div>
				<div>
					<h1>{ weather.conditions }</h1>
				</div>
				<div className={ classes.extraInfo }>
					<div>
						<div>
							<p>
								<img className={ classes.weatherIcon } src={ cloud } /> { weather.cloudcover }%</p>
						</div>
						<div>
							<p><img className={ classes.weatherIcon } src={ rain } /> { weather.precipprob }%</p>
							<div>{ precipitates }</div>
						</div>
						<div>
							<p>
								<img className={ classes.weatherIcon } src={ wind } />
								{ weather.windspeed } km/h</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
