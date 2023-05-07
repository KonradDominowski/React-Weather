import React from 'react'

export default function SocialMediaButton({ socialMedia }) {
	return (
		<button onClick={ () => { window.open(socialMedia.url) } }>
			<img src={ socialMedia.icon } alt={ socialMedia.alt } />
		</button>
	)
}
