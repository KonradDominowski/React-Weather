import React, { useRef } from 'react';
import classes from './CityForm.module.css'

export default function CityForm({ fetch_weather, setShowCityForm }) {

	const city = useRef()

	const handleSubmit = e => {
		e.preventDefault()
		fetch_weather({ city: city.current.value })
		setShowCityForm(state => !state)
	}

	const handleCloseForm = e => {
		e.preventDefault()
		setShowCityForm(state => !state)
	}

	return (
		<>
			<form className={ classes.inputCity }>
				<input autoFocus ref={ city } type='text' placeholder='or enter a city...'></input>
				<button onClick={ handleSubmit } type='submit'>Search</button>
				<button onClick={ handleCloseForm } className={ classes.lastButton }>Close</button>
			</form>
		</>
	)
}
