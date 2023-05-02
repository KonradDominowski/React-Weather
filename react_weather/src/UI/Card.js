import React, { useContext } from 'react'
import classes from './Card.module.css'
import { mainWeatherContext } from '../context/mainWeatherContext'

export default function Card({ day }) {
	const { currentWeather, setCurrentWeather } = useContext(mainWeatherContext)

	const date = new Date(day.datetime)
	const weekendClasses = (date.getDay() === 6 || date.getDay() == 0) ? classes.weekend : classes.weekday

	const cardClasses = (currentWeather === day) ? `${classes.card} ${classes.active}` : `${classes.card}`

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
				<h3>{ day.conditions }</h3>
				<p>{ day.preciptype }</p></div>
			<div>
				<h2>{ day.temp } °C</h2>
			</div>
		</div>
	)
}
