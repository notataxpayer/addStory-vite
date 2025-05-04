export default {
  //Camera
    async startCamera(videoElement) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        });
        videoElement.srcObject = stream;
        return stream;
      } catch (error) {
        throw new Error('Camera access denied: ' + error.message);
      }
    },
  
    stopCamera(stream) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    },
  
    capturePhoto(videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0);
      return canvas.toDataURL('image/jpeg');
    }
  };