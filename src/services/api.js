import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35414846-cfeaf13fba8d2fde5a69a666b';

const fetchImages = async (query, page = 1) => {
  const params = {
    key: API_KEY,
    q: query,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images from the API');
  }
};

export default fetchImages;
