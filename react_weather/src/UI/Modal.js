import React, { useEffect, useState, useMemo, useCallback } from 'react'
import classes from './Modal.module.css'
import Spinner from './Spinner'
import InputCity from './InputCity'

export default function Modal({ setLocation, fetch_weather, isLoading }) {
	const [prompt, setPrompt] = useState(null)
	const [message, setMessage] = useState(null)
	const [showPrompt, setShowPrompt] = useState(false)

	// Click this button to try and get location again, in case the user turned it on.
	const handleClick = useCallback(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLocation(position)
		}, () => {
			// If the user didn't enable location, let them know
			setMessage(<p className={ classes.fallback }>Please enable location access.</p>)
		})
	}, [setLocation])

	const fallback = useMemo(() => {
		return <>
			<div className={ `${classes.prompt}` }>
				<p>
					Make sure to enable location in the browser
				</p>
				<div className={ classes.input }>
					<button onClick={ handleClick }>Try again</button>
					<InputCity fetch_weather={ fetch_weather } />
				</div>
				{ message }
			</div>
		</>
	}, [message, fetch_weather, handleClick])

	useEffect(() => {
		setPrompt(fallback)
	}, [message, fallback])

	useEffect(() => {
		setTimeout(() => {
			setShowPrompt(true)
		}, 1000)
	}, [])

	return (
		<div className={ classes.backdrop }>
			{ isLoading && <Spinner /> }
			{ showPrompt && prompt }
		</div>
	)
}
