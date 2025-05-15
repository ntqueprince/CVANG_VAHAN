<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHIVANG</title> <!-- Changed from CVANG to SHIVANG -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      text-align: center;
      margin: 0;
      min-height: 100vh;
    }
    h2, h3 {
      color: #1a237e;
      font-weight: 600;
    }
    h2 {
      font-size: 2em;
      letter-spacing: 1px;
    }
    h3 {
      font-size: 1.5em;
    }
    .upload-section {
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 0.9);
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    input[type="file"], input[type="text"], button {
      padding: 12px;
      margin: 8px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #b0bec5;
      width: 80%;
      max-width: 300px;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }
    input[type="text"]:focus, input[type="file"]:focus {
      border-color: #3f51b5;
      box-shadow: 0 0 8px rgba(63, 81, 181, 0.3);
      outline: none;
    }
    button {
      background-color: #3f51b5;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    .progress-container {
      width: 80%;
      max-width: 300px;
      margin: 10px auto;
    }
    .progress-bar {
      width: 100%;
      background-color: #eceff1;
      border-radius: 8px;
      overflow: hidden;
    }
    .progress {
      width: 0%;
      height: 20px;
      background: linear-gradient(90deg, #3f51b5, #5c6bc0);
      text-align: center;
      line-height: 20px;
      color: white;
      font-weight: 400;
      transition: width 0.3s ease;
    }
    .status {
      margin-top: 5px;
      font-size: 14px;
      color: #455a64;
      font-weight: 400;
    }
    #gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      justify-items: center;
      padding: 10px;
    }
    .image-container {
      background: white;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: all 0.3s ease;
      max-width: 200px;
    }
    .image-container:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }
    #gallery img {
      max-width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
    }
    .tag {
      margin: 5px 0;
      font-size: 16px;
      font-weight: 500;
      color: #37474f;
    }
    .download-btn {
      background-color: #ff5722;
      color: white;
      padding: 8px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 5px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .download-btn:hover {
      background-color: #e64a19;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    /* Popup Styles for Tag Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 400px;
      text-align: center;
      border: 2px solid #3f51b5;
    }
    .modal-content h4 {
      margin: 0 0 15px;
      color: #d32f2f;
      font-weight: 500;
    }
    .modal-content input[type="text"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #b0bec5;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .modal-content input[type="text"]:focus {
      border-color: #3f51b5;
      box-shadow: 0 0 8px rgba(63, 81, 181, 0.3);
      outline: none;
    }
    .modal-content button {
      padding: 10px 20px;
      margin: 5px;
      border-radius: 8px;
      cursor: pointer;
    }
    .modal-content .upload-btn {
      background-color: #3f51b5;
      color: white;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .modal-content .upload-btn:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .modal-content .cancel-btn {
      background-color: #f44336;
      color: white;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .modal-content .cancel-btn:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .modal-progress-container {
      width: 100%;
      margin: 10px 0;
      display: none;
    }
    .modal-progress-bar {
      width: 100%;
      background-color: #eceff1;
      border-radius: 8px;
      overflow: hidden;
    }
    .modal-progress {
      width: 0%;
      height: 20px;
      background: linear-gradient(90deg, #3f51b5, #5c6bc0);
      text-align: center;
      line-height: 20px;
      color: white;
      font-weight: 400;
      transition: width 0.3s ease;
    }
    /* CSAT Calculator Modal Styles */
    .csat-modal {
      display: none;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      justify-content: center;
      align-items: center;
    }
    .csat-modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 400px;
      text-align: center;
      border: 2px solid #3f51b5;
    }
    .csat-modal-content h4 {
      color: #1a237e;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .csat-modal-content .input-section {
      margin-bottom: 15px;
    }
    .csat-modal-content label {
      display: block;
      font-size: 1em;
      color: #37474f;
      margin-bottom: 5px;
    }
    .csat-modal-content input, .csat-modal-content select {
      padding: 10px;
      font-size: 1em;
      border-radius: 8px;
      border: 1px solid #b0bec5;
      width: 100%;
      max-width: 200px;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }
    .csat-modal-content input:focus, .csat-modal-content select:focus {
      border-color: #3f51b5;
      box-shadow: 0 0 8px rgba(63, 81, 181, 0.3);
      outline: none;
    }
    .csat-modal-content .good-section {
      background: #c8e6c9;
      padding: 10px;
      border-radius: 8px;
    }
    .csat-modal-content .bad-section {
      background: #ffcdd2;
      padding: 10px;
      border-radius: 8px;
    }
    .csat-modal-content .result-section {
      margin-top: 15px;
      padding: 10px;
      background: #eceff1;
      border-radius: 8px;
    }
    .csat-modal-content .result-section p {
      margin: 5px 0;
      font-size: 0.9em;
      color: #455a64;
    }
    .csat-modal-content .success {
      color: #2e7d32;
      font-weight: 500;
      padding: 5px;
      border-radius: 4px;
      background: rgba(200, 230, 201, 0.3);
    }
    .csat-modal-content .error {
      color: #c62828;
      font-weight: 600;
      font-size: 1em;
      padding: 5px;
      border-radius: 4px;
      background: rgba(255, 205, 210, 0.3);
      display: inline-block;
    }
    .csat-modal-content .close-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .csat-modal-content .close-btn:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .csat-modal-content .calculate-btn {
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      margin-left: 10px;
    }
    .csat-modal-content .calculate-btn:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    /* CSAT Button */
    .csat-btn {
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: #1b5e20;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      font-size: 0.9em;
    }
    .csat-btn:hover {
      background-color: #2e7d32;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    @media (max-width: 600px) {
      input[type="file"], input[type="text"], button {
        width: 90%;
        font-size: 14px;
        padding: 10px;
      }
      .progress-container {
        width: 90%;
      }
      #gallery {
        grid-template-columns: 1fr;
      }
      .image-container {
        padding: 8px;
        max-width: 100%;
      }
      h2, h3 {
        font-size: 1.2em;
      }
      .modal-content, .csat-modal-content {
        width: 80%;
        padding: 15px;
      }
      .csat-btn {
        display: none; /* Hide CSAT button for mobile users */
      }
      .csat-modal-content .error {
        font-size: 0.85em;
        padding: 4px;
      }
      .csat-modal-content .success {
        font-size: 0.85em;
        padding: 4px;
      }
      .csat-modal-content .result-section p {
        font-size: 0.8em;
      }
    }
  </style>
</head>
<body>
  <!-- CSAT Calculator Button -->
  <button class="csat-btn" onclick="openCSATModal()">CSAT Calculator</button>

  <h2 id="mainHeader">📷SHIVANG</h2>
  <div class="upload-section">
    <input type="file" id="fileUpload" accept="image/*">
    <input type="text" id="tagInput" placeholder="Enter tag (e.g., SHIVANG)">
    <button onclick="uploadImage()">Upload</button>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress" id="progress">0%</div>
      </div>
      <div class="status" id="status">Ready</div>
    </div>
  </div>

  <h3>Uploaded Images</h3>
  <div id="gallery"></div>

  <!-- Tag Modal -->
  <div id="tagModal" class="modal">
    <div class="modal-content">
      <h4>Error: Tag is required!</h4>
      <input type="text" id="modalTagInput" placeholder="Enter tag (e.g., SHIVANG)">
      <button class="upload-btn" onclick="submitTag()">Upload</button>
      <button class="cancel-btn" onclick="closeModal()">Cancel</button>
      <div class="modal-progress-container" id="modalProgressContainer">
        <div class="modal-progress-bar">
          <div class="modal-progress" id="modalProgress">0%</div>
        </div>
      </div>
    </div>
  </div>

  <!-- CSAT Calculator Modal -->
  <div id="csatModal" class="csat-modal">
    <div class="csat-modal-content">
      <h4>CSAT Calculator</h4>
      <div class="input-section good-section">
        <label>Good Count:</label>
        <input type="number" id="goodCount" min="0" value="0">
      </div>
      <div class="input-section bad-section">
        <label>Bad Count:</label>
        <input type="number" id="badCount" min="0" value="0">
      </div>
      <div class="input-section">
        <label>Required CSAT (%):</label>
        <select id="requiredCSAT">
          <option value="70">70%+</option>
          <option value="71">71%+</option>
          <option value="72">72%+</option>
          <option value="73">73%+</option>
          <option value="74">74%+</option>
          <option value="75">75%+</option>
          <option value="76">76%+</option>
          <option value="77">77%+</option>
          <option value="78">78%+</option>
          <option value="79">79%+</option>
          <option value="80">80%+</option>
          <option value="81">81%+</option>
          <option value="82">82%+</option>
          <option value="83">83%+</option>
          <option value="84">84%+</option>
          <option value="85">85%+</option>
          <option value="86">86%+</option>
          <option value="87">87%+</option>
          <option value="88">88%+</option>
          <option value="89">89%+</option>
          <option value="90">90%+</option>
          <option value="91">91%+</option>
          <option value="92">92%+</option>
          <option value="93">93%+</option>
          <option value="94">94%+</option>
          <option value="95">95%+</option>
          <option value="96">96%+</option>
          <option value="97">97%+</option>
          <option value="98">98%+</option>
          <option value="99">99%+</option>
          <option value="100">100%+</option>
        </select>
      </div>
      <div class="result-section" id="csatResult">
        <p>Total: 0</p>
        <p>CSAT: 0%</p>
        <p id="csatStatus">Enter counts to see status</p>
      </div>
      <button class="close-btn" onclick="closeCSATModal()">Close</button>
      <button class="calculate-btn" id="calculateButton" onclick="calculateCSAT()">Calculate</button>
    </div>
  </div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
    import { getDatabase, ref, push, onValue, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCIfleywEbd1rcjymkfEfFYxPpvYdZHGhk",
      authDomain: "cvang-vahan.firebaseapp.com",
      databaseURL: "https://cvang-vahan-default-rtdb.firebaseio.com",
      projectId: "cvang-vahan",
      storageBucket: "cvang-vahan.appspot.com",
      messagingSenderId: "117318825099",
      appId: "1:117318825099:web:afc0e2f863117cb14bfc"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const imagesRef = ref(db, 'images');

    const cloudName = 'di83mshki';
    const uploadPreset = 'anonymous_upload';

    let selectedFile = null;
    let hasCalculated = false;

    window.uploadImage = function() {
      const file = document.getElementById('fileUpload').files[0];
      const tag = document.getElementById('tagInput').value.trim();
      const progressBar = document.getElementById('progress');
      const status = document.getElementById('status');

      if (!file) {
        alert("कृपया एक फोटो चुनें।");
        return;
      }

      if (!tag) {
        selectedFile = file;
        document.getElementById('tagModal').style.display = 'flex';
        return;
      }

      uploadFile(file, tag, progressBar, status);
    };

    window.submitTag = function() {
      const modalTag = document.getElementById('modalTagInput').value.trim();
      const progressBar = document.getElementById('progress');
      const status = document.getElementById('status');
      const modalProgress = document.getElementById('modalProgress');
      const modalProgressContainer = document.getElementById('modalProgressContainer');

      if (!modalTag) {
        alert("कृपया एक टैग डालें।");
        return;
      }

      modalProgressContainer.style.display = 'block';
      document.querySelector('.upload-btn').style.display = 'none';
      document.querySelector('.cancel-btn').style.display = 'none';

      uploadFile(selectedFile, modalTag, progressBar, status, modalProgress);
    };

    window.closeModal = function() {
      document.getElementById('tagModal').style.display = 'none';
      document.getElementById('modalTagInput').value = '';
      document.getElementById('modalProgressContainer').style.display = 'none';
      document.getElementById('modalProgress').style.width = '0%';
      document.getElementById('modalProgress').textContent = '0%';
      document.querySelector('.upload-btn').style.display = 'inline-block';
      document.querySelector('.cancel-btn').style.display = 'inline-block';
      selectedFile = null;
    };

    function uploadFile(file, tag, progressBar, status, modalProgress = null) {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('tags', tag);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          progressBar.style.width = percentComplete + '%';
          progressBar.textContent = percentComplete + '%';
          if (modalProgress) {
            modalProgress.style.width = percentComplete + '%';
            modalProgress.textContent = percentComplete + '%';
          }
          status.textContent = 'Uploading...';
        }
      };

      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log("Cloudinary Response:", data);
          if (!data.secure_url) {
            status.textContent = 'Upload failed: No secure URL received';
            alert('Upload failed: No secure URL received');
            closeModal();
            return;
          }
          const imgObj = {
            url: data.secure_url,
            tag: tag,
            timestamp: serverTimestamp()
          };
          push(imagesRef, imgObj)
            .then(() => {
              console.log("Firebase Push Successful:", imgObj);
              progressBar.style.width = '100%';
              progressBar.textContent = '100%';
              if (modalProgress) {
                modalProgress.style.width = '100%';
                modalProgress.textContent = '100%';
              }
              status.textContent = 'Complete';
              alert('Uploaded Successfully!');
              closeModal();
            })
            .catch((error) => {
              console.error("Firebase Push Error:", error);
              status.textContent = 'Upload failed: Firebase error';
              alert('Upload failed: Firebase error');
              closeModal();
            });
        } else {
          console.error("Cloudinary Upload Failed:", xhr.status, xhr.responseText);
          status.textContent = 'Upload failed!';
          alert('Upload failed!');
          closeModal();
        }
      };

      xhr.onerror = function() {
        status.textContent = 'Upload error occurred!';
        alert('Upload failed due to an error!');
        closeModal();
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    }

    window.downloadImage = async function(url, tag) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${tag || 'image'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error('Download failed:', err);
        alert('Failed to download the image.');
      }
    };

    onValue(imagesRef, (snapshot) => {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      const images = snapshot.val();
      const now = Date.now();

      console.log("Firebase Data:", images);

      if (images) {
        const sortedImages = Object.entries(images)
          .map(([key, img]) => ({ key, ...img }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        sortedImages.forEach(({ key, url, tag, timestamp }) => {
          const imgTimestamp = timestamp || 0;
          if (now - imgTimestamp < 300000) {
            const container = document.createElement('div');
            container.className = 'image-container';
            container.innerHTML = `
              <p class="tag">Tag: ${tag}</p>
              <img src="${url}" alt="uploaded image" onload="console.log('Image loaded:', '${url}')">
              <button class="download-btn" onclick="downloadImage('${url}', '${tag}')">Download</button>
            `;
            gallery.appendChild(container);
          } else {
            remove(ref(db, `images/${key}`))
              .then(() => console.log(`Image ${key} deleted from Firebase`))
              .catch((error) => console.error("Delete Error:", error));
          }
        });
      } else {
        console.log("No images in Firebase");
      }
    });

    // CSAT Calculator Functions
    window.openCSATModal = function() {
      document.getElementById('csatModal').style.display = 'flex';
      calculateCSAT();
    };

    window.closeCSATModal = function() {
      document.getElementById('csatModal').style.display = 'none';
      document.getElementById('goodCount').value = '0';
      document.getElementById('badCount').value = '0';
      document.getElementById('requiredCSAT').value = '70';
      document.getElementById('calculateButton').textContent = 'Calculate';
      hasCalculated = false;
      calculateCSAT();
    };

    window.calculateCSAT = function() {
      const goodCount = parseInt(document.getElementById('goodCount').value) || 0;
      const badCount = parseInt(document.getElementById('badCount').value) || 0;
      const requiredCSAT = parseInt(document.getElementById('requiredCSAT').value);
      const resultSection = document.getElementById('csatResult');
      const status = document.getElementById('csatStatus');
      const calculateButton = document.getElementById('calculateButton');

      const total = goodCount + badCount;
      const csat = total === 0 ? 0 : (goodCount / total) * 100;
      const formattedCSAT = csat.toFixed(2);

      resultSection.querySelector('p:nth-child(1)').textContent = `Total: ${total}`;
      resultSection.querySelector('p:nth-child(2)').textContent = `CSAT: ${formattedCSAT}%`;

      if (total === 0) {
        status.textContent = 'Enter counts to see status';
        status.className = '';
        return;
      }

      // Calculate the number of additional good counts needed to exceed required CSAT
      let additionalGoodNeeded = 0;
      let newCSAT = csat;
      let newGoodCount = goodCount;
      let newTotal = total;

      // If CSAT is less than or equal to required, calculate how many more good counts are needed
      if (csat <= requiredCSAT) {
        while (newCSAT <= requiredCSAT) {
          additionalGoodNeeded++;
          newGoodCount = goodCount + additionalGoodNeeded;
          newTotal = total + additionalGoodNeeded;
          newCSAT = (newGoodCount / newTotal) * 100;
        }
      }

      const exactCSAT = newCSAT;

      const isAboveRequired = csat > requiredCSAT;

      if (isAboveRequired) {
        status.textContent = `Success! CSAT (${formattedCSAT}%) is above required (${requiredCSAT}%+).`;
        status.className = 'success';
      } else {
        status.textContent = `Need ${additionalGoodNeeded} more good count(s) to achieve ${requiredCSAT}%+ (exact: ${exactCSAT.toFixed(2)}%).`;
        status.className = 'error';
      }

      if (!hasCalculated) {
        hasCalculated = true;
        calculateButton.textContent = 'Recalculate';
      }
    };
  </script>
</body>
</html>
