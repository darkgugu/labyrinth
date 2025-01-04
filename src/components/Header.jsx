import React, { useState, useEffect } from 'react';
import '../assets/css/Header.css';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set,child } from "firebase/database"; 


const firestore = getFirestore();
const database = getDatabase();

const ModalLog = ({ isOpen, onClose, onSwitch, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email);
  const isFormValid = isEmailValid && password; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user.email); 
      onClose(); 
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message);
      alert('Connexion échouée : ' + error.message);
    }
  };
  
  if (!isOpen) return null;



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>×</button>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} className="border-bottom">
          <label>Email:</label>
          <input 
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}  
          />
          <label>Mot de passe:</label>
          <input 
            type="password" 
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
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
          Déja un compte ? <span onClick={onSwitch} className="switch-link">Connectez-vous !</span>
        </p>
        
      </div>
    </div>
  );
};


const ModalSign = ({ isOpen, onClose, onSwitch}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); 

  const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email);
  const isFormValid = isEmailValid && password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Vérifier si le username est déjà pris
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'users/'));
  
      let isUsernameTaken = false;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.username === username) {
          isUsernameTaken = true;
        }
      });
  
      if (isUsernameTaken) {
        alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
        return;
      }
  
      // Créer un utilisateur avec l'authentification Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Ajouter les informations de l'utilisateur (y compris le username) dans Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        username: username,  
        email: email,        
        createdAt: new Date().toISOString(), 
      });
  
      alert('Inscription réussie !');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.message);
      alert("Inscription échouée : " + error.message);
    } finally {
      onClose(); 
    }
  };
  
  

  
  

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>×</button>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} className="border-bottom">
          <label>Email:</label>
          <input 
            type="email"
            placeholder="Entrez votre email" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <label>Nom d'utilisateur:</label>
          <input 
            type="text"
            placeholder="Entrez votre nom d'utilisateur" 
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <label>Mot de passe:</label>
          <input 
            type="password" 
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <label>Confirmation Mot de passe:</label>
          <input 
            type="password" 
            placeholder="Confirmez votre mot de passe" 
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            />
          <button 
            className={`disabled ${isFormValid ? 'enabled' : ''}`}
            type="submit"
            disabled={!isFormValid}
            >
              S'inscrire</button>
        </form>
        <p className="switch-text">
          Pas encore inscrit ? <span onClick={onSwitch} className="switch-link">Créer un compte</span>
        </p>
      </div>
    </div>
  );
};


export const Header = () => {
  const [isModalLogOpen, setIsModalLogOpen] = useState(false);
  const [isModalSignOpen, setIsModalSignOpen] = useState(false);
  const [user, setUser] = useState(null); 

  const switchToSignUp = () => {
    setIsModalLogOpen(false);
    setIsModalSignOpen(true);
  };

  const switchToLogin = () => {
    setIsModalSignOpen(false);
    setIsModalLogOpen(true);
  };


  const openModalLog = () => setIsModalLogOpen(true);
  const openModalSign = () => setIsModalSignOpen(true);

  const closeModalLog = () => setIsModalLogOpen(false);
  const closeModalSign = () => setIsModalSignOpen(false);

  const loginUser = (email) => {
    setUser(email); 
    setIsModalLogOpen(false); 
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error.message);
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        
        if (userData) {
          setUser(userData.username); 
        }
      } else {
        setUser(null); 
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  return (
    <div className="Header">
      <h1>Labyrinth</h1>

      {user ? (
        <div className="user-info">
          <span>{user}</span> {/* Affiche l'email de l'utilisateur */}
          <button className="logbutton" onClick={logoutUser}>Se déconnecter</button> {/* Bouton de déconnexion */}
        </div>
      ) : (
        <span className="spanbutton">
          <button className="logbutton" onClick={openModalLog}>Connexion</button>
          <button className="logbutton" onClick={openModalSign}>Inscription</button>
        </span>
      )}
  
      <ModalLog isOpen={isModalLogOpen} onClose={() => setIsModalLogOpen(false)} onSwitch={switchToSignUp} loginUser={loginUser} />
      <ModalSign isOpen={isModalSignOpen} onClose={() => setIsModalSignOpen(false)} onSwitch={switchToLogin}loginUser={loginUser} />
    </div>
  );
};
