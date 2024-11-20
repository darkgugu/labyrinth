const functions = require("firebase-functions/v1");
const { callApi } = require('./callApi')

exports.dailyApiCall = functions.pubsub
  .schedule("* * * * *")
  .timeZone("Europe/Paris")
  .onRun(async (context) => {
    return await callApi();
  });