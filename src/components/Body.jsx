import React, { useState } from 'react'
import '../assets/css/Body.css'
import { Commands } from './Commands'
import { GameArea } from './GameArea'
import { Leaderboard } from './Leaderboard'
import { Rules } from './Rules'

export const Body = ({ user }) => {
	const [isWon, setIsWon] = useState(false)

	return (
		<div className="Body" data-testid="body">
			<div className="leftPart">
				<GameArea user={user} isWon={isWon} setIsWon={setIsWon} />
				<Commands />
			</div>
			<div className="rightPart">
				<Leaderboard isWon={isWon} />
				<Rules />
			</div>
		</div>
	)
}
