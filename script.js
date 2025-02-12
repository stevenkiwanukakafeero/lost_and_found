// Fetch items from the backend and display them dynamically
function fetchItems() {
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = '';
        data.forEach(item => {
          const card = `
            <div class="col-md-4 mb-4">
              <div class="card item-card">
                <img src="${item.image_url}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-text text-muted">${item.location}</p>
                  <a href="/items/${item.id}" class="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          `;
          itemsContainer.innerHTML += card;
        });
      });
  }
  
  // Call fetchItems when the page loads
  document.addEventListener('DOMContentLoaded', fetchItems);
  
  // Search functionality
  function searchItems() {
    const query = document.getElementById('searchInput').value;
    fetch(`/items?search=${query}`)
      .then(response => response.json())
      .then(data => {
        // Handle search results (similar to fetchItems)
      });

  }
  