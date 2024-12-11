import { useEffect } from 'react'
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
			style={{
				borderLeft: `${borderLeft}`,
				borderTop: `${borderTop}`,
				borderRight: `${borderRight}`,
				borderBottom: `${borderBottom}`,
			}}
		>
			{isPlayerHere ? <div id="player"></div> : null}
			{winningCase ? <div id="winningCase"></div> : null}
		</div>
	)
}
