// Header.js
import React, { useState, useEffect } from 'react'
import '../assets/css/Header.css'
import { auth } from '../firebaseConfig'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, get, set } from 'firebase/database'

const database = getDatabase()

const ModalLog = ({ isOpen, onClose, onSwitch, setUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email)
	const isFormValid = isEmailValid && password

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user
			const snapshot = await get(ref(database, 'users/' + user.uid))
			const userData = snapshot.val()

			setUser(userData?.username || user.email)
			onClose()
		} catch (error) {
			console.error('Erreur lors de la connexion :', error.message)
			alert('Connexion échouée : ' + error.message)
		}
	}

	if (!isOpen) return null

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					×
				</button>
				<h2>Connexion</h2>
				<form onSubmit={handleSubmit} className="border-bottom">
					<label>Email :</label>
					<input
						type="email"
						placeholder="Entrez votre email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Mot de passe :</label>
					<input
						type="password"
						placeholder="Entrez votre mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className={`disabled ${isFormValid ? 'enabled' : ''}`}
						type="submit"
						disabled={!isFormValid}
					>
						Se connecter
					</button>
				</form>
				<p className="switch-text">
					Pas encore inscrit ?{' '}
					<span onClick={onSwitch} className="switch-link">
						Créer un compte !
					</span>
				</p>
			</div>
		</div>
	)
}

const ModalSign = ({ isOpen, onClose, onSwitch, setUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email)
	const isFormValid = isEmailValid && password && username

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			await set(ref(database, 'users/' + user.uid), {
				username,
				email,
				createdAt: new Date().toISOString(),
			})

			setUser(username)
			alert('Inscription réussie !')
			onClose()
		} catch (error) {
			console.error("Erreur lors de l'inscription :", error.message)
			alert('Inscription échouée : ' + error.message)
		}
	}

	if (!isOpen) return null

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					×
				</button>
				<h2>Inscription</h2>
				<form onSubmit={handleSubmit} className="border-bottom">
					<label>Email :</label>
					<input
						type="email"
						placeholder="Entrez votre email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Nom d'utilisateur :</label>
					<input
						type="text"
						placeholder="Entrez votre nom d'utilisateur"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Mot de passe :</label>
					<input
						type="password"
						placeholder="Entrez votre mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className={`disabled ${isFormValid ? 'enabled' : ''}`}
						type="submit"
						disabled={!isFormValid}
					>
						S'inscrire
					</button>
				</form>
				<p className="switch-text">
					Déjà inscrit ?{' '}
					<span onClick={onSwitch} className="switch-link">
						Connectez-vous !
					</span>
				</p>
			</div>
		</div>
	)
}

export const Header = ({ user, setUser }) => {
	const [isModalLogOpen, setIsModalLogOpen] = useState(false)
	const [isModalSignOpen, setIsModalSignOpen] = useState(false)

	const openModalLog = () => setIsModalLogOpen(true)
	const openModalSign = () => setIsModalSignOpen(true)
	const closeModalLog = () => setIsModalLogOpen(false)
	const closeModalSign = () => setIsModalSignOpen(false)

	const logoutUser = async () => {
		try {
			await signOut(auth)
			setUser(null)
		} catch (error) {
			console.error('Erreur lors de la déconnexion :', error.message)
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const snapshot = await get(ref(database, 'users/' + user.uid))
				const userData = snapshot.val()
				setUser(userData?.username || user.email)
			} else {
				setUser(null)
			}
		})

		return () => unsubscribe()
	}, [setUser])

	return (
		<div className="Header" data-testid="header">
			<h1>Labyrinth</h1>

			{user ? (
				<div className="user-info">
					<span id="userName">{user}</span>
					<button className="logbutton" onClick={logoutUser}>
						Se déconnecter
					</button>
				</div>
			) : (
				<span className="spanbutton">
					<button className="logbutton" onClick={openModalLog}>
						Connexion
					</button>
					<button className="logbutton" onClick={openModalSign}>
						Inscription
					</button>
				</span>
			)}

			<ModalLog
				isOpen={isModalLogOpen}
				onClose={closeModalLog}
				onSwitch={() => {
					setIsModalLogOpen(false)
					setIsModalSignOpen(true)
				}}
				setUser={setUser}
			/>
			<ModalSign
				isOpen={isModalSignOpen}
				onClose={closeModalSign}
				onSwitch={() => {
					setIsModalSignOpen(false)
					setIsModalLogOpen(true)
				}}
				setUser={setUser}
			/>
		</div>
	)
}
