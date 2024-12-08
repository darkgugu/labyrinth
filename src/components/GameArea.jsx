import '../assets/css/GameArea.css'
import { useState } from 'react'
import { useEffect } from 'react'
import database from '../firebaseConfig'
import { ref, get } from 'firebase/database'
import { Case } from './Case'

//TEST

export const GameArea = () => {
	const [walls, setWalls] = useState(null)
	const [playerPosition, setPlayerPosition] = useState([0, 0])

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

	if (!walls) return <div></div>

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
					isPlayerHere={
						playerPosition[0] === i && playerPosition[1] === j
					}
				/>
			)
		}
	}

	const handleKeyDown = (e) => {
		switch (e.key) {
			case 'ArrowUp':
			case 'z':
				if (outOfBoundsMove('up', playerPosition)) {
					break
				}
				setPlayerPosition([playerPosition[0] - 1, playerPosition[1]])
				break
			case 'ArrowLeft':
			case 'q':
				if (outOfBoundsMove('left', playerPosition)) {
					break
				}
				setPlayerPosition([playerPosition[0], playerPosition[1] - 1])
				break
			case 'ArrowDown':
			case 's':
				if (outOfBoundsMove('down', playerPosition)) {
					break
				}
				setPlayerPosition([playerPosition[0] + 1, playerPosition[1]])
				break
			case 'ArrowRight':
			case 'd':
				if (outOfBoundsMove('right', playerPosition)) {
					break
				}
				setPlayerPosition([playerPosition[0], playerPosition[1] + 1])
				break
			default:
				break
		}
	}

	const outOfBoundsMove = (direction, position) => {
		if (position[0] === 0 && direction === 'up') {
			return true
		} else if (position[0] === 14 && direction === 'down') {
			return true
		} else if (position[1] === 0 && direction === 'left') {
			return true
		} else if (position[1] === 14 && direction === 'right') {
			return true
		}
	}

	return (
		<div className="GameArea">
			<div className="gameWindow" onKeyDown={handleKeyDown} tabIndex={0}>
				{caseArray}
			</div>
		</div>
	)
}
