import React, { useEffect, useState, useRef } from 'react'
import classes from './Modal.module.css'
import Spinner from './Spinner'
import InputCity from './InputCity'

export default function Modal({ location, setLocation, fetch_weather }) {
	const city = useRef()
	const [prompt, setPrompt] = useState(null)
	const [message, setMessage] = useState(null)
	const [showPrompt, setShowPrompt] = useState(false)

	const handleClick = () => {
		navigator.geolocation.getCurrentPosition(position => {
			setLocation(position)
		}, () => {
			setMessage(<p className={ classes.fallback }>Please enable location access.</p>)
		})
	}

	const handleSubmit = city => {
		console.log(city)
		fetch_weather({ city: city })
	}

	let fallback = <>
		<div className={ `${classes.prompt}` }>
			<p>
				Make sure to enable location in the browser
			</p>
			<div className={ classes.input }>
				<button onClick={ handleClick }>Try again</button>
				<InputCity onSubmit={ handleSubmit } />
				{/* <form>
					<input ref={ city } type='text' placeholder='or enter a city...'></input>
					<button onClick={ handleSubmit } type='submit'>Search</button>
				</form> */}
			</div>
			{ message }
		</div>
	</>

	useEffect(() => {
		setPrompt(fallback)
	}, [message])

	useEffect(() => {
		setTimeout(() => {
			setShowPrompt(true)
		}, 1000)
	}, [])

	return (
		<div className={ classes.backdrop }>
			<Spinner />
			{ showPrompt && prompt }
		</div>
	)
}
