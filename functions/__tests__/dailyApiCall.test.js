const axios = require("axios");
const { callApi } = require("../index");
const walls = require("../walls")
//const functions = require("firebase-functions/v1");


jest.mock("axios");

describe("callApi", () => {
  it("should successfully call the API and return data", async () => {
    const mockData = { success: true };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await callApi();

    expect(axios.get).toHaveBeenCalledWith("https://api-37xw2svdqa-uc.a.run.app/labyrinth?hauteur=15&largeur=15");
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(callApi()).rejects.toThrow("Network Error");
    expect(axios.get).toHaveBeenCalledWith("https://api-37xw2svdqa-uc.a.run.app/labyrinth?hauteur=15&largeur=15");
  });

  it("should update walls.js", async () => {

    const mockData = {"vertical":[[1,0,0],[1,0,0],[1,1,1],[1,1,1]],"horizontal":[[1,1,1,1],[0,1,1,1],[0,0,0,1]]};
    axios.get.mockResolvedValueOnce({ data: mockData });

    await callApi();
    expect(walls).toEqual(mockData);

  });
});
