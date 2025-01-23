import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ButtonArrow } from '../components/ButtonArrow'

describe('Unit tests for ButtonArrow', () => {
	test('Should render an up arrow', () => {
		const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent')

		render(<ButtonArrow direction="up" />)

		const container = screen.getByTestId('buttonarrow')
		expect(container).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-up fa-2x '
		)

		fireEvent.click(icon)

		expect(spyDispatchEvent).toHaveBeenCalledWith(
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'ArrowUp',
				code: 'ArrowUp',
			})
		)
	})
	test('Should render a left arrow', () => {
		const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent')

		render(<ButtonArrow direction="left" />)

		const container = screen.getByTestId('buttonarrow')
		expect(container).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-left fa-2x '
		)

		fireEvent.click(icon)

		expect(spyDispatchEvent).toHaveBeenCalledWith(
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'ArrowLeft',
				code: 'ArrowLeft',
			})
		)
	})
	test('Should render a down arrow', () => {
		const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent')

		render(<ButtonArrow direction="down" />)

		const container = screen.getByTestId('buttonarrow')
		expect(container).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-down fa-2x '
		)

		fireEvent.click(icon)

		expect(spyDispatchEvent).toHaveBeenCalledWith(
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'ArrowDown',
				code: 'ArrowDown',
			})
		)
	})
	test('Should render a right arrow', () => {
		const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent')

		render(<ButtonArrow direction="right" />)

		const container = screen.getByTestId('buttonarrow')
		expect(container).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-right fa-2x '
		)

		fireEvent.click(icon)

		expect(spyDispatchEvent).toHaveBeenCalledWith(
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'ArrowRight',
				code: 'ArrowRight',
			})
		)
	})
	test('Should render with invalide direction', () => {
		const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent')

		render(<ButtonArrow direction="invalid" />)

		const container = screen.getByTestId('buttonarrow')
		expect(container).toBeInTheDocument()

		const icon = screen.queryByTestId('icon')
		expect(icon).not.toBeInTheDocument()

		fireEvent.click(container)

		expect(spyDispatchEvent).toHaveBeenCalledWith(
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'ArrowRight',
				code: 'ArrowRight',
			})
		)
	})
})
