// 3er Reto: Mostrar los primeros 20 personajes al recargar
// 3er Reto: Eliminar el localStorage

localStorage.clear()

//const $observe = document.getElementById('observe');
const $unobserve = document.getElementById('unobserved')
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      // 1er Reto: Guarda en localStorage la URL de la siguiente petición de personajes obtenida en la primera llamada a la API.
      // 1er Reto: Utiliza el nombre para la llave: ‘next_fetch’.
      localStorage.setItem('next_fetch',response.info.next)

      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      app.appendChild(newItem);
    })
    .catch(error => console.log(`Error1: ${error}`));
}
/*
const loadData = () => {
  getData(API);
}
*/

// 2do Reto: Obten los datos almacenados en localStorage de la llave: ‘next_fetch’.
// 2do Reto: Valida que exista un valor en ‘next_fetch’ o regresa el primer llamado de la API.
// 2do Reto: Actualiza la función loadData() a Async/Await.

async function loadData() {
  const valido = await localStorage.getItem("next_fetch")
  if (valido){    
    fetch(valido)
    .then(resp => resp.json())
    .then(resp => {
      getData(valido)  
    })
    .catch(erro => console.log(`Error: ${erro}`))    
  }
  else{
    getData(API)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe(observe);