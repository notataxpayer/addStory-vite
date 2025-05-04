import storyModel from '../models/storyModel.js';
import authModel from '../models/authModel.js';

export default {
  async postStory({ description, photo, lat, lon }) {
    try {
      // Validasi input
      storyModel.validatePhoto(photo);
      storyModel.validateCoords(lat, lon);

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
    } catch (error) {
      console.error('Post story error:', error);
      throw error; // Dilempar ke view untuk ditampilkan ke user
    }
  }
};