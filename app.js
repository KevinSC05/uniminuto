// Modelo: Manejo de datos de la API
let allCharacters = [];
async function fetchCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        allCharacters = data.results;
        return allCharacters;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Controlador: Manejo de la lógica y la interacción entre el modelo y la vista
function filterCharacters(status) {
    const filteredCharacters = status === 'all' ? allCharacters : allCharacters.filter(character => character.status === status);
    displayCharacters(filteredCharacters);
}

async function displayCharacters(characters) {
    const characterContainer = document.getElementById('characters');
    characterContainer.innerHTML = ''; // Clear existing characters

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'col-md-4 mb-4';
        characterCard.innerHTML = `
            <div class="card border-dark shadow-sm">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text"><strong>Status:</strong> ${character.status}</p>
                    <p class="card-text"><strong>Species:</strong> ${character.species}</p>
                </div>
            </div>
        `;
        characterContainer.appendChild(characterCard);
    });
}

// Vista: Inicialización de la vista y carga de datos
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCharacters();
    displayCharacters(allCharacters);
});
