import React, { useEffect, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import useCity from '../hooks/useCity';


export default function InputCity({ fetch_weather }) {
	const [enteredCity, setEnteredCity] = useState('')
	const {
		fetchedCities,
		fetchCities,
		citiesList,
		setCitiesList,
	} = useCity()

	const handleSubmit = e => {
		console.log('click')
		e.preventDefault()
		fetch_weather({ city: enteredCity })
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (enteredCity.length < 3) {
				setCitiesList([])
				return
			}
			fetchCities(enteredCity)
		}, 400)

		return () => clearTimeout(timeout)

	}, [enteredCity, fetchCities])

	useEffect(() => {
		if (!fetchedCities) {
			setCitiesList([])
			return
		}

		setCitiesList(fetchedCities.map(city =>
			<button onClick={
				fetch_weather.bind(null,
					{ city: city.name, country: city.country }
				) }>
				<CircleFlag countryCode={ city.country_code.toLowerCase() } height={ 24 } />
				{ city.country_code }, { city.name }
			</button>
		))

	}, [fetchedCities])


	return (
		<>
			<form>
				<input onChange={ e => setEnteredCity(e.target.value) } value={ enteredCity } type='text' placeholder='or enter a city...'></input>
				<button onClick={ handleSubmit } type='submit'>Search</button>
			</form>
			{ citiesList }
		</>
	)
}
