import React, { useContext, useState } from 'react'

import classes from './Navbar.module.css'

import location_pin_on from './../media/location_pin_on.svg'
import location_pin_off from './../media/location_pin_off.svg'
import search from './../media/search.svg'
import fahrenheit from './../media/fahrenheit.svg'
import celsius from './../media/celsius.svg'
import close from './../media/close.svg'

import Modal from './Modal'
import { WeatherContext } from '../context/weatherContext'
import { SocialMediaContext } from '../context/socialMediaContext'
import { UnitsContext } from './../context/unitsContext'
import Spinner2 from './Spinner2'
import Hamburger from './Hamburger'
import SocialMediaButton from './SocialMediaButton'

export default function Navbar() {
	const { geoData, fetch_weather, fetchedFromCurrentLocation, location, getLocation, showModal, setShowModal, isLoading } = useContext(WeatherContext)
	const { github, linkedin } = useContext(SocialMediaContext)
	const { metricUnits, setMetricUnits } = useContext(UnitsContext)
	const [hamIsActive, setHamIsActive] = useState(null)
	const [locationError, setLocationError] = useState(false)

	const contactInfoClasses = hamIsActive ? classes.contactInfo : `${classes.contactInfo} + ${classes.hidden}`
	const fallbackClasses = locationError ? classes.fallback : `${classes.fallback} ${classes.hidden}`

	const handleClick = () => {
		if (!location) {
			setLocationError(true)
			getLocation()
		} else {
			setLocationError(false)
			fetch_weather({ location: location })
		}
	}

	return (
		<>
			<nav>
				<div className={ classes.hamburgerContainer }>
					<Hamburger
						isActive={ hamIsActive }
						setIsActive={ setHamIsActive } />
					<div className={ contactInfoClasses }>
						<SocialMediaButton
							socialMedia={ github } />
						<SocialMediaButton
							socialMedia={ linkedin } />
					</div>
				</div>
				<div>
					<p>
						<button
							onClick={ handleClick }>
							{
								(isLoading)
									? <Spinner2 />
									: <img
										className={ classes.navIcon }
										src={
											fetchedFromCurrentLocation ?
												location_pin_on :
												location_pin_off
										}
										alt='Location pin' />
							}
						</button>
						{ `${geoData?.city}, ${geoData?.country_code.toUpperCase()}` }
					</p>
					<div className={ fallbackClasses }>
						<p>Oops. It looks like the location is turned off.</p>
						<img src={ close } alt="Close icon" onClick={ () => setLocationError(false) } />
					</div>
				</div>
				<div>
					{/* <button className={ classes.flipContainer } onClick={ () => { setMetricUnits(state => !state) } } >
						<div className={ classes.flipper }>
							<img className={ classes.front } src={ celsius } alt='Search icon' />
							<img className={ classes.back } src={ fahrenheit } alt='Search icon' />
						</div>
					</button> */}
					<button onClick={ () => { setMetricUnits(state => !state) } }>
						<img src={ metricUnits ? celsius : fahrenheit } alt='Search icon' />
					</button>
					<button onClick={ () => { setShowModal(state => !state) } }>
						<img src={ search } alt='Search icon' />
					</button>
				</div>
				<div className={ classes.searchCity }
					onClick={ e => {
						if (e.target.classList.value.includes('backdrop')) {
							setShowModal(state => !state)
						}
					} }>
					{ showModal && <Modal showImmediately={ true } /> }
				</div>
			</nav>
		</>
	)
}
