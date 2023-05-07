import React from "react";

import githubIcon from './../media/socialIcons/githubIcon.svg'
import linkedinIcon from './../media/socialIcons/linkedinIcon.svg'

export const SocialMediaDefaultValue = {
	github: {
		icon: githubIcon,
		url: `https://github.com/KonradDominowski`,
		alt: `Github logo`
	},
	linkedin: {
		icon: linkedinIcon,
		url: `https://www.linkedin.com/in/konrad-dominowski-4767a8238/`,
		alt: `LinkedIn logo`
	}
}
export const SocialMediaContext = React.createContext()