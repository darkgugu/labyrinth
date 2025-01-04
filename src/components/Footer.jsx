import React from 'react'
import '../assets/css/Footer.css'

export const Footer = () => {
	return (
		<div className="Footer" data-testid="footer">
			<p>
				Auteurs : <a href="https://github.com/darkgugu">Darkgugu</a>,{' '}
				<a href="https://github.com/GiaPen">GiaPen</a>,{' '}
				<a href="https://github.com/HarleZe">HarleZe</a>
			</p>
			<p>Tous droits réservés</p>
		</div>
	)
}
