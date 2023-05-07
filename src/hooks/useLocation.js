import { useState, useCallback } from "react"

export default function useLocation() {
	const [location, setLocation] = useState(null)

	const getLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLocation(position)
		})
	}, [])

	return {
		location,
		getLocation
	}
}