import React from 'react';
import { GameArea } from '../components/GameArea';
import { render } from '@testing-library/react'

describe('GameArea', () => {
    test('Should render without crash', async () => {
    
        render(<GameArea />)
    })
})

/* describe('When a key is pressed', () => {
    it('should call a function with the key as parameter if the key is z, q, s, d, ArrowUp, ArrowDown, ArrowRight, ArrowLeft', () => {
        
        const event = new KeyboardEvent('keydown', { key: 'z' });
        document.dispatchEvent(event);

        //Need to add React Testing Library to test the DOM
    })
})  */