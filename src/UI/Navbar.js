import React, { useContext, useState } from 'react'

import classes from './Navbar.module.css'

import location_pin_on from './../media/location_pin_on.svg'
import location_pin_off from './../media/location_pin_off.svg'
import search from './../media/search.svg'

import Modal from './Modal'
import { WeatherContext } from '../context/weatherContext'
import { SocialMediaContext } from '../context/socialMediaContext'
import Spinner2 from './Spinner2'
import Hamburger from './Hamburger'
import SocialMediaButton from './SocialMediaButton'

export default function Navbar() {
	const { geoData, fetch_weather, fetchedFromCurrentLocation, location, getLocation, showModal, setShowModal, isLoading } = useContext(WeatherContext)
	const { github, linkedin } = useContext(SocialMediaContext)
	const [hamIsActive, setHamIsActive] = useState(null)

	const handleClick = () => {
		getLocation()
		fetch_weather({ location: location })
	}

	return (
		<>
			<nav>
				<div className={ classes.hamburgerContainer }>
					<Hamburger
						isActive={ hamIsActive }
						setIsActive={ setHamIsActive } />
					{ hamIsActive && <div className={ classes.contactInfo }>
						<SocialMediaButton
							socialMedia={ github } />
						<SocialMediaButton
							socialMedia={ linkedin } />
					</div> }
				</div>
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
					{ `${geoData?.city}, ${geoData?.country}` }
				</p>
				<button onClick={ () => { setShowModal(state => !state) } }>
					<img className={ classes.navIcon } src={ search } alt='Search icon' />
				</button>
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
