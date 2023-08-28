import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";

// Fetch list of cat breeds
export async function fetchBreeds() {
    try {
        const response = await axios.get(`${BASE_URL}/breeds`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

// Fetch cat information by breed ID
export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}