import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../components/Footer'

describe('Unit tests for Footer', () => {
	test('Should render without crashing', () => {
		render(<Footer />)

		const container = screen.getByTestId('footer')
		expect(container).toBeInTheDocument()
	})
})
