import React from 'react'
import classes from './Spinner.module.css'

export default function Spinner() {
	return (
		<div className={ classes['lds-hourglass'] }></div>
	)
}
