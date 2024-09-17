const products = [
    { id: 1, name: "Vestido Floral", price: 159.90, category: "Feminino", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" },
    { id: 2, name: "Camisa Social", price: 129.90, category: "Masculino", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80" },
    { id: 3, name: "Sapato de Couro", price: 249.90, category: "Calçados", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1312&q=80" },
    { id: 4, name: "Relógio Elegante", price: 299.90, category: "Acessórios", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" },
    { id: 5, name: "Bolsa de Couro", price: 189.90, category: "Acessórios", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 6, name: "Calça Jeans", price: 139.90, category: "Unissex", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
    { id: 7, name: "Tênis Esportivo", price: 219.90, category: "Calçados", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 8, name: "Blazer Feminino", price: 179.90, category: "Feminino", image: "https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
];

function searchProducts(query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    const searchInput = document.getElementById('search-input');
    
    // Ajusta a largura dos resultados para corresponder à largura do campo de busca
    searchResults.style.width = `${searchInput.offsetWidth}px`;
    
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-muted p-3">Nenhum produto encontrado.</p>';
        return;
    }

    const resultList = document.createElement('ul');
    resultList.className = 'list-group';

    results.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center';
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="search-result-image me-3">
            <div>
                <h6 class="mb-0">${product.name}</h6>
                <small class="text-muted">${product.category}</small>
                <p class="mb-0 fw-bold">R$ ${product.price.toFixed(2)}</p>
            </div>
        `;
        listItem.addEventListener('click', () => {
            // Aqui você pode adicionar uma ação ao clicar no item, como redirecionar para a página do produto
            console.log(`Produto clicado: ${product.name}`);
        });
        resultList.appendChild(listItem);
    });

    searchResults.appendChild(resultList);
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 0) {
            const results = searchProducts(query);
            displaySearchResults(results);
            searchResults.style.display = 'flex';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Fechar resultados da busca quando clicar fora
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});