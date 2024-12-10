import '../assets/css/ButtonArrow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const ButtonArrow = ({ direction }) => {
	const dispatchGlobalKeyDown = () => {
		let key
		switch (direction) {
			case 'up':
				key = 'ArrowUp'
				break
			case 'left':
				key = 'ArrowLeft'
				break
			case 'down':
				key = 'ArrowDown'
				break
			case 'right':
				key = 'ArrowRight'
				break
			default:
				key = 'ArrowRight'
		}

		const event = new KeyboardEvent('keydown', {
			key: key,
			code: key,
			keyCode:
				key === 'ArrowUp'
					? 38
					: key === 'ArrowLeft'
					? 37
					: key === 'ArrowDown'
					? 40
					: 39,
			charCode:
				key === 'ArrowUp'
					? 38
					: key === 'ArrowLeft'
					? 37
					: key === 'ArrowDown'
					? 40
					: 39,
			bubbles: true,
			cancelable: true,
		})
		document.dispatchEvent(event) // Dispatch globally
	}

	let icon
	switch (direction) {
		case 'up':
			icon = <FontAwesomeIcon icon={faArrowUp} size="2x" />
			break
		case 'left':
			icon = <FontAwesomeIcon icon={faArrowLeft} size="2x" />
			break
		case 'down':
			icon = <FontAwesomeIcon icon={faArrowDown} size="2x" />
			break
		case 'right':
			icon = <FontAwesomeIcon icon={faArrowRight} size="2x" />
			break
		default:
			icon = null
	}

	return (
		<div className="ButtonArrow" onClick={dispatchGlobalKeyDown}>
			{icon}
		</div>
	)
}
