import React from 'react'
import classes from './MainLayout.module.css'

export default function Mainlayout({ children }) {
	return (
		<div className={ classes.layout }>{ children }</div>
	)
}
