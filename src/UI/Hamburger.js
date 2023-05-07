import React from 'react'
import classes from './Hamburgers.module.css'

export default function Hamburger({ isActive, setIsActive }) {
	const classesNames = `${classes.hamburger} ${classes['hamburger--spin']} ${(isActive) ? classes['is-active'] : ''}`

	return (
		<>
			<button
				className={ classesNames }
				onClick={ (e) => {
					setIsActive(state => !state)
				}
				}
				type="button">
				<span className={ classes['hamburger-box'] }>
					<span className={ classes["hamburger-inner"] }></span>
				</span>
			</button>
		</>

	)
}
