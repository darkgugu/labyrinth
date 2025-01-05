import '../assets/css/Leaderboard.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import database from '../firebaseConfig'
import { ref, get } from 'firebase/database'

export const Leaderboard = () => {
	const [date, setDate] = useState(new Date())
	const [leaderboard, setLeaderboard] = useState([])

	useEffect(() => {
		const fetchScores = async () => {
			try {
				const snapshot = await get(ref(database, 'scores'))
				if (snapshot.exists()) {
					console.log(snapshot.val())
					Object.keys(snapshot.val()).forEach((key) =>
						setLeaderboard((prev) => [...prev, snapshot.val()[key]])
					)
				} else {
					console.log('Error')
				}
			} catch (error) {
				console.error('Error fetching leaderboard data:', error)
			}
		}

		fetchScores()
	}, [])

	const convertDate = (date) => {
		let newDate = ''
		newDate += date.getDate() + ' ' + month(date)
		return newDate
	}

	const month = (date) => {
		switch (date.getMonth()) {
			case 0:
				return 'Janvier'
			case 1:
				return 'Février'
			case 2:
				return 'Mars'
			case 3:
				return 'Avril'
			case 4:
				return 'Mai'
			case 5:
				return 'Juin'
			case 6:
				return 'Juillet'
			case 7:
				return 'Août'
			case 8:
				return 'Septembre'
			case 9:
				return 'Octobre'
			case 10:
				return 'Novembre'
			default:
				return 'Décembre'
		}
	}

	const yesterday = () => {
		setDate(new Date(date.setDate(date.getDate() - 1)))
	}
	const tomorrow = () => {
		setDate(new Date(date.setDate(date.getDate() + 1)))
	}

	return (
		<div className="Leaderboard" data-testid="leaderboard">
			<div className="leaderboardWindow">
				<div className="title">Leaderboard</div>
				<div className="rows">
					<div className="rowName">
						<p>Nom du joueur</p>
						{leaderboard
							.filter(
								(player) =>
									player.date ===
									date.toISOString().split('T')[0]
							)
							.sort((a, b) => b.score - a.score)
							.map((player, index) => (
								<p key={index}>{player.user}</p>
							))}
					</div>
					<div className="rowScore">
						<p>Score</p>
						{leaderboard
							.filter(
								(player) =>
									player.date ===
									date.toISOString().split('T')[0]
							)
							.sort((a, b) => b.score - a.score)
							.map((player, index) => (
								<p key={index}>{player.score}</p>
							))}
					</div>
				</div>
				<div className="date">
					<button onClick={yesterday}>
						<FontAwesomeIcon
							data-testid="yesterday"
							icon={faArrowLeft}
							size="1x"
						/>
					</button>
					<p data-testid="date">{convertDate(date)}</p>
					<button onClick={tomorrow}>
						<FontAwesomeIcon
							data-testid="tomorrow"
							icon={faArrowRight}
							size="1x"
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
