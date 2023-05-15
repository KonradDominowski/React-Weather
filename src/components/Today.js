import React, { useContext } from 'react'
import { PrecipContext } from '../context/precipContext'

import classes from './Today.module.css'

import wind from './../media/wind.svg'
import cloud from './../media/cloud.svg'
import rain from './../media/rain.svg'

import Navbar from '../UI/Navbar'
import { WeatherContext } from '../context/weatherContext'
import { UnitsContext } from '../context/unitsContext'

export default function Today() {
	const { currentWeather: weather } = useContext(WeatherContext)
	const precipCtx = useContext(PrecipContext)
	const { setMetricUnits, displayTemp, displayWindSpeed } = useContext(UnitsContext)

	const handleUnitsChange = () => {
		setMetricUnits(state => !state)
	}

	// Current weather doesn't have a proper date property, so the date is set to current date, otherwise date is gotten from weather object
	let date = new Date(weather.datetime)
	if (isNaN(date)) {
		date = new Date()
	}

	// Current weather doesn't have tempmin and tempmax properties, only whole day forecasts have them, so this prevents errors from happening
	let minMax
	if (weather.tempmin && weather.tempmax) {
		minMax = <div className={ classes.minMax }>
			&#8595; { displayTemp(weather.tempmin) } &#8593; { displayTemp(weather.tempmax) }</div>
	}

	// This render icons for forecasted precipitations, if there are any
	const precipitates = weather.preciptype?.map(precip =>
		<img key={ Math.random() } className={ classes.weatherIcon } src={ precipCtx[precip] } alt='' />)

	return (
		<div className={ classes.todayContainer }>
			<Navbar />
			<div className={ classes.weatherInfo }>
				<div className={ classes.header }>
					<div className={ classes.headerInfo }>
						<div className={ classes.headerDate }>
							<p>{ date.toLocaleString('default', { weekday: 'long' }) }</p>
							{ date.toLocaleDateString('default', {
								day: 'numeric',
								month: 'long'
							}) }
						</div>
						<div>
							<span className={ classes.subtext }>{ displayTemp(weather.feelslike) }</span>
							<div onClick={ handleUnitsChange } className={ classes.temp }>
								{ displayTemp(weather.temp) }
							</div>
						</div>
					</div>
					{ minMax }
				</div>
				<div>
					<p className={ classes.conditions }>{ weather.conditions }</p>
				</div>
				<div className={ classes.extraInfo }>
					<div>
						<div>
							<p>
								<img className={ classes.weatherIcon } src={ cloud } alt='cloud' /> { weather.cloudcover }%</p>
						</div>
						<div>
							<p><img className={ classes.weatherIcon } src={ rain } alt='rain' /> { weather.precipprob }%</p>

							<div>{ precipitates }</div>
						</div>
						<div>
							<p>
								<img className={ classes.weatherIcon } src={ wind } alt='wind' />
								{ displayWindSpeed(weather.windspeed) }</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
