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

const mainUrl = "https://pixabay.com/api/";
const param = {
    key: "40437222-3b8e1aead0ae08f3118e12752",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    page: 1,
}

elem.form.addEventListener("submit", handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();
    const searchElem = evt.target.elements.searchQuery.value;
    



    
}

