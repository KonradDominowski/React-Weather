import React from 'react'

import classes from './Spinner2.module.css'

export default function Spinner2() {
	return (
		<div className={ classes['sk-chase'] }>
			<div className={ classes['sk-chase-dot'] }></div>
			<div className={ classes['sk-chase-dot'] }></div>
			<div className={ classes['sk-chase-dot'] }></div>
			<div className={ classes['sk-chase-dot'] }></div>
			<div className={ classes['sk-chase-dot'] }></div>
			<div className={ classes['sk-chase-dot'] }></div>
		</ div>
	)
}
