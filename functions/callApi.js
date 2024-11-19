const axios = require("axios");
const setWalls = require("./setWalls");
const walls = require("./walls")


const labyrinthSize = 15;

async function callApi() {
    const response = await axios.get(`https://api-37xw2svdqa-uc.a.run.app/labyrinth?hauteur=${labyrinthSize}&largeur=${labyrinthSize}`);
    setWalls(response.data)
    console.log(walls)
    return response.data;
  }

  module.exports = { callApi };
