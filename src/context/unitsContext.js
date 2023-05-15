import React from "react";

export const UnitsContext = React.createContext({
	metricUnits: true,
	setMetricUnits: () => { },
	displayTemp: () => { },
	displayWindSpeed: () => { }
})