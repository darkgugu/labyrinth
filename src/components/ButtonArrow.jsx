import '../assets/css/ButtonArrow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const ButtonArrow = ({ direction }) => {
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

	return <div className="ButtonArrow">{icon}</div>
}
