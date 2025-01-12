// IMPORT START --------------------------------------------------
// IziToast Import
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
    titleColor: 'white',
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight',
    maxWidth: 432,
});

// Simple Light Box
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Other JS functions
import { getImages } from "./js/pixabay-api.js"
import { createImageTemplate } from "./js/render-functions.js"

// IMPORT END --------------------------------------------------

// Find all elements on the DOM
const galleryEl = document.querySelector(".js-gallery");
const formElement = document.querySelector("form");
const preloaderElement = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".js-load-more");

// Set variables
let page = 1;
let elementsPerPage = 15;
let searchQuery = '';
let gallery = new SimpleLightbox('.js-gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
});
gallery.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
        });


// SUBMIT BUTTON
const submitQuery = formElement.addEventListener("submit", event => {
    event.preventDefault();
    
    const formData = new FormData(formElement);
    searchQuery = formData.get("search-query");

    // Перевірка на пусте поле та пробіли
    if (!searchQuery.trim()) {
        alert('Please enter the search query')
        return
    }

    // Setting defaults
    page = 1;
    galleryEl.innerHTML = '';
    preloaderElement.removeAttribute('hidden')

    getImages(searchQuery, page)
        .then(data => {
            
            // Info
            // console.log(`Total elements: ${data.total}`); // Total results on Query

            preloaderElement.setAttribute('hidden', '');
            console.log()
            if (Object.keys(data.hits).length >= elementsPerPage) {
            btnLoadMore.removeAttribute('hidden')
            } else if (data.total === 0) {
                iziToast.show({ message: `Sorry, there are no images matching your search query. Please try again!` });
                return null;
            };
        // Create HTML markup for recieved images
        const listImages = createImageTemplate(data.hits);
        return listImages;
    })
    .then(listImages => {
        // Place recieved images in HTML
        galleryEl.innerHTML = listImages;

        // SimpleLightBox
        gallery.refresh();

    })
        .catch(error => { console.log(error) });   
})



// LOAD MORE BUTTON CLICK
const onLoadMore = btnLoadMore.addEventListener("click", event => {
    ++page; // Increase page number on each click
    preloaderElement.removeAttribute('hidden');
    btnLoadMore.setAttribute('hidden', '');

    getImages(searchQuery, page)
        .then(data => {

            preloaderElement.setAttribute('hidden', '');

            if (Object.keys(data.hits).length < elementsPerPage) {
                btnLoadMore.setAttribute('hidden', '');
                iziToast.settings({
                    titleColor: 'steelblue',
                    messageColor: 'steelblue',
                    backgroundColor: 'lightcyan',
                    position: 'topRight',
                    maxWidth: 432,
                });
                iziToast.show({ message: `We're sorry, but you've reached the end of search results.` });
            } else {
                btnLoadMore.removeAttribute('hidden');
            }
    
            // Create HTML markup for recieved images
            const listImages = createImageTemplate(data.hits);
            return listImages;
        })
        .then(listImages => {
            // Place recieved images in HTML 
            galleryEl.insertAdjacentHTML('beforeend', listImages);

            // Scroll on 2xCard Height
            const galleryCard = document.querySelector(".gallery-item");
            let imageHeight = galleryCard.getBoundingClientRect().height;
            const scrollLength = imageHeight * 2;
            window.scrollBy(0, scrollLength);

            // SimpleLightBox refresh
            gallery.refresh();

        })
        .catch(error => { console.log(error) });

});
