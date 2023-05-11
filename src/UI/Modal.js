import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import Spinner2 from './Spinner2'
import InputCity from './../components/InputCity'
import { WeatherContext } from '../context/weatherContext'

export default function Modal({ showImmediately }) {
	const { location, getLocation, isLoading } = useContext(WeatherContext)
	const [prompt, setPrompt] = useState(null)
	const [message, setMessage] = useState(null)
	const [showPrompt, setShowPrompt] = useState(showImmediately)


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
				{ !showImmediately &&
					<>
						<h2>
							Make sure to enable location in the browser
						</h2>
						<div className={ classes.input }>
							<button onClick={ handleClick }>
								{ isLoading
									? <Spinner2 />
									: 'Try again' }

							</button>

						</div>
					</>
				}
				{ message }
				<InputCity />
			</div>
		</>
	}, [message, isLoading, showImmediately, handleClick])

	useEffect(() => {
		setPrompt(fallback)
	}, [message, fallback])

	useEffect(() => {
		setTimeout(() => {
			setShowPrompt(true)
		}, 1000)
	}, [])

	return (
		<>
			{ ReactDOM.createPortal(
				<div className={ classes.backdrop }>
					{/* { isLoading && !weather && <Spinner2 /> } */ }
					{ showPrompt && prompt }
				</div>
				, document.getElementById('modal')) }
		</>

	)
}
