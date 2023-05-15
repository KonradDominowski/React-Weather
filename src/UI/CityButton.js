import React, { useContext } from 'react'

import { CircleFlag } from 'react-circle-flags';
import Spinner2 from '../UI/Spinner2'
import { WeatherContext } from '../context/weatherContext';



export default function CityButton({ city, index, fetchCityWeather, isDuplicate, indexToFetch }) {
	const { isLoading } = useContext(WeatherContext)

	return (
		<button
			key={ index }
			type='button'
			onClick={ fetchCityWeather.bind(null, { index: index, city: { city: city.name, country: city.country } }) }>
			{
				(isLoading && indexToFetch === index)
					? <Spinner2 />
					: <>
						<CircleFlag countryCode={ city.country_code.toLowerCase() } height={ 24 } />
						{ city.name }, { isDuplicate && city.admin1 + ', ' } { city.country_code }
					</>
			}
		</button>
	)
}
