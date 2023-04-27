import React, { useState } from 'react'

import location_pin_on from './../media/location_pin_on.svg'
import location_pin_off from './../media/location_pin_off.svg'
import search from './../media/search.svg'

import classes from './Navbar.module.css'
import CityForm from './CityForm'

export default function Navbar({ notLocation, geoData, fetch_weather }) {
	const [showCityForm, setShowCityForm] = useState(false)

	const handleToggleCityForm = () => {
		setShowCityForm(state => !state)
	}

	return (
		<>
			<nav>
				<button className={ classes.navButton }>
					<img className={ classes.navIcon } src={ search } />
				</button>
				<p>
					<img
						className={ classes.icon }
						src={ (notLocation) ? location_pin_off : location_pin_on } />
					{ `${geoData?.city}, ${geoData?.country}` }

				</p>
				<button className={ classes.navButton } onClick={ handleToggleCityForm }>
					<img className={ classes.navIcon } src={ search } />
				</button>
				<div className={ classes.searchCity }>
					{ showCityForm && <CityForm showCityForm={ showCityForm } fetch_weather={ fetch_weather } setShowCityForm={ setShowCityForm } /> }
				</div>
			</nav>

		</>
	)
}
