// Load Pokémon JSON
fetch('pokemon.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    let allPokemon = data;

    function displayCards(pokemonList) {
      container.innerHTML = '';
      pokemonList.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${p.image}" alt="${p.name}">
              <h3>${p.name}</h3>
            </div>
            <div class="card-back">
              <p><strong>Type:</strong> ${p.types.join(', ')}</p>
              <p><strong>Generation:</strong> ${p.generation}</p>
              <p><strong>#${p.number}</strong></p>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }

    displayCards(allPokemon);

    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      const filtered = allPokemon.filter(p =>
        p.name.toLowerCase().includes(query)
      );
      displayCards(filtered);
    });
  });
