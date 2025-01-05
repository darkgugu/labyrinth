import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { GameArea } from '../components/GameArea'
import { getDatabase, ref, get, push } from 'firebase/database'

jest.mock('firebase/database', () => ({
	getDatabase: jest.fn(),
	ref: jest.fn(),
	get: jest.fn(),
	push: jest.fn(),
}))

describe('GameArea', () => {
	const setIsWonMock = jest.fn()
	const user = 'testUser'

	beforeEach(() => {
		jest.clearAllMocks()
	})
	test('Should render without crash', async () => {
		render(<GameArea />)
	})

	test('fetches and renders walls correctly', async () => {
		const mockWalls = {
			horizontal: Array(30).fill(Array(30).fill(0)),
			vertical: Array(30).fill(Array(30).fill(0)),
		}
		get.mockResolvedValueOnce({ exists: () => true, val: () => mockWalls })

		render(<GameArea user={user} isWon={false} setIsWon={setIsWonMock} />)

		await waitFor(() => expect(get).toHaveBeenCalled())
	})
})
