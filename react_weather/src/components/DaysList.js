import React, { useContext } from 'react'

import classes from './DaysList.module.css'

import Card from './../UI/Card'
import { mainWeatherContext } from '../context/mainWeatherContext'


export default function DaysList() {
	const days = useContext(mainWeatherContext).weather.days

	const daysList = days.map(day => <Card key={ Math.random() } day={ day } />)

	return (
		<div className={ classes.days }>
			{ daysList }
		</div>
	)
}
