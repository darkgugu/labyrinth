import '../assets/css/Case.css'

export const Case = ({ borderLeft, borderTop, isPlayerHere }) => {
	//const borderLeft = '1px solid black'
	//const borderTop = '1px solid black'

	return (
		<div
			className="Case"
			style={{ borderLeft: `${borderLeft}`, borderTop: `${borderTop}` }}
		>
			{isPlayerHere ? <div id="player"></div> : null}
		</div>
	)
}
