import React, { useRef } from 'react'

export default function InputCity({ onSubmit }) {
	const city = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(city.current.value)
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
