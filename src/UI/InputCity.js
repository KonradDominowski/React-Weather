import React, { useContext, useEffect, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import useCity from '../hooks/useCity';
import classes from './InputCity.module.css'
import { mainWeatherContext } from '../context/mainWeatherContext';
import Spinner2 from './Spinner2'


export default function InputCity() {
	console.log('rerender')
	const { fetch_weather, isLoading } = useContext(mainWeatherContext)
	const [enteredCity, setEnteredCity] = useState('')
	const [indexToFetch, setIndexToFetch] = useState()
	const {
		fetchedCities,
		fetchCities,
		cityIsLoading,
		citiesList,
		setCitiesList,
	} = useCity()

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (enteredCity.length < 3) {
				setCitiesList([])
				return
			}
			setCitiesList(
				<button className={ classes.last }>
					<Spinner2 />
				</button>
			)
			fetchCities(enteredCity)
		}, 400)

		return () => clearTimeout(timeout)

	}, [enteredCity, fetchCities, setCitiesList])

	const fetchCityWeather = (payload) => {
		setIndexToFetch(payload.index)
		fetch_weather(payload.city)
	}

	useEffect(() => {
		if (!fetchedCities) {
			setCitiesList([])
			return
		}

		setCitiesList(fetchedCities.map((city, i) => {
			return <button
				className={ (i + 1 === fetchedCities.length) ? classes.last : '' }
				key={ i }
				type='button'
				onClick={ fetchCityWeather.bind(null, { index: i, city: { city: city.name, country: city.country } }) }>
				{
					(isLoading && indexToFetch === i)
						? <Spinner2 />
						: <>
							<CircleFlag countryCode={ city.country_code.toLowerCase() } height={ 24 } />
							{ city.country_code } ,  { city.name }
						</>
				}
			</button>
		}
		))

	}, [fetchedCities, fetch_weather, setCitiesList, isLoading])

	return (
		<>
			<form className={ classes.cityForm }>
				<input
					autoFocus={ true }
					className={ (citiesList.length > 0 || cityIsLoading) ? classes.cities : classes.noCities }
					onChange={ e => setEnteredCity(e.target.value) }
					value={ enteredCity }
					type='text'
					placeholder='enter a city...' />
				{ citiesList }
			</form>

		</>
	)
}
