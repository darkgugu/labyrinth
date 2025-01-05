import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../components/Header'

describe('Unit tests for Header', () => {
	test('Should render without crashing', () => {
		render(<Header />)

		const container = screen.getByTestId('header')
		expect(container).toBeInTheDocument()
	})
})
