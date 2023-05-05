import React, { useContext } from 'react'

import location_pin_on from './../media/location_pin_on.svg'
import location_pin_off from './../media/location_pin_off.svg'
import search from './../media/search.svg'

import classes from './Navbar.module.css'
import Modal from './Modal'
import { mainWeatherContext } from '../context/mainWeatherContext'
import Spinner2 from './Spinner2'
import Hamburger from './Hamburger'

export default function Navbar() {
	const { geoData, fetch_weather, fetchedFromCurrentLocation, location, getLocation, showModal, setShowModal, isLoading } = useContext(mainWeatherContext)

	const handleClick = () => {
		getLocation()
		fetch_weather({ location: location })
	}

	return (
		<>
			<nav>
				<Hamburger className={ classes.navButton } />
				{/* <button className={ classes.navButton }> */ }
				{/* <img className={ classes.navIcon } src={ search } /> */ }
				{/* </button> */ }
				<p>
					<button className={ classes.navButton }
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
									} />
						}

					</button>
					{ `${geoData?.city}, ${geoData?.country}` }

				</p>
				<button className={ classes.navButton }
					onClick={ () => { setShowModal(state => !state) } }
				>
					<img className={ classes.navIcon } src={ search } />
				</button>
				<div className={ classes.searchCity }
					onClick={ e => {
						if (e.target.classList.value.includes('backdrop')) {
							setShowModal(state => !state)
						}
					} }
				>
					{ showModal && <Modal show={ true } /> }
				</div>
			</nav>
		</>
	)
}
