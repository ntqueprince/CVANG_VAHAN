
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CVANG</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
      background: #f0f0f0;
      text-align: center;
      margin: 0;
    }
    h2, h3 {
      color: #333;
    }
    .upload-section {
      margin-bottom: 20px;
    }
    input[type="file"], input[type="text"], button {
      padding: 12px;
      margin: 8px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 80%;
      max-width: 300px;
      box-sizing: border-box;
    }
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #45a049;
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
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
    }
    .image-container:hover {
      transform: scale(1.05);
    }
    #gallery img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      border: 2px solid #ccc;
    }
    p {
      margin: 5px 0;
      font-size: 14px;
      color: #555;
    }
    /* मोबाइल के लिए रिस्पॉन्सिव स्टाइल */
    @media (max-width: 600px) {
      input[type="file"], input[type="text"], button {
        width: 90%;
        font-size: 14px;
        padding: 10px;
      }
      #gallery {
        grid-template-columns: 1fr;
      }
      .image-container {
        padding: 8px;
      }
      h2, h3 {
        font-size: 1.2em;
      }
    }
  </style>
</head>
<body>
  <h2>📷 CVANG_THE_HOSTER</h2>
  <div class="upload-section">
    <input type="file" id="fileUpload" accept="image/*">
    <input type="text" id="tagInput" placeholder="Enter tag (e.g., Party)">
    <button onclick="uploadImage()">Upload</button>
  </div>

  <h3>Uploaded Images</h3>
  <div id="gallery"></div>

  <!-- Firebase SDK -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
    import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

    // Firebase Config
    const firebaseConfig = {
      apiKey: "AIzaSyCIfleywEbd1rcjymkfEfFYxPpvYdZHGhk",
      authDomain: "cvang-vahan.firebaseapp.com",
      databaseURL: "https://cvang-vahan-default-rtdb.firebaseio.com",
      projectId: "cvang-vahan",
      storageBucket: "cvang-vahan.appspot.com",
      messagingSenderId: "117318825099",
      appId: "1:117318825099:web:afc0e2f863117cb14bfc"
    };

    // Firebase Initialize
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const imagesRef = ref(db, 'images');

    // Cloudinary Config
    const cloudName = 'di83mshki';
    const uploadPreset = 'anonymous_upload';

    // अपलोड फंक्शन
    window.uploadImage = function() {
      const file = document.getElementById('fileUpload').files[0];
      const tag = document.getElementById('tagInput').value || 'No Tag';

      if (!file) {
        alert("कृपया एक फोटो चुनें।");
        return;
      }

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('tags', tag);

      fetch(url, { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
          const imgObj = {
            url: data.secure_url,
            tag: tag,
            timestamp: Date.now()
          };
          // Firebase में स्टोर करें
          push(imagesRef, imgObj);
          alert('Uploaded Successfully!');
        })
        .catch(err => {
          console.error(err);
          alert('Upload failed!');
        });
    };

    // Firebase से इमेज लोड और 5 मिनट बाद डिलीट (सिर्फ Firebase से)
    onValue(imagesRef, (snapshot) => {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      const images = snapshot.val();
      const now = Date.now();

      if (images) {
        Object.keys(images).forEach(key => {
          const img = images[key];
          if (now - img.timestamp < 300000) { // 5 मिनट
            const container = document.createElement('div');
            container.className = 'image-container';
            container.innerHTML = `
              <a href="${img.url}" target="_blank" download>
                <img src="${img.url}" alt="uploaded image">
              </a>
              <p>Tag: ${img.tag}</p>
            `;
            gallery.appendChild(container);
          } else {
            // 5 मिनट से पुरानी इमेज सिर्फ Firebase से डिलीट करें
            remove(ref(db, `images/${key}`));
          }
        });
      }
    });
  </script>
</body>
</html>
