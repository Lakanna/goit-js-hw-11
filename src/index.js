import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"


const elem = {
    form: document.querySelector(".search-form"),
    loadMore: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery")
};

let page = 12;
let searchElem = "";


elem.form.addEventListener("submit", handlerSearch);
elem.loadMore.addEventListener('click', handlerLoadMore);




async function handlerSearch(evt) {

  evt.preventDefault();
   
  searchElem = evt.target.elements.searchQuery.value;

  elem.gallery.innerHTML = "";

  page = 1;

  try {
      const response = await fetchImages(searchElem, page);

    if (response.hits.length === 0) {
        
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
      
      return;
      
       }
  
      const images = response.hits;
          
    elem.gallery.insertAdjacentHTML("beforeend", createMarcup(images));

    const lightbox = new SimpleLightbox('.gallery a', {});

    evt.target.reset();
  
    if (page >= response.totalHits / 40) {
                  
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      
      page = 0;
      
      return;
      
    } else { 

      elem.loadMore.classList.remove("load-more-hidden")
       
        }
  } catch (error) {
    
     Notiflix.Notify.failure('Sorry, search is currently unavailable')
     }
      
  }




async function handlerLoadMore() {

  page += 1;
    
  try {
    const response = await fetchImages(searchElem, page);

      if (response.hits.length === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
        return;
       }
  
    const images = response.hits;
          
    elem.gallery.insertAdjacentHTML("beforeend", createMarcup(images));

    const lightbox = new SimpleLightbox('.gallery a', {});

    lightbox.refresh();
  
    if (page >= response.totalHits / 40) {
       
      elem.loadMore.classList.add("load-more-hidden")
      
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      
         return;
        } 
   } catch (error) {
       Notiflix.Notify.failure('Sorry, search is currently unavailable') }
   
}
     


async function fetchImages(searchElem, page = 1) {
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
     params.page = page;

   const resp = await axios.get(`https://pixabay.com/api/`, { params }).then((resp) => resp.data);
   return resp; 
  };

    


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


