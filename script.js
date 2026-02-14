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
    const typeFilter = document.getElementById('type-filter');
    const genFilter = document.getElementById('gen-filter');

    function applyFilters() {
      const query = searchInput.value.toLowerCase();
      const selectedType = typeFilter.value;
      const selectedGen = genFilter.value;

      const filtered = allPokemon.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query);

        const matchesType =
          selectedType === 'all' || p.types.includes(selectedType);

        const matchesGen =
          selectedGen === 'all' || p.generation === selectedGen;

        return matchesSearch && matchesType && matchesGen;
      });

      displayCards(filtered);
    }

    // React to ALL controls
    searchInput.addEventListener('input', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    genFilter.addEventListener('change', applyFilters);

  });
