import React from 'react'

import classes from './DaysList.module.css'

import Card from './../UI/Card'


export default function DaysList({ days }) {

	const daysList = days.map(day => <Card key={ Math.random() } day={ day } />)

	return (
		<div className={ classes.days }>
			{ daysList }
		</div>
	)
}
