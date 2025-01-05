import React from 'react'
import { render, screen } from '@testing-library/react'
import { Case } from '../components/Case'

describe('Unit tests for Case', () => {
	test('Should render without trigger callback', () => {
		let isPlayerHere = false
		let winningCase = false

		const spyOnWin = jest.fn()

		render(
			<Case
				borderLeft={4}
				borderTop={3}
				isPlayerHere={isPlayerHere}
				winningCase={winningCase}
				onWin={spyOnWin}
				borderRight={5}
				borderBottom={6}
			/>
		)

		const container = screen.getByTestId('case')
		expect(container).toBeInTheDocument()
		expect(container).toHaveStyle('borderLeft: 4')
		expect(container).toHaveStyle('borderTop: 3')
		expect(container).toHaveStyle('borderRight: 5')
		expect(container).toHaveStyle('borderBottom: 6')

		expect(spyOnWin).not.toHaveBeenCalled()

		let element = screen.queryByTestId('player')
		expect(element).not.toBeInTheDocument()
		element = screen.queryByTestId('winningcase')
		expect(element).not.toBeInTheDocument()
	})
	test('Should trigger callback when player is on winning case', () => {
		let isPlayerHere = true
		let winningCase = true

		const spyOnWin = jest.fn()

		render(
			<Case
				borderLeft={4}
				borderTop={3}
				isPlayerHere={isPlayerHere}
				winningCase={winningCase}
				onWin={spyOnWin}
				borderRight={5}
				borderBottom={6}
			/>
		)

		const container = screen.getByTestId('case')
		expect(container).toBeInTheDocument()
		expect(container).toHaveStyle('borderLeft: 4')
		expect(container).toHaveStyle('borderTop: 3')
		expect(container).toHaveStyle('borderRight: 5')
		expect(container).toHaveStyle('borderBottom: 6')

		expect(spyOnWin).toHaveBeenCalled()

		let element = screen.queryByTestId('player')
		expect(element).toBeInTheDocument()
		element = screen.queryByTestId('winningcase')
		expect(element).toBeInTheDocument()
	})
})
