const admin = require('firebase-admin')

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.applicationDefault(), // Use service account for authentication
	databaseURL:
		'https://labyrinth-b3test-default-rtdb.europe-west1.firebasedatabase.app/', // Replace with your database URL
})

// Export the database reference
const db = admin.database()
module.exports = db
