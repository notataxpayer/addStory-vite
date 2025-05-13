import authModel from './authModel.js';

export default {
  validatePhoto(file) {
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    if (file.size > 1 * 1024 * 1024) {
      throw new Error('Max image size is 1MB');
    }
    return true;
  },

  validateCoords(lat, lon) {
    if (lat && lon) {
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Lat/Lon must be numbers');
      }
    }
  },

  validateBase64Image(data) {
    if (!data.startsWith('data:image/')) {
      throw new Error('Invalid image data');
    }
  },

  async createStory({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat) formData.append('lat', lat);
    if (lon) formData.append('lon', lon);

    const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authModel.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to post story');
    }

    return await response.json();
  }
};
