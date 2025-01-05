import { useEffect, useState } from 'react'
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
	const [isVisited, setIsVisited] = useState()
	useEffect(() => {
		if (isPlayerHere && winningCase) {
			onWin()
		}
		if (isPlayerHere) {
			setIsVisited(true)
		}
		if (winningCase) {
			setIsVisited(true)
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
			{/* isVisited ? <Mask /> : null */}
		</div>
	)
}
