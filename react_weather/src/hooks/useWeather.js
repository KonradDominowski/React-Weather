import { useCallback, useState } from "react";

export default function useWeather() {
	const WEATHER_API_KEY = `ZAUSD52QXZXGG7VTYENTNT9D6`
	const GEOCODING_API_KEY = `3540478de5844d23ac0ae2a428369495`
	const [weather, setWeather] = useState(null)
	const [mainWeather, setMainWeather] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState(null)
	const [geoData, setGeoData] = useState(null)

	const fetch_weather = useCallback(
		async ({ location = null, city = null, country = null }) => {
			let weatherUrl
			let geoDataUrl

			console.log('location:', location)
			console.log('city:', city)
			console.log('country:', country)

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
				weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`

				geoDataUrl = `https://api.geoapify.com/v1/geocode/search?city=${city}&country=${country}&format=json&apiKey=${GEOCODING_API_KEY}
				`
			}

			setIsLoading(true)
			setErr(null)


			try {
				const [weather, geo] = await Promise.all([
					fetch(weatherUrl),
					fetch(geoDataUrl)
				])

				if (!weather.ok) throw new Error(`Couldn't fetch weather`)
				if (!geo.ok) throw new Error(`Couldn't reverse geocode`)

				const [weatherData, geoData] = await Promise.all([
					weather.json(),
					geo.json()
				])

				setWeather(weatherData)
				setMainWeather(weatherData.currentConditions)

				if (location) {
					setGeoData(geoData.features[0].properties)
				} else if (city) {
					setGeoData(geoData.results[0])
				}

			} catch (error) {
				setErr(error)
			}
			setIsLoading(false)
		}, [])

	return {
		geoData,
		weather,
		isLoading,
		fetch_weather,
		mainWeather,
		setMainWeather
	}
}
