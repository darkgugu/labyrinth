import React from 'react'
import '../assets/css/Commands.css'
import { ButtonArrow } from './ButtonArrow'

export const Commands = () => {
	return (
		<div className="Commands" data-testid="commands">
			<div className="topRow">
				<ButtonArrow direction={'up'} />
			</div>
			<div className="bottomRow">
				<ButtonArrow direction={'left'} />
				<ButtonArrow direction={'down'} />
				<ButtonArrow direction={'right'} />
			</div>
		</div>
	)
}
