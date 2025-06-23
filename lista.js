const API_URL = "http://localhost:3000/residuos";

const catalogo = document.getElementById("catalogo");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", filtrarResiduos);

async function fetchResiduos() {
  try {
    const res = await fetch(API_URL);
    const residuos = await res.json();
    return residuos;
  } catch (error) {
    console.error("Error al cargar residuos:", error);
  }
}

async function loadResiduos(residuos = null) {
  if (!residuos) {
    residuos = await fetchResiduos();
    if (!residuos) return;
  }

  const fichas = residuos.map(residuo => {
    return `
      <div class="ficha">
        <h2>${residuo.producto}</h2>
        <p><strong>Contenedor: </strong>${residuo.contenedor}</p>
      </div>
    `;
  });

  catalogo.innerHTML = fichas.join("");
}

// Función para filtrar residuos según los checkboxes marcados
async function filtrarResiduos() {
  const residuos = await fetchResiduos();
  if (!residuos) return;

  const checkboxes = document.querySelectorAll('input[name="contenedor"]:checked');
  const filtros = Array.from(checkboxes).map(cb => cb.value);

  const residuosFiltrados = residuos.filter(residuo =>
    filtros.includes(residuo.contenedor)
  );

  loadResiduos(residuosFiltrados);
}

loadResiduos();