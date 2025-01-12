export function createImageTemplate (pictureArr) {
    return pictureArr.reduce((acc, el, idx, arr) => {
        return acc +
            `<li class="gallery-item">
            <a class="gallery-item-content" href="${el.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${el.webformatURL}"
                    alt="${el.tags}"
                    />
                <ul class="card-porperties">
                <li class="property-el">
                    <p class="property-title">Likes</p>
                    <p class="property-text">${el.likes}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Views</p>
                    <p class="property-text">${el.views}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Comments</p>
                    <p class="property-text">${el.comments}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Downloads</p>
                    <p class="property-text">${el.downloads}</p>
                </li>
                </ul>
            </a>
        </li>`
    }, '')
};