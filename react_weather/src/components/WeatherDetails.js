import React, { useContext } from 'react'
import { PrecipContext } from '../context/context'

import classes from './WeatherDetails.module.css'

import wind from './../media/wind.svg'
import cloud from './../media/cloud.svg'
import rain from './../media/rain.svg'

import Navbar from '../UI/Navbar'
import { mainWeatherContext } from '../context/mainWeatherContext'

export default function Today({ geoData, fetch_weather }) {
	const ctx = useContext(PrecipContext)
	const weather = useContext(mainWeatherContext).currentWeather

	let minMax
	if (weather.tempmin && weather.tempmax) {
		minMax = <p> &#8595; { weather.tempmin } °C &#8593; { weather.tempmax } °C</p>
	}

	const precipitates = weather.preciptype?.map(precip =>
		<img key={ Math.random() } className={ classes.weatherIcon } src={ ctx[precip] } />)

	return (
		<div className={ classes.todayContainer }>
			<Navbar geoData={ geoData } fetch_weather={ fetch_weather } />
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
