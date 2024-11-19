import { keyHandler } from '../components/GameArea';

describe('When a key is pressed', () => {
    it('should call a function with the key as parameter if the key is z, q, s, d, ArrowUp, ArrowDown, ArrowRight, ArrowLeft', () => {
        
        const event = new KeyboardEvent('keydown', { key: 'z' });
        document.dispatchEvent(event);

        //Need to add React Testing Library to test the DOM
    })
})