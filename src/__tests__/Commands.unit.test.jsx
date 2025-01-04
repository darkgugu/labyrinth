import React from 'react'
import { render, screen } from '@testing-library/react'
import { Commands } from '../components/Commands'

jest.mock('../components/ButtonArrow', () => {
	return {
		ButtonArrow: ({ direction }) => {
			return <div data-testid={'ButtonArrow_' + direction}></div>
		},
	}
})

describe('Unit tests for Commands', () => {
	test('Should render without crashing', () => {
		render(<Commands />)

		const container = screen.getByTestId('commands')
		expect(container).toBeInTheDocument()

		let element = screen.getByTestId('ButtonArrow_up')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('ButtonArrow_left')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('ButtonArrow_down')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('ButtonArrow_right')
		expect(element).toBeInTheDocument()
	})
})
