import storyModel from '../models/AddStoryModel.js';

export default {
  async postStory({ description, photo, lat, lon }) {
    try {
      if (typeof photo === 'string') {
        storyModel.validateBase64Image(photo);
        const blob = await fetch(photo).then(r => r.blob());
        photo = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      } else {
        storyModel.validatePhoto(photo);
      }

      storyModel.validatePhoto(photo);
      storyModel.validateCoords(lat, lon);

      return await storyModel.createStory({ description, photo, lat, lon });
    } catch (error) {
      console.error('Post story error:', error);
      throw error; 
    }
  }
};
