// Variáveis globais
const container = document.querySelector(".container");
const searchInput = document.getElementById("search-input");
let imagesData = [];

// Função para buscar imagens na API
const searchImages = async (query) => {
  const apiKey = "e0xIgJAp35LFs1pBZWnDCt5KsXMUVouwwkNcEJ5PS_Q";
  //Chamando a API do unsplash para redenrizar as imagens
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    imagesData = data.results;
    displayImages(imagesData);
  } catch (error) {
    console.error(error);
  }
};

// Função para exibir as imagens na página
const displayImages = (images) => {
  container.innerHTML = "";
  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = image.urls.regular;

    const title = document.createElement("h2");
    title.textContent = image.alt_description || "Sem título";

    const user = document.createElement("p");
    user.textContent = `Por ${image.user.name}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(user);

    container.appendChild(card);
  });
};

// Evento de escuta no campo de pesquisa
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    searchImages(query);
  }
});
