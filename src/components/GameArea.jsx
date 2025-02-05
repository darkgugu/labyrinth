import '../assets/css/GameArea.css'
import React, { useState, useEffect } from 'react'
import database from '../firebaseConfig'
import { ref, get, push } from 'firebase/database'
import { Case } from './Case'

export const GameArea = ({ user, isWon, setIsWon }) => {
	const [walls, setWalls] = useState(null)
	const [playerPosition, setPlayerPosition] = useState([0, 0])
	const [steps, setSteps] = useState(0)

	const labSize = 30

	useEffect(() => {
		// Fetch walls data from Realtime Database
		const fetchWalls = async () => {
			try {
				const snapshot = await get(ref(database, 'walls'))
				if (snapshot.exists()) {
					setWalls(snapshot.val())
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

	useEffect(() => {
		const sendScore = async () => {
			if (isWon) {
				try {
					console.log('Sending score:', steps)
					await push(ref(database, `scores`), {
						user: user,
						score: steps,
						date: new Date().toISOString().split('T')[0],
					})
				} catch (error) {
					console.error('Error sending score:', error)
				}
			}
		}
		if (user !== null) {
			sendScore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isWon, steps])

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.key) {
				case 'ArrowUp':
				case 'z':
					if (outOfBoundsMove('up', playerPosition)) {
						break
					}
					if (isWall(walls.horizontal, 'up', playerPosition)) {
						break
					}
					setPlayerPosition([
						playerPosition[0] - 1,
						playerPosition[1],
					])
					setSteps(steps + 1)
					break
				case 'ArrowLeft':
				case 'q':
					if (outOfBoundsMove('left', playerPosition)) {
						break
					}
					if (isWall(walls.vertical, 'left', playerPosition)) {
						break
					}
					setPlayerPosition([
						playerPosition[0],
						playerPosition[1] - 1,
					])
					setSteps(steps + 1)
					break
				case 'ArrowDown':
				case 's':
					if (outOfBoundsMove('down', playerPosition)) {
						break
					}
					if (isWall(walls.horizontal, 'down', playerPosition)) {
						break
					}
					setPlayerPosition([
						playerPosition[0] + 1,
						playerPosition[1],
					])
					setSteps(steps + 1)
					break
				case 'ArrowRight':
				case 'd':
					if (outOfBoundsMove('right', playerPosition)) {
						break
					}
					if (isWall(walls.vertical, 'right', playerPosition)) {
						break
					}
					setPlayerPosition([
						playerPosition[0],
						playerPosition[1] + 1,
					])
					setSteps(steps + 1)
					break
				case 'l':
					setPlayerPosition([labSize - 1, labSize - 1])
					setSteps(steps + 1)
					break
				default:
					break
			}
		}
		document.addEventListener('keydown', handleKeyDown)

		// Don't forget to clean up
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown)
		}
	})

	if (!walls) return <div></div>

	const checkForWalls = (matrice, position) => {
		if (matrice[position[0]][position[1]] === 1) {
			return true
		}
	}

	let caseArray = []

	for (let i = 0; i < labSize; i++) {
		for (let j = 0; j < labSize; j++) {
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
					winningCase={
						i === labSize - 1 && j === labSize - 1 ? true : false
					}
					onWin={() => setIsWon(true)}
					borderRight={j === labSize - 1 ? '1px solid black' : null}
					borderBottom={i === labSize - 1 ? '1px solid black' : null}
				/>
			)
		}
	}

	const outOfBoundsMove = (direction, position) => {
		if (position[0] === 0 && direction === 'up') {
			return true
		} else if (position[0] === labSize - 1 && direction === 'down') {
			return true
		} else if (position[1] === 0 && direction === 'left') {
			return true
		} else if (position[1] === labSize - 1 && direction === 'right') {
			return true
		}
	}

	const isWall = (matrice, direction, position) => {
		switch (direction) {
			case 'right':
				return matrice[position[0]][position[1] + 1] === 1
			case 'left':
				return matrice[position[0]][position[1]] === 1
			case 'up':
				return matrice[position[0]][position[1]] === 1
			case 'down':
				return matrice[position[0] + 1][position[1]] === 1
			default:
				break
		}
		return true
	}

	if (isWon) {
		console.log('You won in', steps, 'steps')
	}

	return (
		<div className="GameArea">
			<div className="gameWindow">
				{!isWon ? (
					caseArray
				) : (
					<p>Bravo ! Tu as terminé en {steps} mouvements !</p>
				)}
			</div>
			{/* <Mask /> */}
		</div>
	)
}
