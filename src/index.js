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



// elem.form.addEventListener("submit", handlerSearch);

// async function handlerSearch(evt) {

//     evt.preventDefault();
//     const searchElem = evt.target.elements.searchQuery.value;

//     const imedges = await fetchImages()
    
    
// }

async function fetchImages(searchElem) {
    axios.defaults.baseURL = "";
    const params = {
        key: "40437222-3b8e1aead0ae08f3118e12752",
        q:"dogs",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
        page: 1
    }
    params.q = searchElem;

    const resp = await axios.get(`https://pixabay.com/api/`, { params }).catch(function (error) {
    if (error.response) {
              console.log(error.response.status);
          } else if (error.request) {
          console.log(error.request);
    } else {
          console.log('Error', error.message);
    }
    
  });

    console.log(resp);


}

fetchImages("cats")