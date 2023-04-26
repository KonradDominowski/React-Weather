import React, { useRef } from 'react';


export default function InputCity({ fetch_weather }) {
	const city = useRef()

	const handleSubmit = e => {
		console.log('click')
		e.preventDefault()
		fetch_weather({ city: city.current.value })
	}

	return (
		<>
			<form>
				<input ref={ city } type='text' placeholder='or enter a city...'></input>
				<button onClick={ handleSubmit } type='submit'>Search</button>
			</form>
		</>
	)
}
