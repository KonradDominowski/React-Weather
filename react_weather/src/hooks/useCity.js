import { useState, useCallback } from "react";

export default function useCity() {
	const [isLoading, setIsLoading] = useState(false)
	const [fetchedCities, setFetchedCities] = useState()
	const [citiesList, setCitiesList] = useState([])
	const [err, setErr] = useState(null)

	const fetchCities = useCallback(
		async (city) => {
			setIsLoading(true)
			setErr(null)

			try {
				const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city.toLowerCase()}`)
				if (!res.ok) throw new Error()
				const data = await res.json()

				setFetchedCities(data.results)
			} catch (error) {
				console.log(error)
				setErr(error)
			}

			setIsLoading(false)

		}, [])

	return {
		fetchedCities,
		isLoading,
		fetchCities,
		citiesList,
		setCitiesList,
		err
	}
}