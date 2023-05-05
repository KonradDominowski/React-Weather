import React, { useContext } from 'react'

import classes from './DaysList.module.css'

import Card from './../UI/Card'
import { mainWeatherContext } from '../context/mainWeatherContext'


export default function DaysList() {
	const days = useContext(mainWeatherContext).weather.days

	const daysList = days.map((day, i) => <Card key={ i } day={ day } />)

	return (
		<div className={ classes.days }>
			{ daysList }
		</div>
	)
}
