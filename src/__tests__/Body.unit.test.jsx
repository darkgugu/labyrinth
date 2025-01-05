import React from 'react'
import { render, screen } from '@testing-library/react'
import { Body } from '../components/Body'

jest.mock('../components/Commands', () => {
	return {
		Commands: () => {
			return <div data-testid="commands"></div>
		},
	}
})
jest.mock('../components/GameArea', () => {
	return {
		GameArea: () => {
			return <div data-testid="gamearea"></div>
		},
	}
})
jest.mock('../components/Leaderboard', () => {
	return {
		Leaderboard: () => {
			return <div data-testid="leaderboard"></div>
		},
	}
})
jest.mock('../components/Rules', () => {
	return {
		Rules: () => {
			return <div data-testid="rules"></div>
		},
	}
})

describe('Unit tests for Body', () => {
	test('Should render without crashing', () => {
		render(<Body />)

		const container = screen.getByTestId('body')
		expect(container).toBeInTheDocument()

		let element = screen.getByTestId('commands')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('gamearea')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('leaderboard')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('rules')
		expect(element).toBeInTheDocument()
	})
})
