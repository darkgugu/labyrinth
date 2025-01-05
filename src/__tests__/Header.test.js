import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/Header';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';



jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  get: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Nettoyer les mocks entre les tests
  });

  test('renders the header and buttons for login and signup', () => {
    render(<Header />);
    expect(screen.getByText('Labyrinth')).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Inscription')).toBeInTheDocument();
  });

  test('opens and closes the login modal', async () => {
    render(<Header />);

    // Ouvrir la modale de connexion
    fireEvent.click(screen.getByText('Connexion'));
    expect(screen.getByText('Connexion')).toBeInTheDocument();

    // Fermer la modale de connexion
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    await waitFor(() => expect(screen.queryByText('Connexion')).not.toBeInTheDocument());
  });

  test('opens and closes the signup modal', async () => {
    render(<Header />);

    // Ouvrir la modale d'inscription
    fireEvent.click(screen.getByText('Inscription'));
    expect(screen.getByText('Inscription')).toBeInTheDocument();

    // Fermer la modale d'inscription
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    await waitFor(() => expect(screen.queryByText('Inscription')).not.toBeInTheDocument());
  });

  test('displays error message on login with invalid credentials', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));

    render(<Header />);
    fireEvent.click(screen.getByText('Connexion'));

    fireEvent.change(screen.getByPlaceholderText('Entrez votre email'), { target: { value: 'invalid@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Entrez votre mot de passe'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => expect(screen.getByText('Identifiants incorrects')).toBeInTheDocument());
  });

  test('logs in the user successfully', async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@test.com' },
    });

    render(<Header />);
    fireEvent.click(screen.getByText('Connexion'));

    fireEvent.change(screen.getByPlaceholderText('Entrez votre email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Entrez votre mot de passe'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => expect(screen.getByText('test@test.com')).toBeInTheDocument());
  });

  test('logs out the user', async () => {
    signOut.mockResolvedValue();

    render(<Header />);
    fireEvent.click(screen.getByText('Connexion'));

    // Simuler connexion utilisateur
    fireEvent.change(screen.getByPlaceholderText('Entrez votre email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Entrez votre mot de passe'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => expect(screen.getByText('test@test.com')).toBeInTheDocument());

    // Déconnexion
    fireEvent.click(screen.getByText('Se déconnecter'));
    await waitFor(() => expect(screen.queryByText('test@test.com')).not.toBeInTheDocument());
  });

  test('prevents signup with an existing username', async () => {
    const mockSnapshot = {
      val: jest.fn(() => ({
        username: 'existingUser',
      })),
      forEach: jest.fn((callback) => callback({ val: () => ({ username: 'existingUser' }) })),
    };

    get.mockResolvedValue(mockSnapshot);

    render(<Header />);
    fireEvent.click(screen.getByText('Inscription'));

    fireEvent.change(screen.getByPlaceholderText('Entrez votre email'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByPlaceholderText("Entrez votre nom d'utilisateur"), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByPlaceholderText('Entrez votre mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmez votre mot de passe'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() =>
      expect(screen.getByText("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.")).toBeInTheDocument()
    );
  });
});



jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  auth: {
    onAuthStateChanged: jest.fn((cb) => cb({ uid: '123', email: 'test@example.com' })),
  },
}));

jest.mock('firebase/database', () => ({
  get: jest.fn().mockResolvedValue({ val: () => ({ username: 'Test User' }) }),
  ref: jest.fn(),
}));

describe('Header Component Integration Test', () => {
  it('should log in and fetch user data from Firebase', async () => {
    render(<Header />);

    expect(screen.getByText('Log in')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument());

    
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('should log out correctly', async () => {
    
    auth.onAuthStateChanged.mockImplementationOnce((cb) => cb({ uid: '123', email: 'test@example.com' }));

    
    render(<Header />);

    
    expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument();

    
    fireEvent.click(screen.getByText('Log out'));

    
    await waitFor(() => expect(screen.getByText('Log in')).toBeInTheDocument());
  });
});
