import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Leaderboard } from '../components/Leaderboard'

describe('Unit tests for Leaderboard', () => {
	test('Should display the leaderboard', () => {
		jest.useFakeTimers()
		jest.setSystemTime(new Date('1998-07-14T09:00:00.000Z'))

		render(<Leaderboard />)

		const leaderboard = screen.getByTestId('leaderboard')
		expect(leaderboard).toBeInTheDocument()

		// TODO: Check scores display when firebase is implemented

		const date = screen.getByTestId('date')
		expect(date).toHaveTextContent('14 Juillet')

		let element = screen.getByTestId('yesterday')
		expect(element).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-left fa-1x '
		)

		fireEvent.click(element)

		expect(date).toHaveTextContent('13 Juillet')

		element = screen.getByTestId('tomorrow')
		expect(element).toHaveAttribute(
			'class',
			'svg-inline--fa fa-arrow-right fa-1x '
		)

		fireEvent.click(element)
		fireEvent.click(element)

		expect(date).toHaveTextContent('15 Juillet')

		jest.useRealTimers()
	})
	describe('Should display all months', () => {
		test('For January', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-01-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Janvier')
		})
		test('For February', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-02-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Février')
		})
		test('For March', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-03-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Mars')
		})
		test('For April', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-04-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Avril')
		})
		test('For May', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-05-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Mai')
		})
		test('For June', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-06-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Juin')
		})
		test('For July', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-07-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Juillet')
		})
		test('For August', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-08-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Août')
		})
		test('For September', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-09-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Septembre')
		})
		test('For October', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-10-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Octobre')
		})
		test('For November', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-11-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Novembre')
		})
		test('For December', () => {
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2000-12-01T09:00:00.000Z'))

			render(<Leaderboard />)

			const leaderboard = screen.getByTestId('leaderboard')
			expect(leaderboard).toBeInTheDocument()

			const date = screen.getByTestId('date')
			expect(date).toHaveTextContent('1 Décembre')
		})
	})
})
