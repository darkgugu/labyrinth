import '../assets/css/GameArea.css'
import { useState } from 'react'
import { useEffect } from 'react'
import database from '../firebaseConfig'
import { ref, get } from 'firebase/database'
import { Case } from './Case'

export const GameArea = () => {
	const [walls, setWalls] = useState(null)

	useEffect(() => {
		// Fetch walls data from Realtime Database
		const fetchWalls = async () => {
			try {
				const snapshot = await get(ref(database, 'walls'))
				if (snapshot.exists()) {
					setWalls(snapshot.val())
					console.log('walls:', snapshot.val())
				} else {
					setWalls({ message: 'No data available' })
				}
			} catch (error) {
				console.error('Error fetching walls data:', error)
				setWalls({ message: 'Failed to fetch data' })
			}
		}

		fetchWalls()
	}, [])

	if (!walls) return <div>Loading...</div>

	const checkForWalls = (matrice, position) => {
		if (matrice[position[0]][position[1]] === 1) {
			return true
		}
	}

	let caseArray = []

	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			caseArray.push(
				<Case
					key={`${i},${j}`}
					borderLeft={
						checkForWalls(walls.vertical, [i, j])
							? '1px solid black'
							: null
					}
					borderTop={
						checkForWalls(walls.horizontal, [i, j])
							? '1px solid black'
							: null
					}
				/>
			)
		}
	}

	return (
		<div className="GameArea">
			<div className="gameWindow">{caseArray}</div>
		</div>
	)
}
