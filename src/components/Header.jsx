import React, { useState } from 'react';
import '../assets/css/Header.css';


const ModalLog = ({ isOpen, onClose, onSwitch, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email);
  const isFormValid = isEmailValid && password; // Validation du formulaire

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email); // Connexion avec l'email de l'utilisateur
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
  const [error, setError] = useState(''); 

  const isEmailValid = email.includes('@') && /[a-zA-Z]/.test(email);
  const isFormValid = isEmailValid && password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

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

  // Fonction pour fermer la modal
  const closeModalLog = () => setIsModalLogOpen(false);
  const closeModalSign = () => setIsModalSignOpen(false);

  const loginUser = (email) => {
    setUser(email); 
    setIsModalLogOpen(false); 
  };

  const logoutUser = () => {
    setUser(null); 
  };



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
      {/* Modal */}
      <ModalLog isOpen={isModalLogOpen} onClose={() => setIsModalLogOpen(false)} onSwitch={switchToSignUp} loginUser={loginUser} />
      <ModalSign isOpen={isModalSignOpen} onClose={() => setIsModalSignOpen(false)} onSwitch={switchToLogin} />
    </div>
  );
};
