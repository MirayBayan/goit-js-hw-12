import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = null;

const loadMoreButton = document.querySelector('.load-more');

let page = 1;
const perPage = 40;
let currentSearchQuery = '';

const endMessage = document.querySelector('.end-message');
let totalHits = 0;

console.log(searchForm);
console.log(searchInput);
console.log(gallery);
console.log(loader);

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  if (searchQuery === '') {
    return;
  }
  currentSearchQuery = searchQuery;
  page = 1;
  endMessage.classList.add('is-hidden');
  loadMoreButton.classList.add('is-hidden');

  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  getImages(searchQuery, page)
    .then(data => {
      const images = data.hits;
      totalHits = data.totalHits;
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message: `Can not found any photo. Please try again another words.`,
          position: 'topRight',
        });
      }

      gallery.innerHTML = images
        .map(image => {
          return `
        <li class ="gallery-item">
          <a href="${image.largeImageURL}">
          <img
          src="${image.webformatURL}"
          alt="${image.tags}"
          loading="lazy"
          />
          </a>
          <div class="image-info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views: </b>${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </li>
        `;
        })
        .join('');

      const reachedEnd = page * perPage >= totalHits;

      loadMoreButton.classList.toggle('is-hidden', reachedEnd);
      endMessage.classList.toggle('is-hidden', !reachedEnd);

      if (images.length > 0) {
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a');
        }
      }
    })
    .catch(error => {
      console.error('Hata : ', error);
      alert('Fotoğraflar yüklenirken bir hata oluştu.');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
});

const API_KEY = '57977373-faec9c630f955850b63d7a23e';
async function getImages(searchQuery, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  console.log(response.data);

  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
}
loadMoreButton.addEventListener('click', () => {
  page += 1;
  loader.classList.remove('is-hidden');
  loadMoreButton.classList.add('is-hidden');

  getImages(currentSearchQuery, page)
    .then(data => {
      const images = data.hits;
      totalHits = data.totalHits;
      gallery.insertAdjacentHTML(
        'beforeend',
        images
          .map(image => {
            return `
              <li class="gallery-item">
                <a href="${image.largeImageURL}">
                  <img
                    src="${image.webformatURL}"
                    alt="${image.tags}"
                    loading="lazy"
                  />
                </a>
                <div class="image-info">
                  <p><b>Likes:</b> ${image.likes}</p>
                  <p><b>Views:</b> ${image.views}</p>
                  <p><b>Comments:</b> ${image.comments}</p>
                  <p><b>Downloads:</b> ${image.downloads}</p>
                </div>
              </li>
            `;
          })
          .join('')
      );

      if (lightbox) {
        lightbox.refresh();
      }

      loadMoreButton.classList.toggle('is-hidden', page * perPage >= totalHits);

      if (page * perPage >= totalHits) {
        endMessage.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      console.error('Hata:', error);
      page -= 1;
      alert('Fotoğraflar yüklenirken bir hata oluştu.');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
});
