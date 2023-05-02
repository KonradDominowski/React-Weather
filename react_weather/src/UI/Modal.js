import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react'
import classes from './Modal.module.css'
import Spinner from './Spinner'
import InputCity from './InputCity'
import { mainWeatherContext } from '../context/mainWeatherContext'

export default function Modal({ show }) {
	const { setLocation, fetch_weather, isLoading } = useContext(mainWeatherContext)
	const [prompt, setPrompt] = useState(null)
	const [message, setMessage] = useState(null)
	const [showPrompt, setShowPrompt] = useState(show)

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
				{ !show &&
					<>
						<p>
							Make sure to enable location in the browser
						</p>
						<div className={ classes.input }>
							<button onClick={ handleClick }>Try again</button>
						</div>
					</>
				}
				<InputCity fetch_weather={ fetch_weather } />
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
