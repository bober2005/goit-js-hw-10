import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Set your x-api-key here
axios.defaults.headers.common["x-api-key"] = "your-api-key";

// Function to populate the breed select options
async function populateBreeds() {
    try {
        const breeds = await fetchBreeds();
        breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
    } catch (err) {
        error.style.display = "block";
    } finally {
        loader.style.display = "none";
    }
}

// Function to handle breed selection and fetch cat information
async function handleBreedSelection() {
    const selectedBreedId = breedSelect.value;
    loader.style.display = "block";
    error.style.display = "none";
    catInfo.innerHTML = "";

    try {
        const catData = await fetchCatByBreed(selectedBreedId);
        const catImage = catData[0].url;
        const catBreed = catData[0].breeds[0];

        catInfo.innerHTML = `
      <img src="${catImage}" alt="${catBreed.name}" />
      <h2>${catBreed.name}</h2>
      <p>${catBreed.description}</p>
      <p>Temperament: ${catBreed.temperament}</p>
    `;
    } catch (err) {
        error.style.display = "block";
    } finally {
        loader.style.display = "none";
    }
}

// Attach event listener for breed selection
breedSelect.addEventListener("change", handleBreedSelection);

// Populate breed select options on page load
populateBreeds();