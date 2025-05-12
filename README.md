
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
      max-width: 200px;
    }
    .image-container:hover {
      transform: scale(1.05);
    }
    #gallery img {
      max-width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 5px;
      border: 2px solid #ccc;
    }
    .tag {
      margin: 5px 0;
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .download-btn {
      background-color: #2196F3;
      color: white;
      padding: 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 5px;
      font-size: 14px;
    }
    .download-btn:hover {
      background-color: #1976D2;
    }
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
        max-width: 100%;
      }
      h2, h3 {
        font-size: 1.2em;
      }
    }
  </style>
</head>
<body>
  <h2>📷SHIVANG </h2>
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

    // डाउनलोड फंक्शन
    window.downloadImage = async function(url, tag) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${tag || 'image'}.jpg`; // डिफॉल्ट फाइल नाम टैग के आधार पर
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error('Download failed:', err);
        alert('Failed to download the image.');
      }
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
              <p class="tag">Tag: ${img.tag}</p>
              <img src="${img.url}" alt="uploaded image">
              <button class="download-btn" onclick="downloadImage('${img.url}', '${img.tag}')">Download</button>
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
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'93e6e3b21ce0ed84',t:'MTc0NzAyMTE3MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
