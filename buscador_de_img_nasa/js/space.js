document.getElementById('btnBuscar').addEventListener('click', () => {
    const galaxia = document.getElementById('inputBuscar').value;

    if (galaxia.trim()) {
        // Realizar la solicitud a la API de la NASA
        fetch(`https://images-api.nasa.gov/search?q=${galaxia}`)
            .then(response => response.json())
            .then(data => mostrarResultados(data.collection.items))
            .catch(error => console.error('Error al obtener los datos:', error));
    }
});

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';  // Limpiar resultados anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No se encontraron resultados</p>';
        return;
    }

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const image = item.links ? item.links[0].href : 'https://via.placeholder.com/150';

        // Crear una tarjeta usando Bootstrap
        const card = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${image}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description ? description : 'Sin descripción disponible'}</p>
              <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
            </div>
          </div>
        </div>
        `;

        contenedor.innerHTML += card;  // Agregar la tarjeta al contenedor
    });
}