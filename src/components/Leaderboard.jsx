import '../assets/css/Leaderboard.css'
import { useState, useEffect } from 'react'
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

	/* const leaderboard = [
		{ name: 'Joueur1', score: '100', date: '2024-12-07' },
		{ name: 'Joueur2', score: '600', date: '2024-12-07' },
		{ name: 'Joueur3', score: '800', date: '2024-12-07' },
		{ name: 'Joueur4', score: '300', date: '2024-12-06' },
		{ name: 'Joueur5', score: '900', date: '2024-12-06' },
		{ name: 'Joueur6', score: '560', date: '2024-12-06' },
		{ name: 'Joueur7', score: '90', date: '2024-12-06' },
		{ name: 'Joueur8', score: '450', date: '2024-12-05' },
		{ name: 'Joueur9', score: '700', date: '2024-12-05' },
		{ name: 'Joueur10', score: '320', date: '2024-12-05' },
		{ name: 'Joueur11', score: '150', date: '2024-12-04' },
		{ name: 'Joueur12', score: '480', date: '2024-12-04' },
		{ name: 'Joueur13', score: '620', date: '2024-12-04' },
		{ name: 'Joueur14', score: '530', date: '2024-12-03' },
		{ name: 'Joueur15', score: '410', date: '2024-12-03' },
		{ name: 'Joueur16', score: '290', date: '2024-12-07' },
		{ name: 'Joueur17', score: '370', date: '2024-12-07' },
		{ name: 'Joueur18', score: '510', date: '2024-12-07' },
		{ name: 'Joueur19', score: '680', date: '2024-12-07' },
		{ name: 'Joueur20', score: '720', date: '2024-12-07' },
		{ name: 'Joueur21', score: '330', date: '2024-12-07' },
		{ name: 'Joueur22', score: '590', date: '2024-12-07' },
		{ name: 'Joueur23', score: '470', date: '2024-11-30' },
		{ name: 'Joueur24', score: '650', date: '2024-11-30' },
		{ name: 'Joueur25', score: '780', date: '2024-11-30' },
		{ name: 'Joueur26', score: '860', date: '2024-11-29' },
		{ name: 'Joueur27', score: '920', date: '2024-11-29' },
	]
 */
	const yesterday = () => {
		setDate(new Date(date.setDate(date.getDate() - 1)))
	}
	const tomorrow = () => {
		setDate(new Date(date.setDate(date.getDate() + 1)))
	}

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
			case 11:
				return 'Décembre'
			default:
				return ''
		}
	}

	return (
		<div className="Leaderboard">
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
						<FontAwesomeIcon icon={faArrowLeft} size="1x" />
					</button>
					<p>{convertDate(date)}</p>
					<button onClick={tomorrow}>
						<FontAwesomeIcon icon={faArrowRight} size="1x" />
					</button>
				</div>
			</div>
		</div>
	)
}
