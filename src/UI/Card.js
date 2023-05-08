import React, { useContext } from 'react'
import classes from './Card.module.css'
import { WeatherContext } from '../context/weatherContext'

export default function Card({ day }) {
	const { currentWeather, setCurrentWeather } = useContext(WeatherContext)

	const date = new Date(day.datetime)

	// Different styling for days during weekend
	const weekendClasses = (date.getDay() === 6 || date.getDay() === 0) ? classes.weekend : classes.weekday

	// Different styling for currrently active weather
	// day.icon defines the weather and appropriate styling
	const cardClasses =
		(currentWeather === day)
			? `${classes.card} ${classes[day.icon]} ${classes.active}`
			: `${classes.card} ${classes[day.icon]}`

	return (
		<div className={ cardClasses } onClick={ setCurrentWeather.bind(null, day) }>
			<div className={ classes.date } >
				<p className={ classes.day }>{ date.toLocaleString('default', { weekday: 'long' }) }</p>
				<div className={ weekendClasses }>
					<span>{ date.getDate() }</span>
					<p>{ date.toLocaleString('default', { month: 'long' }) }</p>
				</div>
			</div>
			<div className={ classes.description }>
				<p className={ classes.conditions }>{ day.conditions }</p>
				<p>{ day.preciptype?.map(el => el.slice(0, 1).toUpperCase() + el.slice(1))
					.join(', ') }</p>
			</div>
			<div className={ classes.temp }>
				<p>{ day.temp } <span>°C</span></p>
			</div>
		</div>
	)
}
