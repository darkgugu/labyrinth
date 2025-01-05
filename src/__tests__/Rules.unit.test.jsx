import React from 'react'
import { render, screen } from '@testing-library/react'
import { Rules } from '../components/Rules'

describe('Unit tests for Rules', () => {
	test('Should render without crashing', () => {
		render(<Rules />)

		const container = screen.getByTestId('rules')
		expect(container).toBeInTheDocument()
	})
})
