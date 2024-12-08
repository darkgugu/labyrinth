import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyBEijWAC7afTbL-HgZvklLD_KNcnD2FxeA',
	authDomain: 'labyrinth-b3test.firebaseapp.com',
	databaseURL:
		'https://labyrinth-b3test-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'labyrinth-b3test',
	storageBucket: 'labyrinth-b3test.firebasestorage.app',
	messagingSenderId: '614434535258',
	appId: '1:614434535258:web:f17bead0d2a03e54732563',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default database
