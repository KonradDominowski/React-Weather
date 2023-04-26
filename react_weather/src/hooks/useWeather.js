import { useCallback, useState } from "react";

export default function useWeather() {
	const WEATHER_API_KEY = `ZAUSD52QXZXGG7VTYENTNT9D6`
	const GEOCODING_API_KEY = `3540478de5844d23ac0ae2a428369495`
	const [weather, setWeather] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState(null)
	const [geoData, setGeoData] = useState(null)

	const fetch_weather = useCallback(
		async ({ location = null, city = null }) => {
			let weatherUrl
			let geoDataUrl

			if (location) {
				weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
				${location.coords.latitude},
				${location.coords.longitude}
				?iconSet=icons2&unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`

				geoDataUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}
				&lon=${location.coords.longitude}
				&apiKey=${GEOCODING_API_KEY}`
			}

			if (city) {
				weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`

				geoDataUrl = `https://api.geoapify.com/v1/geocode/search?city=${city}&country=Poland&format=json&apiKey=${GEOCODING_API_KEY}
				`
			}

			setIsLoading(true)
			setErr(null)


			try {
				const res = await fetch(weatherUrl)
				if (!res.ok) throw new Error(`Couldn't fetch weather`)

				const data = await res.json()
				setWeather(data)

			} catch (error) {
				console.log(error)
			}

			try {
				const res = await fetch(geoDataUrl)

				if (!res.ok) throw new Error(`Couldn't reverse geocode`)

				const data = await res.json()

				if (location) {
					setGeoData(data.features[0].properties)
				} else if (city) {
					setGeoData(data.results[0])
				}

			} catch (error) {
				console.log(error)
			}

			setIsLoading(false)

		}, [])

	return {
		geoData,
		weather,
		isLoading,
		fetch_weather,
		notLocation: !location
	}
}
