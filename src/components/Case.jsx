import React, { useEffect } from 'react'
import '../assets/css/Case.css'

export const Case = ({
	borderLeft,
	borderTop,
	isPlayerHere,
	winningCase,
	onWin,
	borderRight,
	borderBottom,
}) => {
	useEffect(() => {
		if (isPlayerHere && winningCase) {
			onWin()
		}
	}, [isPlayerHere, winningCase, onWin])

	return (
		<div
			className="Case"
			data-testid="case"
			style={{
				borderLeft: `${borderLeft}`,
				borderTop: `${borderTop}`,
				borderRight: `${borderRight}`,
				borderBottom: `${borderBottom}`,
			}}
		>
			{isPlayerHere ? <div id="player" data-testid="player"></div> : null}
			{winningCase ? (
				<div id="winningCase" data-testid="winningcase"></div>
			) : null}
		</div>
	)
}
