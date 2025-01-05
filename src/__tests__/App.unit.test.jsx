import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../components/App'

jest.mock('../components/Footer', () => {
	return {
		Footer: () => {
			return <div data-testid="footer"></div>
		},
	}
})
jest.mock('../components/Header', () => {
	return {
		Header: () => {
			return <div data-testid="header"></div>
		},
	}
})
jest.mock('../components/Body', () => {
	return {
		Body: () => {
			return <div data-testid="body"></div>
		},
	}
})

describe('Unit tests for App', () => {
	test('Should render without crashing', () => {
		render(<App />)

		const container = screen.getByTestId('app')
		expect(container).toBeInTheDocument()

		let element = screen.getByTestId('header')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('body')
		expect(element).toBeInTheDocument()
		element = screen.getByTestId('footer')
		expect(element).toBeInTheDocument()
	})
})
