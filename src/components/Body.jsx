import React from 'react'
import '../assets/css/Body.css'
import { Commands } from './Commands'
import { GameArea } from './GameArea'
import { Leaderboard } from './Leaderboard'
import { Rules } from './Rules'

export const Body = () => {
	return (
		<div className="Body" data-testid="body">
			<div className="leftPart">
				<GameArea />
				<Commands />
			</div>
			<div className="rightPart">
				<Leaderboard />
				<Rules />
			</div>
		</div>
	)
}
