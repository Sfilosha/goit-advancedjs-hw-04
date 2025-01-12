import axios from "axios";

const apiParams = new URLSearchParams({
    key: "10224742-53a1a7880f946c3462445b43a",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true"
});

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchQuery, page = 1) => {
    const response = await axios.get(`/?${apiParams}&q=${searchQuery}`, {
        params: {
            page: page,
            per_page: 15
        }
    })
    return response.data;
};