import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css"
// Notiflix.Notify.info('Cogito ergo sum');
// Notiflix.Notify.failure('Qui timide rogat docet negare');


const elem = {
    form: document.querySelector(".search-form"),
    loadMore: document.querySelector("button"),
    gallery: document.querySelector(".gallery")
};



elem.form.addEventListener("submit", handlerSearch);

async function handlerSearch(evt) {

    evt.preventDefault();
    const searchElem = evt.target.elements.searchQuery.value;

    const images = await fetchImages(searchElem);

    if (images.length === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
        return;
    }
    
    console.log(images);
    elem.gallery.innerHTML = "";

    elem.gallery.insertAdjacentHTML("beforeend", createMarcup(images));

    const lightbox = new SimpleLightbox('.gallery a', { });

}

async function fetchImages(searchElem) {
    axios.defaults.baseURL = "";
    const params = {
        key: "40437222-3b8e1aead0ae08f3118e12752",
        q: "dogs",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
        page: 1
    };

    params.q = searchElem;

    const resp = await axios.get(`https://pixabay.com/api/`, { params }).then((resp)=> resp.data.hits).catch(function (error) {
    if (error.response) {
              console.log(error.response.status);
          } else if (error.request) {
          console.log(error.request);
    } else {
          console.log('Error', error.message);
    }
    
  });

    return resp;
}

function createMarcup(arr) {
    return arr.map(({ tags, webformatURL, likes, downloads, views, largeImageURL, comments }) => `
    <div class="photo-card">
        <a href="${largeImageURL}">
            <div class="img-wrapper"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
            <div class="info">
              <p class="info-item">
                Likes <span class="count">${likes}</span>
              </p>
              <p class="info-item">
                Views <span class="count">${views}</span>
              </p>
              <p class="info-item">
                Comments <span class="count">${comments}</span>
              </p>
              <p class="info-item">
                Downloads <span class="count">${downloads}</span>
              </p>
            </div>
         </a>
    </div>` )
        .join("")
}


// fetchImages("cats")