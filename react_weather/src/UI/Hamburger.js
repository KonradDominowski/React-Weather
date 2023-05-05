import React, { useState } from 'react'
import classes from './Hamburgers.module.css'

export default function Hamburger({ className }) {
	const [isActive, setIsActive] = useState(false)


	const handleClick = () => {
		setIsActive(state => !state)
	}

	const classesNames = `${className} ${classes.hamburger} ${classes['hamburger--spin']} ${(isActive) ? classes['is-active'] : ''}`

	return (
		<button
			className={ classesNames }
			onClick={ handleClick }
			type="button">
			<span className={ classes['hamburger-box'] }>
				<span className={ classes["hamburger-inner"] }></span>
			</span>
		</button>
	)
}
