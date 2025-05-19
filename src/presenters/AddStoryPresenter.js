import storyModel from '../models/AddStoryModel.js';

const base64ToFile = (b64, name, type) => {
  const data = b64.split(',').pop();
  const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
  return new File([bytes], name, { type });
};

export default {
  async postStory({ description, photo, lat, lon }) {
    try {
      photo = typeof photo === 'string'
        ? base64ToFile(
            (() => { storyModel.validateBase64Image(photo); return photo; })(),
            'photo.jpg',
            'image/jpeg'
          )
        : (storyModel.validatePhoto(photo), photo);
      storyModel.validatePhoto(photo);
      storyModel.validateCoords(lat, lon);

      return await storyModel.createStory({ description, photo, lat, lon });
    } catch (error) {
      console.error('Post story error:', error);
      throw error;
    }
  }
};
