const functions = require('firebase-functions/v1')
const { callApi } = require('./callApi')
const db = require('./firebaseAdmin')

exports.dailyApiCall = functions.pubsub
	.schedule('0 0 * * *')
	.timeZone('Europe/Paris')
	.onRun(async (context) => {
		const walls = await callApi()
		await db.ref('walls').set(walls)
		console.log('walls:', walls)
	})