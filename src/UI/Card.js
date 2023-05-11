import React, { useContext } from 'react'
import classes from './Card.module.css'
import { WeatherContext } from '../context/weatherContext'
import { PrecipContext } from '../context/precipContext'

export default function Card({ day }) {
	const { currentWeather, setCurrentWeather } = useContext(WeatherContext)
	const precipCtx = useContext(PrecipContext)

	const date = new Date(day.datetime)

	// Different styling for days during weekend
	const weekendClasses = (date.getDay() === 6 || date.getDay() === 0) ? classes.weekend : classes.weekday

	// Different styling for currrently active weather
	// day.icon defines the weather and appropriate styling
	const cardClasses =
		(currentWeather === day)
			? `${classes.card} ${classes[day.icon]} ${classes.active}`
			: `${classes.card} ${classes[day.icon]}`

	const precipitates = day.preciptype?.map(precip =>
		<img key={ Math.random() } className={ classes.weatherIcon } src={ precipCtx[precip] } alt='' />)

	return (
		<div className={ cardClasses } onClick={ setCurrentWeather.bind(null, day) }>
			<div className={ classes.date } >
				<p className={ classes.day }>{ date.toLocaleString('default', { weekday: 'long' }) }</p>
				<div className={ weekendClasses }>
					<span>{ date.getDate() }</span>
					<p>{ date.toLocaleString('default', { month: 'long' }) }</p>
				</div>
			</div>
			<div className={ classes.descriptionContainer }>
				<div className={ classes.precipAndTemp }>
					<div className={ classes.precipitates }>
						{ precipitates }
					</div>
					<div className={ classes.temp }><p>{ day.temp } <span>°C</span></p></div>
				</div>
				<div className={ classes.description }><p className={ classes.conditions }>{ day.conditions }</p></div>
			</div>
		</div>
	)
}
