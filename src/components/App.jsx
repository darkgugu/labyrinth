import React from 'react'
import '../assets/App.css'
import { Footer } from './Footer'
import { Header } from './Header'
import { Body } from './Body'

export default function App() {
	return (
		<div className="App" data-testid="app">
			<Header />
			<Body />
			<Footer />
		</div>
	)
}
