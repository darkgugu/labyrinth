import '../assets/css/Leaderboard.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';


export const Leaderboard = () => {
    const [date, setDate] = useState(new Date());
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchLeaderboard = (currentDate) => {
        setLoading(true);
        const formattedDate = currentDate.toISOString().split('T')[0]; 
        const leaderboardRef = ref(database, 'Leaderboard'); 

        onValue(leaderboardRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const filteredData = Object.values(data).filter(
                    (player) => player.date === formattedDate
                );
                const sortedData = filteredData.sort((a, b) => b.points - a.points); 
                setLeaderboard(sortedData);
            } else {
                setLeaderboard([]);
            }
            setLoading(false);
        });
    };

    
    useEffect(() => {
        fetchLeaderboard(date);
    }, [date]);

    const yesterday = () => setDate(new Date(date.setDate(date.getDate() - 1)));
    const tomorrow = () => setDate(new Date(date.setDate(date.getDate() + 1)));

    const convertDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="Leaderboard">
            <div className="leaderboardWindow">
                <div className="title">Leaderboard</div>
                <div className="rows">
                    <div className="rowName">
                        <p>Nom du joueur</p>
                        {leaderboard.map((player, index) => (
                            <p key={index}>{player.username}</p> 
                        ))}
                    </div>
                    <div className="rowScore">
                        <p>Score</p>
                        {leaderboard.map((player, index) => (
                            <p key={index}>{player.points}</p> 
                        ))}
                    </div>
                </div>
                <div className="date">
                    <button onClick={yesterday}>
                        <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    </button>
                    <p>{convertDate(date)}</p>
                    <button onClick={tomorrow}>
                        <FontAwesomeIcon icon={faArrowRight} size="1x" />
                    </button>
                </div>
            </div>
        </div>
    );
};
