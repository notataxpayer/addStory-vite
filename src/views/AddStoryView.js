import addStoryPresenter from '../presenters/AddStoryPresenter.js';
import cameraPresenter from '../models/CameraModel.js';

export default {
  cameraStream: null,
  
  render(container) {
    container.innerHTML = `
      <section class="add-story">
        <h2>Add New Story</h2>
        <form id="story-form">
          <label for="description">Description</label>
          <textarea id="description" required></textarea>
          
          <label>Photo Source</label>
          <div class="photo-options">
            <button type="button" id="open-camera">Use Camera</button>
            <input type="file" id="photo-upload" accept="image/*" style="display: none;">
            <button type="button" id="upload-photo">Upload File</button>
          </div>
          
          <video id="camera-preview" autoplay playsinline style="display: none; width: 100%; max-height: 300px; margin: 10px 0;"></video>
          <button type="button" id="capture-btn" style="display: none; margin-bottom: 10px;">Capture Photo</button>
          <img id="photo-preview" style="display: none; max-width: 100%; max-height: 300px; margin: 10px 0;">
          
          <input type="hidden" id="photo-data">
          
          <label for="lat">Latitude (Optional)</label>
          <input type="number" id="lat" step="any">
          
          <label for="lon">Longitude (Optional)</label>
          <input type="number" id="lon" step="any">
          
          <button type="submit">Submit</button>
          <p id="error-message" class="error"></p>
        </form>
        <div id="map" style="height: 300px; margin-top: 20px;"></div>
      </section>
    `;

    this.initMap();
    this.initCameraHandlers();
    this.setupForm();

    window.addEventListener('hashchange', () => {
      if (window.location.hash !== '#/addstory') {
        this.cleanup();
      }
    });
    
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
    
  },
  

  initCameraHandlers() {
    const video = document.getElementById('camera-preview');
    const captureBtn = document.getElementById('capture-btn');
    const openCameraBtn = document.getElementById('open-camera');
    const uploadPhotoBtn = document.getElementById('upload-photo');
    const fileInput = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const photoDataInput = document.getElementById('photo-data');

    // Open camera handler
    openCameraBtn.addEventListener('click', async () => {
      try {
        openCameraBtn.disabled = true;
        openCameraBtn.textContent = 'Initializing Camera...';
        
        this.cameraStream = await cameraPresenter.startCamera(video);
        
        video.style.display = 'block';
        captureBtn.style.display = 'block';
        photoPreview.style.display = 'none';
        openCameraBtn.textContent = 'Camera Ready';
        
      } catch (error) {
        console.error('Camera error:', error);
        openCameraBtn.disabled = false;
        openCameraBtn.textContent = 'Use Camera';
        alert(`Camera Error: ${error.message}`);
      }
    });

    // Capture button handler
    captureBtn.addEventListener('click', () => {
      const photoData = cameraPresenter.capturePhoto(video);
      
      // Display photonya
      photoPreview.src = photoData;
      photoPreview.style.display = 'block';
      photoDataInput.value = photoData;
      
      // Close cam n end stream
      video.style.display = 'none';
      captureBtn.style.display = 'none';
      this.cleanupCamera();
      
      // Reset cam
      document.getElementById('open-camera').textContent = 'Retake Photo';
      document.getElementById('open-camera').disabled = false;
    });

    // Upload file handler
    uploadPhotoBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (this.cameraStream) {
        this.cleanupCamera();
      }
      
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoPreview.src = event.target.result;
          photoPreview.style.display = 'block';
          photoDataInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  },

  cleanupCamera() {
    if (this.cameraStream) {
      cameraPresenter.stopCamera(this.cameraStream);
      this.cameraStream = null;
    }
  },

  initMap() {
    setTimeout(() => {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found!');
        return;
      }

      const map = L.map('map').setView([-7.982270, 112.653809], 13); // Default malang 
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      let marker;
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        document.getElementById('lat').value = lat.toFixed(6);
        document.getElementById('lon').value = lng.toFixed(6);
        
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(map);
      });

      this.map = map;
    }, 100);
  },

  setupForm() {
    const form = document.getElementById('story-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      try {
        const description = document.getElementById('description').value;
        const photoData = document.getElementById('photo-data').value;
        const lat = document.getElementById('lat').value || null;
        const lon = document.getElementById('lon').value || null;

        let photoFile;
        if (photoData) {
          const blob = await fetch(photoData).then(r => r.blob());
          photoFile = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        } else {
          throw new Error('Please add a photo');
        }

        await addStoryPresenter.postStory({ description, photo: photoFile, lat, lon });
        window.location.hash = '#/home';
      } catch (error) {
        document.getElementById('error-message').textContent = error.message;
      } finally {
        submitBtn.disabled = false;
      }
    });
  },

  cleanup() {
    this.cleanupCamera();
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
};