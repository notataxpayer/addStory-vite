export default {
  
  // Handling
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
      }
  };