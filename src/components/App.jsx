// App.js
import React, { useState } from 'react'
import '../assets/App.css'
import { Footer } from './Footer'
import { Header } from './Header'
import { Body } from './Body'

export default function App() {
	const [user, setUser] = useState(null)

	return (
		<div className="App" data-testid="app">
			<Header user={user} setUser={setUser} />
			<Body user={user} />
			<Footer />
		</div>
	)
}
