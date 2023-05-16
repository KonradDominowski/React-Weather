import React, { useCallback, useContext, useEffect, useState } from 'react';
import useCity from '../hooks/useCity';
import classes from './InputCity.module.css'
import { WeatherContext } from '../context/weatherContext';
import Spinner2 from '../UI/Spinner2'
import CityButton from '../UI/CityButton';


export default function InputCity() {
	const { fetch_weather, isLoading } = useContext(WeatherContext)
	const [enteredCity, setEnteredCity] = useState('')
	const [indexToFetch, setIndexToFetch] = useState()
	const {
		fetchedCities,
		fetchCities,
		cityIsLoading,
		citiesList,
		setCitiesList,
	} = useCity()



	// Fetch cities list whenever user input text into search bar and it's longer than 2 characters.
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (enteredCity.length < 3) {
				setCitiesList([])
				return
			}
			setCitiesList(
				<button>
					<Spinner2 />
				</button>
			)
			fetchCities(enteredCity)
		}, 400)

		return () => clearTimeout(timeout)

	}, [enteredCity, fetchCities, setCitiesList])


	const fetchCityWeather = useCallback((payload) => {
		setIndexToFetch(payload.index)
		fetch_weather(payload.city)
	}, [fetch_weather])



	useEffect(() => {
		if (!fetchedCities) {
			setCitiesList([])
			return
		}

		const duplicates = fetchedCities.map(city => city.name + city.country_code)

		setCitiesList(fetchedCities.map((city, i) => {
			const isDuplicate = duplicates?.filter(el => el === city.name + city.country_code).length > 1

			return <CityButton
				city={ city }
				key={ i }
				index={ i }
				fetchCityWeather={ fetchCityWeather }
				isDuplicate={ isDuplicate }
				indexToFetch={ indexToFetch }
			/>
		}
		))

	}, [fetchedCities, isLoading, indexToFetch, fetch_weather, fetchCityWeather, setCitiesList])

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
