import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react'
import classes from './Modal.module.css'
import Spinner from './Spinner'
import InputCity from './InputCity'
import { mainWeatherContext } from '../context/mainWeatherContext'

export default function Modal({ show }) {
	const { location, getLocation, fetch_weather, isLoading } = useContext(mainWeatherContext)
	const [prompt, setPrompt] = useState(null)
	const [message, setMessage] = useState(null)
	const [showPrompt, setShowPrompt] = useState(show)

	// Click this button to try and get location again, in case the user turned it on.
	const handleClick = useCallback(() => {
		getLocation()
		if (!location) {
			setMessage(<p className={ classes.fallback }>Please enable location access.</p>)
		}
	}, [getLocation, location])

	const fallback = useMemo(() => {
		return <>
			<div className={ `${classes.prompt}` }>
				{ !show &&
					<>
						<h2>
							Make sure to enable location in the browser
						</h2>
						<div className={ classes.input }>
							<button onClick={ handleClick }>Try again</button>
						</div>
					</>
				}
				{ message }
				<InputCity />
			</div>
		</>
	}, [message, show, fetch_weather, handleClick])

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
			{/* { isLoading && <Spinner /> } */ }
			{ showPrompt && prompt }
		</div>
	)
}
