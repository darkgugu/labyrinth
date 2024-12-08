const axios = require('axios')

const labyrinthSize = 15

async function callApi() {
	const response = await axios.get(
		`https://api-37xw2svdqa-uc.a.run.app/labyrinth?hauteur=${labyrinthSize}&largeur=${labyrinthSize}`
	)
	return response.data
}

module.exports = { callApi }
