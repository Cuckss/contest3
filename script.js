function fetchDataWithThen() {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(function (data) {
        renderTable(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  // Fetch data using async/await syntax
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Render the data in a table
  function renderTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';
  
    data.forEach(function (crypto) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${crypto.name}</td>
        <td>${crypto.symbol}</td>
        <td>${crypto.current_price}</td>
        <td>${crypto.total_volume}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Search functionality
  const searchInput = document.querySelector('#searchInput');
  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#cryptoTable tbody tr');
  
    rows.forEach(function (row) {
      const name = row.cells[0].textContent.toLowerCase();
      const symbol = row.cells[1].textContent.toLowerCase();
  
      if (name.includes(searchValue) || symbol.includes(searchValue)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  