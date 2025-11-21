  // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
      import { getDatabase, ref as dbRef, push, onValue, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

      // Your web app's Firebase configuration (using config from structure.html)
      const firebaseConfig = {
        apiKey: "AIzaSyCIfleywEbd1rcjymkfEfFYxPpvYdZHGhk",
        authDomain: "cvang-vahan.firebaseapp.com",
        databaseURL: "https://cvang-vahan-default-rtdb.firebaseio.com",
        projectId: "cvang-vahan",
        storageBucket: "cvang-vahan.appspot.com",
        messagingSenderId: "117318825099",
        appId: "1:117318825099:web:afc0e2f863117cb14bfc"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const imagesRef = dbRef(db, 'images');

      // Cloudinary configuration (from structure.html)
      const cloudName = 'doyawhzog'; // Replace with your Cloudinary cloud name
      const uploadPreset = 'anonymous_upload'; // Replace with your Cloudinary upload preset
      // ✅ Handle paste event for images
document.addEventListener("paste", function (event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (const item of items) {
    if (item.type.indexOf("image") === 0) {
      const file = item.getAsFile();
      if (file) {
        const tagInput = document.getElementById("tagInput");
        const tag = tagInput.value.trim() || "ClipboardImage";
        const progressBar = document.getElementById("progress");
        const statusText = document.getElementById("status");
        uploadFile(file, tag, progressBar, statusText);
      }
    }
  }
});


      // Global variables
      let selectedFile = null;
      let selectedFiles = [];
      let hasCalculated = false;

      // Expose functions to window object
  // Multiple Image Upload Function
  window.uploadImage = function () {
    const uploadBtn = document.querySelector(".colorful-upload-btn");
    uploadBtn.style.display = "none"; // Upload button ko hide kar do

    const fileInput = document.getElementById("fileUpload");
    const tagInput = document.getElementById("tagInput");
    const files = fileInput.files;   // Multiple files select kiye gaye
    const tag = tagInput.value.trim();
    const progressBar = document.getElementById("progress");
    const statusText = document.getElementById("status");

    if (!files.length) {
      showMessage("Please select at least one file!", "error");
      return;
    }

    if (!tag) {
    // Agar tag blank hai to sabhi files save karo
    selectedFiles = Array.from(files);
    document.getElementById("tagModal").style.display = "flex";
    return;
  }

    // ✅ Loop through all selected files
    Array.from(files).forEach((file) => {
      uploadFile(file, tag, progressBar, statusText);
    });
  };


      window.closeModal = function() {
        document.getElementById('tagModal').style.display = 'none';
        document.getElementById('modalTagInput').value = '';
        document.getElementById('modalProgressContainer').style.display = 'none';
        document.getElementById('modalProgress').style.width = '0%';
        document.getElementById('modalProgress').textContent = '0%';
        document.querySelector('.modal-content .upload-btn').style.display = 'inline-block'; // Show buttons again
        document.querySelector('.modal-content .cancel-btn').style.display = 'inline-block'; // Show buttons again
        selectedFile = null; // Clear selected file
      };

      window.submitTag = function() {
        const modalTagInput = document.getElementById('modalTagInput');
        const tag = modalTagInput.value.trim();
        const progressBar = document.getElementById('progress');
        const statusText = document.getElementById('status');
        const modalProgress = document.getElementById('modalProgress');
        const modalProgressContainer = document.getElementById('modalProgressContainer');

        if (!tag) {
          showMessage("Tag is required!", "error");
          return;
        }

        modalProgressContainer.style.display = 'block';
        document.querySelector('.modal-content .upload-btn').style.display = 'none'; // Hide buttons during upload
        document.querySelector('.modal-content .cancel-btn').style.display = 'none'; // Hide buttons during upload

    // ✅ Multiple files handle
  if (selectedFiles.length > 0) {
    selectedFiles.forEach((file, index) => {
      uploadFile(file, tag, progressBar, statusText, modalProgress);
      if (index === selectedFiles.length - 1) {
        // Last file ke baad modal close
        setTimeout(() => closeModal(), 1000);
      }
    });
    selectedFiles = []; // reset
  } else if (selectedFile) {
    uploadFile(selectedFile, tag, progressBar, statusText, modalProgress);
    setTimeout(() => closeModal(), 1000);
    selectedFile = null; // reset
  }
      };

      function uploadFile(file, tag, progressBar, statusText) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('tags', tag);

    const xhr = new XMLHttpRequest();

    // Progress bar update for each file
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        progressBar.style.width = percentComplete + '%';
        progressBar.textContent = percentComplete + '%';
        statusText.textContent = 'Uploading...';
      }
    };

    // Upload complete
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (!data.secure_url) {
          showMessage('Upload failed: No secure URL received', 'error');
          statusText.textContent = 'Upload failed!';
          return;
        }

        const imgObj = {
          url: data.secure_url,
          tag: tag,
          name: file.name,
          timestamp: Date.now()
        };

        // Save into Firebase
        push(imagesRef, imgObj)
          .then(() => {
            progressBar.style.width = '100%';
            progressBar.textContent = '100%';
            statusText.textContent = 'Complete';
            showMessage(`${file.name} uploaded successfully!`, 'info');
            document.getElementById('fileUpload').value = '';
            document.getElementById('tagInput').value = '';
            loadImages();
          })
          .catch((error) => {
            console.error("Firebase Push Error:", error);
            statusText.textContent = 'Upload failed: Firebase error';
            showMessage('Upload failed: Firebase error', 'error');
          });
      } else {
        console.error("Cloudinary Upload Failed:", xhr.status, xhr.responseText);
        statusText.textContent = 'Upload failed!';
        showMessage('Upload failed!', 'error');
      }
    };

    xhr.onerror = function () {
      console.error("Upload error occurred:", xhr.status);
      statusText.textContent = 'Upload error!';
      showMessage('Upload failed due to network error!', 'error');
    };

    xhr.open('POST', url, true);
    xhr.send(formData);
  }

      // Custom message box function (instead of alert)
      function showMessage(message, type = "info") {
        const messageBox = document.createElement("div");
        messageBox.style.position = "fixed";
        messageBox.style.top = "20px";
        messageBox.style.left = "50%";
        messageBox.style.transform = "translateX(-50%)";
        messageBox.style.padding = "15px 25px";
        messageBox.style.borderRadius = "10px";
        messageBox.style.zIndex = "9999";
        messageBox.style.color = "white";
        messageBox.style.fontWeight = "bold";
        messageBox.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        messageBox.style.transition = "opacity 0.5s ease-in-out";
        messageBox.style.opacity = "1";

        if (type === "error") {
          messageBox.style.backgroundColor = "#f44336"; /* Red */
        } else {
          messageBox.style.backgroundColor = "#4CAF50"; /* Green */
        }

        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        setTimeout(() => {
          messageBox.style.opacity = "0";
          messageBox.addEventListener("transitionend", () => messageBox.remove());
        }, 3000);
      }

      // Function to handle direct image download
      window.downloadImageDirectly = async function(imageUrl, fileName) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          showMessage('Download initiated!', 'info');
        } catch (error) {
          console.error("Error downloading image:", error);
          showMessage('Failed to download image.', 'error');
        }
      };


      function loadImages() {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        // Clear the gallery first to avoid duplicates when data updates
        // The onValue listener will handle re-rendering on changes
        onValue(imagesRef, (snapshot) => {
          gallery.innerHTML = ''; // Clear content every time data changes
          const images = snapshot.val();
          const now = Date.now();

          if (images) {
            const sortedImages = Object.entries(images)
              .map(([key, img]) => ({ key, ...img }))
              .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // Sort by timestamp descending

            sortedImages.forEach(({ key, url, tag, timestamp, name }) => {
              // Check if the image is older than 5 minutes (300,000 milliseconds)
              // If it is, delete it from the database (cleanup logic)
              if (now - (timestamp || 0) > 300000) {
                remove(dbRef(db, `images/${key}`))
                  .then(() => console.log(`Image ${key} deleted (older than 5 min)`))
                  .catch((error) => console.error("Auto-delete error:", error));
              } else {
                const container = document.createElement('div');
                container.className = 'image-container';

                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = tag || 'Uploaded image';
                imgElement.loading = 'lazy';
                imgElement.onerror = () => { // Fallback for broken images
                  imgElement.src = `https://placehold.co/150x150/cccccc/333333?text=Image+Error`;
                  console.warn(`Failed to load image: ${url}`);
                };

                const tagElement = document.createElement('p');
                tagElement.className = 'tag';
                tagElement.textContent = `Tag: ${tag || 'No tag'}`;

                // Changed to Download Button with new downloadImageDirectly function
                const downloadBtn = document.createElement('button'); // Changed back to button for click event
                downloadBtn.className = 'download-btn';
                downloadBtn.textContent = 'Download';
                // Call the new download function
                downloadBtn.onclick = () => window.downloadImageDirectly(url, name || `image_${key}.jpg`);

                container.appendChild(imgElement);
                container.appendChild(tagElement);
                container.appendChild(downloadBtn); // Append the download button
                gallery.appendChild(container);
              }
            });
          } else {
            gallery.innerHTML = '<p style="color: #455a64; margin-top: 20px;">No images uploaded yet.</p>';
          }
        });
      }

      // CSAT Calculator Functions
      window.openCSATModal = function() {
        document.getElementById('csatModal').style.display = 'flex';
        hideAllMainContent();
        // Ensure all other full-page views are hidden
        const endorsementPage = document.getElementById('endorsementPage');
        if (endorsementPage) endorsementPage.style.display = 'none';
        const manualVIPage = document.getElementById('manualVIPage');
        if (manualVIPage) manualVIPage.style.display = 'none';
        const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
        if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
        const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
        if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
        const rsaContactPage = document.getElementById('rsaContactPage');
        if (rsaContactPage) rsaContactPage.style.display = 'none';
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
        showAllMainContent();
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
    status.innerHTML = '<span class="shivang-rainbow">SHIVANG</span>';
    status.className = '';
    return;
}

        let additionalGoodNeeded = 0;
        let newCSAT = csat;
        let newGoodCount = goodCount;
        let newTotal = total;

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

      // Close CSAT Modal on Outside Click
      document.getElementById('csatModal').addEventListener('click', function(event) {
        if (event.target === this) {
          closeCSATModal();
        }
      });

      // ENDORSEMENT Full-Page Functionality
      window.openEndorsementPage = function() {
        document.getElementById('endorsementPage').style.display = 'block';
        setTimeout(() => {
          const endorsementContainer = document.querySelector('.endorsement-container');
          if (endorsementContainer) endorsementContainer.classList.add('active');
        }, 10);
        hideAllMainContent();
        // Ensure all other full-page views are hidden
        const csatModal = document.getElementById('csatModal');
        if (csatModal) csatModal.style.display = 'none';
        const manualVIPage = document.getElementById('manualVIPage');
        if (manualVIPage) manualVIPage.style.display = 'none';
        const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
        if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
        const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
        if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
        const rsaContactPage = document.getElementById('rsaContactPage');
        if (rsaContactPage) rsaContactPage.style.display = 'none';
      };

      window.closeEndorsementPage = function() {
        const endorsementPage = document.getElementById('endorsementPage');
        if (endorsementPage) endorsementPage.style.display = 'none';
        const endorsementContainer = document.querySelector('.endorsement-container');
        if (endorsementContainer) endorsementContainer.classList.remove('active');
        showAllMainContent();
      };

      // Close ENDORSEMENT Page on Outside Click
      document.getElementById('endorsementPage').addEventListener('click', function(event) {
        if (event.target === this) {
          closeEndorsementPage();
        }
      });

      // MANUAL-VI Full-Page Functionality
      window.openManualVIPage = function() {
        document.getElementById('manualVIPage').style.display = 'block';
        // Ensure the manual VI card content is visible by default when opening this page
        const manualVICardContent = document.getElementById('manualVICardContent');
        if (manualVICardContent) manualVICardContent.style.display = 'block';
        const claimCoverageOverlay = document.getElementById('claimCoverageOverlay');
        if (claimCoverageOverlay) claimCoverageOverlay.style.display = 'none'; // Hide overlay initially
        const manualVIPage = document.getElementById('manualVIPage');
        if (manualVIPage) manualVIPage.classList.remove('claim-coverage-active'); // Remove class if present
        hideAllMainContent();
        // Ensure all other full-page views are hidden
        const csatModal = document.getElementById('csatModal');
        if (csatModal) csatModal.style.display = 'none';
        const endorsementPage = document.getElementById('endorsementPage');
        if (endorsementPage) endorsementPage.style.display = 'none';
        const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
        if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
        const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
        if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
        const rsaContactPage = document.getElementById('rsaContactPage');
        if (rsaContactPage) rsaContactPage.style.display = 'none';
      };

      window.closeManualVIPage = function() {
        const manualVIPage = document.getElementById('manualVIPage');
        if (manualVIPage) manualVIPage.style.display = 'none';
        showAllMainContent();
        // Also hide the claim coverage overlay when going back to home
        const claimCoverageOverlay = document.getElementById('claimCoverageOverlay');
        if (claimCoverageOverlay) claimCoverageOverlay.style.display = 'none';
        const manualVIPageClassList = document.getElementById('manualVIPage');
        if (manualVIPageClassList) manualVIPageClassList.classList.remove('claim-coverage-active');
      };

      // Toggle Claim Coverage Overlay within Manual VI Page
      window.toggleClaimCoverage = function() {
          const manualVICardContent = document.getElementById('manualVICardContent');
          const claimCoverageOverlay = document.getElementById('claimCoverageOverlay');
          const manualVIPage = document.getElementById('manualVIPage');

          if (claimCoverageOverlay && manualVICardContent && manualVIPage) {
              if (claimCoverageOverlay.style.display === 'flex') {
                  // If overlay is visible, hide it and show main card content
                  claimCoverageOverlay.style.display = 'none';
                  manualVICardContent.style.display = 'block';
                  manualVIPage.classList.remove('claim-coverage-active'); // Remove class
              } else {
                  // If overlay is hidden, show it and hide main card content
                  claimCoverageOverlay.style.display = 'flex';
                  manualVICardContent.style.display = 'none';
                  manualVIPage.classList.add('claim-coverage-active'); // Add class for styling
              }
          }
      };

      // Close Manual VI Page OR Claim Coverage Overlay on Outside Click
      document.getElementById('manualVIPage').addEventListener('click', function(event) {
        // If the click is directly on the manual-vi-page (background),
        // regardless of which sub-section is open, close the entire page.
        if (event.target === this) {
          closeManualVIPage();
        }
      });

      // New: Add click listener to the claimCoverageOverlay to close the entire manualVIPage
      document.getElementById('claimCoverageOverlay').addEventListener('click', function(event) {
          if (event.target === this) { // Only if the click is directly on the overlay's background
              closeManualVIPage(); // Go back to the main page
          }
      });


      // New Claim_Count & NSTP Page Functionality
      window.openClaimCountNSTPPage = function() {
        document.getElementById('claimCountNSTPPage').style.display = 'block';
        hideAllMainContent();
        // Ensure all other full-page views are hidden
        const csatModal = document.getElementById('csatModal');
        if (csatModal) csatModal.style.display = 'none';
        const endorsementPage = document.getElementById('endorsementPage');
        if (endorsementPage) endorsementPage.style.display = 'none';
        const manualVIPage = document.getElementById('manualVIPage');
        if (manualVIPage) manualVIPage.style.display = 'none';
        const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
        if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
        const rsaContactPage = document.getElementById('rsaContactPage');
        if (rsaContactPage) rsaContactPage.style.display = 'none';
        // Populate the table when the page is opened
        populateTable(insuranceData);
        // Re-apply sort/search listeners as content is dynamic
        setupInsuranceDashboardListeners();
      };

      window.closeClaimCountNSTPPage = function() {
          const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
          if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
          showAllMainContent();
      };

      // Close Claim_Count & NSTP Page on Outside Click
      document.getElementById('claimCountNSTPPage').addEventListener('click', function(event) {
        if (event.target === this) {
          // Only close if the click is directly on the overlay, not on the content
          if (event.target.classList.contains('claim-count-nstp-page')) {
            closeClaimCountNSTPPage();
          }
        }
      });
      
      // New Inspection Waiver Page Functionality
      window.openInspectionWaiverPage = function() {
          document.getElementById('inspectionWaiverPage').style.display = 'block';
          hideAllMainContent();
          // Ensure all other full-page views are hidden
          const csatModal = document.getElementById('csatModal');
          if (csatModal) csatModal.style.display = 'none';
          const endorsementPage = document.getElementById('endorsementPage');
          if (endorsementPage) endorsementPage.style.display = 'none';
          const manualVIPage = document.getElementById('manualVIPage');
          if (manualVIPage) manualVIPage.style.display = 'none';
          const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
          if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
          const rsaContactPage = document.getElementById('rsaContactPage');
          if (rsaContactPage) rsaContactPage.style.display = 'none';
          // Add a small delay to ensure the page is fully rendered before populating
          setTimeout(() => {
              populateInspectionWaiverTable(inspectionWaiverData);
              console.log("Inspection Waiver table populated with data:", inspectionWaiverData); // Debugging log
          }, 0);
      };

      window.closeInspectionWaiverPage = function() {
          const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
          if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
          showAllMainContent();
      };

      // Close Inspection Waiver Page on Outside Click
      document.getElementById('inspectionWaiverPage').addEventListener('click', function(event) {
          if (event.target === this) {
              closeInspectionWaiverPage();
          }
      });

      // New RSA & Contact Page Functionality
      window.openRSAPage = function() {
          document.getElementById('rsaContactPage').style.display = 'block';
          hideAllMainContent();
          // Ensure all other full-page views are hidden
          const csatModal = document.getElementById('csatModal');
          if (csatModal) csatModal.style.display = 'none';
          const endorsementPage = document.getElementById('endorsementPage');
          if (endorsementPage) endorsementPage.style.display = 'none';
          const manualVIPage = document.getElementById('manualVIPage');
          if (manualVIPage) manualVIPage.style.display = 'none';
          const claimCountNSTPPage = document.getElementById('claimCountNSTPPage');
          if (claimCountNSTPPage) claimCountNSTPPage.style.display = 'none';
          const inspectionWaiverPage = document.getElementById('inspectionWaiverPage');
          if (inspectionWaiverPage) inspectionWaiverPage.style.display = 'none';
          // Add a small delay to ensure the page is fully rendered before populating
          setTimeout(() => {
              populateRSATable(rsaContactData);
              console.log("RSA & Contact table populated with data:", rsaContactData); // Debugging log
          }, 0);
          setupRSADashboardListeners();
      };

      window.closeRSAPage = function() {
          const rsaContactPage = document.getElementById('rsaContactPage');
          if (rsaContactPage) rsaContactPage.style.display = 'none';
          showAllMainContent();
      };

      // Close RSA & Contact Page on Outside Click
      document.getElementById('rsaContactPage').addEventListener('click', function(event) {
          if (event.target === this) {
              closeRSAPage();
          }
      });

      // Helper functions to manage visibility
      function hideAllMainContent() {
        const uploadSection = document.querySelector('.upload-section');
        if (uploadSection) uploadSection.style.display = 'none';
        const h3Element = document.querySelector('h3'); /* 'Uploaded Images' header */
        if (h3Element) h3Element.style.display = 'none';
        const gallery = document.getElementById('gallery');
        if (gallery) gallery.style.display = 'none';
        const csatBtn = document.querySelector('.csat-btn');
        if (csatBtn) csatBtn.style.display = 'none';
        const endorsementBtn = document.querySelector('.endorsement-btn');
        if (endorsementBtn) endorsementBtn.style.display = 'none';
        const manualVIBtnFixed = document.querySelector('.manual-vi-btn-fixed');
        if (manualVIBtnFixed) manualVIBtnFixed.style.display = 'none';
        const claimCountNSTPBtnFixed = document.querySelector('.claim-count-nstp-btn-fixed');
        if (claimCountNSTPBtnFixed) claimCountNSTPBtnFixed.style.display = 'none';
        const inspectionWaiverBtnFixed = document.querySelector('.inspection-waiver-btn-fixed');
        if (inspectionWaiverBtnFixed) inspectionWaiverBtnFixed.style.display = 'none';
        const rsaContactBtnFixed = document.querySelector('.rsa-contact-btn-fixed');
        if (rsaContactBtnFixed) rsaContactBtnFixed.style.display = 'none';
        const companyUpdatesButton = document.getElementById('companyUpdatesButton');
        if (companyUpdatesButton) companyUpdatesButton.style.display = 'none';
        const notebookButton = document.getElementById('notebookButton');
        if (notebookButton) notebookButton.style.display = 'none';
      }

      function showAllMainContent() {
        const uploadSection = document.querySelector('.upload-section');
        if (uploadSection) uploadSection.style.display = 'block';
        const h3Element = document.querySelector('h3'); /* 'Uploaded Images' header */
        if (h3Element) h3Element.style.display = 'block';
        const gallery = document.getElementById('gallery');
        if (gallery) gallery.style.display = 'grid'; /* grid for gallery */

        // Only show fixed buttons if not on mobile (based on media query)
        const isMobile = window.matchMedia("(max-width: 600px)").matches;
        if (!isMobile) {
          const csatBtn = document.querySelector('.csat-btn');
          if (csatBtn) csatBtn.style.display = 'block';
          const endorsementBtn = document.querySelector('.endorsement-btn');
          if (endorsementBtn) endorsementBtn.style.display = 'block';
          const manualVIBtnFixed = document.querySelector('.manual-vi-btn-fixed');
          if (manualVIBtnFixed) manualVIBtnFixed.style.display = 'block';
          const claimCountNSTPBtnFixed = document.querySelector('.claim-count-nstp-btn-fixed');
          if (claimCountNSTPBtnFixed) claimCountNSTPBtnFixed.style.display = 'block';
          const inspectionWaiverBtnFixed = document.querySelector('.inspection-waiver-btn-fixed');
          if (inspectionWaiverBtnFixed) inspectionWaiverBtnFixed.style.display = 'block';
          const rsaContactBtnFixed = document.querySelector('.rsa-contact-btn-fixed');
          if (rsaContactBtnFixed) rsaContactBtnFixed.style.display = 'block';
        }
        // Explicitly control visibility of the new updates button
        const companyUpdatesButton = document.getElementById('companyUpdatesButton');
        if (companyUpdatesButton) companyUpdatesButton.style.display = 'flex';
        const notebookButton = document.getElementById('notebookButton');
        if (notebookButton) notebookButton.style.display = 'flex';
      }

      // Endorsement Data and Logic
      const insurerDropdown = document.querySelector('.endorsement-page #insurer');
      const requirementDropdown = document.querySelector('.endorsement-page #requirement');
      const outputBox = document.querySelector('.endorsement-page #output');

      // Empty array for you to manually add JSON data for Endorsement
      const endorsementData = [{
      "InsurerRequirement": "New India AssuranceAddition of GST No.",
      "Insurer": "New India Assurance",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceChassis Number",
      "Insurer": "New India Assurance",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceColour Change",
      "Insurer": "New India Assurance",
      "Requirement": "Colour Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceEngine Number",
      "Insurer": "New India Assurance",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceHypothecation Remove",
      "Insurer": "New India Assurance",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceHypothecation Add",
      "Insurer": "New India Assurance",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceHypothecation Change",
      "Insurer": "New India Assurance",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceInsured name",
      "Insurer": "New India Assurance",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceNCB Certificate",
      "Insurer": "New India Assurance",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter or new vehicle invoice, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "InsurerRequirement": "New India AssuranceRegistration Date",
      "Insurer": "New India Assurance",
      "Requirement": "Registration Date",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceRegst. Number",
      "Insurer": "New India Assurance",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceRTO Endorsement",
      "Insurer": "New India Assurance",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceSeating Capacity",
      "Insurer": "New India Assurance",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssurancePeriod of Insurance (POI)",
      "Insurer": "New India Assurance",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssurancePYP Details- POI or Insurer or Policy number",
      "Insurer": "New India Assurance",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceTP details",
      "Insurer": "New India Assurance",
      "Requirement": "TP details",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Bundled TP or PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceCommunication Address",
      "Insurer": "New India Assurance",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceDate of Birth (DOB)",
      "Insurer": "New India Assurance",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceEmail Address",
      "Insurer": "New India Assurance",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceMobile Number",
      "Insurer": "New India Assurance",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceNominee Details",
      "Insurer": "New India Assurance",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceSalutation",
      "Insurer": "New India Assurance",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceOwner Driver Personal Accident",
      "Insurer": "New India Assurance",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssurancePaid Driver",
      "Insurer": "New India Assurance",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceUn Named Passanger Cover",
      "Insurer": "New India Assurance",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceCNG Addition External",
      "Insurer": "New India Assurance",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceCNG Addition Company fitted",
      "Insurer": "New India Assurance",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceCubic Capacity (CC)",
      "Insurer": "New India Assurance",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "New India Assurance",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceIDV Change",
      "Insurer": "New India Assurance",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceManufactured Date",
      "Insurer": "New India Assurance",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceMake, Model & Variant",
      "Insurer": "New India Assurance",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceOwnership Transfer",
      "Insurer": "New India Assurance",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceNCB Correction (taken extra NCB)",
      "Insurer": "New India Assurance",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceNCB Correction (taken less NCB)",
      "Insurer": "New India Assurance",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceTop Up (PAYD plan)",
      "Insurer": "New India Assurance",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "New India Assurance",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,KYC,PYP, Proposal Form & Bank statement with payee name",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": " total mismatch post issuance cancellation not possible ( only correction possible)",
      "Declaration format (if declaration required)": ""
    },
    {
    "InsurerRequirement": "New India AssurancePost Issuance Cancellation",
    "Insurer": "New India Assurance",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "NA",
    "Documents or any other requirement": "Alternate Policy and Reason for cancellation",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Deduction",
    "Inspection": "NA",
    "Any Exception": "To cancel a third-party policy, need to provide an alternate policy from the same insurer with the same issuance date(POI) and cancellation can be processed if the customer provides an alternate policy from the same POI or has another policy that was effective before the NIA policy start date.",
    "Declaration format (if declaration required)": "NA"
  },
    {
      "InsurerRequirement": "New India AssurancePost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "New India Assurance",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "not possible",
      "Documents or any other requirement": "not possible",
      "TAT": "not possible",
      "Charges / Deduction": "not possible",
      "Inspection": "",
      "Any Exception": " total mismatch post issuance cancellation not possible ( only correction possible)",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "New India AssuranceM-Parivahan",
      "Insurer": "New India Assurance",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },{
      "InsurerRequirement": "BajajAddition of GST No.",
      "Insurer": "Bajaj",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajChassis Number",
      "Insurer": "Bajaj",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajColour Change",
      "Insurer": "Bajaj",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Not Possible",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajEngine Number",
      "Insurer": "Bajaj",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajHypothecation Remove",
      "Insurer": "Bajaj",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bank NOC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajHypothecation Add",
      "Insurer": "Bajaj",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajHypothecation Change",
      "Insurer": "Bajaj",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC and Previous Bank NOC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajInsured name",
      "Insurer": "Bajaj",
      "Requirement": "Insured name",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "RC and Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajNCB Certificate",
      "Insurer": "Bajaj",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter & RC (In case of vehicle sold out)\nRC and Customer request (If vehicle retained)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "Maybe",
      "Any Exception": "Cacellation Decalration Required :\nSell letter required if cx wants to cancel the policy and OD premium will be refund and Third party premium will be retained by insurer\nIf cx don't want to cancel the policy then NCB Recovery and inspection will be applicable (Sell letter will be required in case of OT)",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajRegistration Date",
      "Insurer": "Bajaj",
      "Requirement": "Registration Date",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC , Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajRegst. Number",
      "Insurer": "Bajaj",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase of State change (for eg: MH to DL), then RTO receipt will be required",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajRTO Endorsement",
      "Insurer": "Bajaj",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajSeating Capacity",
      "Insurer": "Bajaj",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajPeriod of Insurance (POI)",
      "Insurer": "Bajaj",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,Previous Year Policy and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajPYP Details- POI or Insurer or Policy number",
      "Insurer": "Bajaj",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,Previous Year Policy and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajTP details",
      "Insurer": "Bajaj",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,Previous Year Policy , Bundle Policy and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajCommunication Address",
      "Insurer": "Bajaj",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete Address with Pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajDate of Birth (DOB)",
      "Insurer": "Bajaj",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajEmail Address",
      "Insurer": "Bajaj",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Email Id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajMobile Number",
      "Insurer": "Bajaj",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Mobile No.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajNominee Details",
      "Insurer": "Bajaj",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajSalutation",
      "Insurer": "Bajaj",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct Salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajOwner Driver Personal Accident",
      "Insurer": "Bajaj",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC ,Driving License ,pan card and Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajPaid Driver",
      "Insurer": "Bajaj",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC ,Unmasked Aadhar card of Insured , Driving License of Driver and 3 Months Salary slip",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Rs.50/- will be applicable in case of 2W",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajUn Named Passanger Cover",
      "Insurer": "Bajaj",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC ,Unmasked Aadhar card and written confirmation of coverage for Rs.50 - 1L and Rs.100/- 2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajCNG Addition External",
      "Insurer": "Bajaj",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajCNG Addition Company fitted",
      "Insurer": "Bajaj",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajCubic Capacity (CC)",
      "Insurer": "Bajaj",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Raise to insurer with Quote with correct cc",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Bajaj",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajIDV Change",
      "Insurer": "Bajaj",
      "Requirement": "IDV Change",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Unmasked Aadhar card and Renewal Notice (which customer receives at the time of booking)",
      "TAT": "Not Possible",
      "Charges / Deduction": "May be",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajManufactured Date",
      "Insurer": "Bajaj",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajMake, Model & Variant",
      "Insurer": "Bajaj",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "Maybe",
      "Any Exception": "For ticket associate: Raise to insurer with Quote with MMV",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajOwnership Transfer",
      "Insurer": "Bajaj",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and Proposal Form",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajNCB Correction (taken extra NCB)",
      "Insurer": "Bajaj",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy and confirmation if customer has taken claim or not",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "Verbal confirmation if customer has taken claim or not",
      "Declaration format": ""
    },
    {
      "InsurerRequirement": "BajajNCB Correction (taken less NCB)",
      "Insurer": "Bajaj",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy and confirmation if customer has taken claim or not",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Maybe",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajTop Up (PAYD plan)",
      "Insurer": "Bajaj",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and Unmasked Aadhar card and written or verbal confirmation for KM (min 2,000 km & max 6,000 km)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Bajaj",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajPost Issuance Cancellation",
      "Insurer": "Bajaj",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "cancellation is possible before policy start date without alternate policy, note that request to be raised before 24 hrs of policy start date",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Bajaj",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "",
      "Documents or any other requirement": "Customer Consent",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "BajajM-Parivahan",
      "Insurer": "Bajaj",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No Requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },{
      "InsurerRequirement": "CholaAddition of GST No.",
      "Insurer": "Chola",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaChassis Number",
      "Insurer": "Chola",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaCNG Addition Company fitted",
      "Insurer": "Chola",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaCNG Addition External",
      "Insurer": "Chola",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and CNG Invoice Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaColour Change",
      "Insurer": "Chola",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaCommunication Address",
      "Insurer": "Chola",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Written consent",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaCubic Capacity (CC)",
      "Insurer": "Chola",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaDate of Birth (DOB)",
      "Insurer": "Chola",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaEmail Address",
      "Insurer": "Chola",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "updated email id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaEngine Number",
      "Insurer": "Chola",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Chola",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaHypothecation Add",
      "Insurer": "Chola",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaHypothecation Change",
      "Insurer": "Chola",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Updated RC and Previous Bank NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaHypothecation Remove",
      "Insurer": "Chola",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Bank NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaIDV Change",
      "Insurer": "Chola",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaInsured name",
      "Insurer": "Chola",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC ,PYP and Umasked Aadhar Card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaMake, Model & Variant",
      "Insurer": "Chola",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaManufactured Date",
      "Insurer": "Chola",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaMobile Number",
      "Insurer": "Chola",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "updated mobile no.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaM-Parivahan",
      "Insurer": "Chola",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Chola",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaNCB Certificate",
      "Insurer": "Chola",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sell Letter with stamp / RC cancellation receipt or NCB Recovery (Charges)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaNCB Correction (taken extra NCB)",
      "Insurer": "Chola",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaNCB Correction (taken less NCB)",
      "Insurer": "Chola",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaNominee Details",
      "Insurer": "Chola",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details ( if PA cover is added)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaOwner Driver Personal Accident",
      "Insurer": "Chola",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaOwnership Transfer",
      "Insurer": "Chola",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Self Financial Endt",
      "Documents or any other requirement": "RC, New owner details and Umasked Aadhar Card ( need to raise to insurer in case of reg. no. change)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaPaid Driver",
      "Insurer": "Chola",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaPeriod of Insurance (POI)",
      "Insurer": "Chola",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Previous Year Policy (Backdated POI request - correction not Possible)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaPost Issuance Cancellation",
      "Insurer": "Chola",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Chola",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "",
      "Documents or any other requirement": "Customer consent & Alternate policy and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "",
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaPYP Details- POI or Insurer or Policy number",
      "Insurer": "Chola",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaRegistration Date",
      "Insurer": "Chola",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "Correction not possible in Bundle Policy",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaRegst. Number",
      "Insurer": "Chola",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaRTO Endorsement",
      "Insurer": "Chola",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaSalutation",
      "Insurer": "Chola",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaSeating Capacity",
      "Insurer": "Chola",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaTop Up (PAYD plan)",
      "Insurer": "Chola",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaTP details",
      "Insurer": "Chola",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "TP Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CholaUn Named Passanger Cover",
      "Insurer": "Chola",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajInsured name",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, DL & KYC (Masked Aadhaar / DL / Voter Card / Passport / PAN Card) as per base policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajCommunication Address",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajNominee Details",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee details (Name, DOB, Relation) & Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajDate of Birth (DOB)",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct DOB - Customer's consent / Written consent",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajSalutation",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajMobile Number",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajEmail Address",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajAddition of GST No.",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - BajajOwnership Transfer",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - BajajVehicle Details",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - BajajPost Issuance Cancellation",
      "Insurer": "CPA - Bajaj",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Reason for cancellation (like don’t have DL / don’t drive etc.),& Alternate policy (if customer has an alternate policy)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "Provides freelook period of 15 Days from the policy start date, deductions are done post free look up period",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaInsured name",
      "Insurer": "CPA - Chola",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC, DL & KYC (Masked Aadhaar / DL / Voter Card / Passport / PAN Card)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Only spelling mistake correction possible, complete name cannot be endorsed",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaCommunication Address",
      "Insurer": "CPA - Chola",
      "Requirement": "Communication Address",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Masked Aadhaar / DL / Voter Card / Passport",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaNominee Details",
      "Insurer": "CPA - Chola",
      "Requirement": "Nominee Details",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Nominee's KYC (Masked Aadhaar / DL / Voter Card / Passport / Pan) & Nominee details (Name, DOB, Relation)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaDate of Birth (DOB)",
      "Insurer": "CPA - Chola",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Nominee's KYC (Masked Aadhaar / DL / Voter Card / Passport / Pan) & Correct DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaSalutation",
      "Insurer": "CPA - Chola",
      "Requirement": "Salutation",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Masked Aadhaar / DL / Voter Card / Passport / Pan",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaMobile Number",
      "Insurer": "CPA - Chola",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaEmail Address",
      "Insurer": "CPA - Chola",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - CholaAddition of GST No.",
      "Insurer": "CPA - Chola",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - CholaOwnership Transfer",
      "Insurer": "CPA - Chola",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - CholaVehicle Details",
      "Insurer": "CPA - Chola",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - CholaPost Issuance Cancellation",
      "Insurer": "CPA - Chola",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitInsured name",
      "Insurer": "CPA - Digit",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, DL & Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Only spelling mistake correction possible, complete name cannot be endorsed",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitCommunication Address",
      "Insurer": "CPA - Digit",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitNominee Details",
      "Insurer": "CPA - Digit",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee Details (Name, DOB & Relation)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitDate of Birth (DOB)",
      "Insurer": "CPA - Digit",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitSalutation",
      "Insurer": "CPA - Digit",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitMobile Number",
      "Insurer": "CPA - Digit",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitEmail Address",
      "Insurer": "CPA - Digit",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email & Nominee’s DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - DigitAddition of GST No.",
      "Insurer": "CPA - Digit",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - DigitOwnership Transfer",
      "Insurer": "CPA - Digit",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - DigitVehicle Details",
      "Insurer": "CPA - Digit",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
  {
    "InsurerRequirement": "CPA - DigitPost Issuance Cancellation",
    "Insurer": "CPA - Digit",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "NA",
    "Documents or any other requirement": "Alternative Policy",
    "TAT": "10 days",
    "Charges / Deduction": "May be",
    "Inspection": "NA",
    "Any Exception": "NA",
    "Declaration format (if declaration required)": "NA"
  },{
      "InsurerRequirement": "CPA - KotakInsured name",
      "Insurer": "CPA - Kotak",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, DL, Aadhaar & PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakCommunication Address",
      "Insurer": "CPA - Kotak",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar, PAN & Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakNominee Details",
      "Insurer": "CPA - Kotak",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar & PAN of insured person & Nominee details (Name, DOB, Relation)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakDate of Birth (DOB)",
      "Insurer": "CPA - Kotak",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar & PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakSalutation",
      "Insurer": "CPA - Kotak",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar & PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakMobile Number",
      "Insurer": "CPA - Kotak",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar & PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakEmail Address",
      "Insurer": "CPA - Kotak",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar & PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - KotakAddition of GST No.",
      "Insurer": "CPA - Kotak",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - KotakOwnership Transfer",
      "Insurer": "CPA - Kotak",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - KotakVehicle Details",
      "Insurer": "CPA - Kotak",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - KotakPost Issuance Cancellation",
      "Insurer": "CPA - Kotak",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Within Freelook period: Reason for cancellation & Aadhaar and PAN\nPost Free look period: Alternate policy & Reason for cancellation & Aadhaar and PAN",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "Provides freelook period of 15 Days from the policy start date, deductions are done post free look up period",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyInsured name",
      "Insurer": "CPA - Liberty",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, DL, KYC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyCommunication Address",
      "Insurer": "CPA - Liberty",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof (KYC Doc) and Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyNominee Details",
      "Insurer": "CPA - Liberty",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details (Name, DOB & Relation and Nominee’s KYC docs.) & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyDate of Birth (DOB)",
      "Insurer": "CPA - Liberty",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - LibertySalutation",
      "Insurer": "CPA - Liberty",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email, KYC Docs  & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyMobile Number",
      "Insurer": "CPA - Liberty",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email, KYC Docs  & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyEmail Address",
      "Insurer": "CPA - Liberty",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Written Consent via App/Email, KYC Docs  & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - LibertyAddition of GST No.",
      "Insurer": "CPA - Liberty",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - LibertyOwnership Transfer",
      "Insurer": "CPA - Liberty",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - LibertyVehicle Details",
      "Insurer": "CPA - Liberty",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - LibertyPost Issuance Cancellation",
      "Insurer": "CPA - Liberty",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Endorsement form (will be provided by TL / ticketing team) & Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "Provides freelook period of 15 Days from the policy start date, deductions are done post free look up period",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceInsured name",
      "Insurer": "CPA - Reliance",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC, DL & KYC (Masked Aadhaar / DL / Voter Card / Passport / PAN Card) as per base policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceCommunication Address",
      "Insurer": "CPA - Reliance",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceNominee Details",
      "Insurer": "CPA - Reliance",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details (Name, DOB, Relation) & Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceDate of Birth (DOB)",
      "Insurer": "CPA - Reliance",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Nominee's KYC (Masked Aadhaar / DL / Voter Card / Passport / Pan) & Correct DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceSalutation",
      "Insurer": "CPA - Reliance",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceMobile Number",
      "Insurer": "CPA - Reliance",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceEmail Address",
      "Insurer": "CPA - Reliance",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "CPA - RelianceAddition of GST No.",
      "Insurer": "CPA - Reliance",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - RelianceOwnership Transfer",
      "Insurer": "CPA - Reliance",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - RelianceVehicle Details",
      "Insurer": "CPA - Reliance",
      "Requirement": "Vehicle Details",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Not Possible",
      "Declaration format (if declaration required)": "Not Possible"
    },
    {
      "InsurerRequirement": "CPA - ReliancePost Issuance Cancellation",
      "Insurer": "CPA - Reliance",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Consent via App/Email/Call - Remarks on BMS",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "Provides freelook period of 30 Days from the policy start date, deductions are done post free look up period",
      "Declaration format (if declaration required)": ""
    },{
      "InsurerRequirement": "DigitAddition of GST No.",
      "Insurer": "Digit",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible only within a month of policy start date",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitChassis Number",
      "Insurer": "Digit",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitColour Change",
      "Insurer": "Digit",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitEngine Number",
      "Insurer": "Digit",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitHypothecation Remove",
      "Insurer": "Digit",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitHypothecation Add",
      "Insurer": "Digit",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitHypothecation Change",
      "Insurer": "Digit",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitInsured name",
      "Insurer": "Digit",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitNCB Certificate",
      "Insurer": "Digit",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "InsurerRequirement": "DigitRegistration Date",
      "Insurer": "Digit",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitRegst. Number",
      "Insurer": "Digit",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitRTO Endorsement",
      "Insurer": "Digit",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitSeating Capacity",
      "Insurer": "Digit",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitPeriod of Insurance (POI)",
      "Insurer": "Digit",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible before policy start date",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitPYP Details- POI or Insurer or Policy number",
      "Insurer": "Digit",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitTP details",
      "Insurer": "Digit",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitCommunication Address",
      "Insurer": "Digit",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitDate of Birth (DOB)",
      "Insurer": "Digit",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitEmail Address",
      "Insurer": "Digit",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitMobile Number",
      "Insurer": "Digit",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitNominee Details",
      "Insurer": "Digit",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitSalutation",
      "Insurer": "Digit",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
  {
    "InsurerRequirement": "DigitOwner Driver Personal Accident",
    "Insurer": "Digit",
    "Requirement": "Owner Driver Personal Accident",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "Nominee Details & Customer Consent\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "no",
    "Any Exception": "Correction possible before policy start date",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
    "InsurerRequirement": "DigitPaid Driver",
    "Insurer": "Digit",
    "Requirement": "Paid Driver",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "RC Only\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "Correction possible before policy start date",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
      "InsurerRequirement": "DigitUn Named Passanger Cover",
      "Insurer": "Digit",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/- 2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible before policy start date",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitCNG Addition External",
      "Insurer": "Digit",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitCNG Addition Company fitted",
      "Insurer": "Digit",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitCubic Capacity (CC)",
      "Insurer": "Digit",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Digit",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitIDV Change",
      "Insurer": "Digit",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitManufactured Date",
      "Insurer": "Digit",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitMake, Model & Variant",
      "Insurer": "Digit",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitOwnership Transfer",
      "Insurer": "Digit",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitNCB Correction (taken extra NCB)",
      "Insurer": "Digit",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitNCB Correction (taken less NCB)",
      "Insurer": "Digit",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
    "InsurerRequirement": "DigitTop Up (PAYD plan)",
    "Insurer": "Digit",
    "Requirement": "Top Up (PAYD plan)",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "Customer consent for Top up Limit\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "0",
    "Declaration format (if declaration required)": "0\n"
  },
    {
      "InsurerRequirement": "DigitMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Digit",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitPost Issuance Cancellation",
      "Insurer": "Digit",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deductible",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Digit",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "",
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "",
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "DigitM-Parivahan",
      "Insurer": "Digit",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No Requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },{
      "InsurerRequirement": "Future GeneraliAddition of GST No.",
      "Insurer": "Future Generali",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliChassis Number",
      "Insurer": "Future Generali",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliColour Change",
      "Insurer": "Future Generali",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliEngine Number",
      "Insurer": "Future Generali",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliHypothecation Remove",
      "Insurer": "Future Generali",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliHypothecation Add",
      "Insurer": "Future Generali",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter,",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliHypothecation Change",
      "Insurer": "Future Generali",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliInsured name",
      "Insurer": "Future Generali",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP\nFor Ticketing associate: Raise endorsement with XML sheet ",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliNCB Certificate",
      "Insurer": "Future Generali",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter or new vehicle invoice, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "InsurerRequirement": "Future GeneraliRegistration Date",
      "Insurer": "Future Generali",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliRegst. Number",
      "Insurer": "Future Generali",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliRTO Endorsement",
      "Insurer": "Future Generali",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliSeating Capacity",
      "Insurer": "Future Generali",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliPeriod of Insurance (POI)",
      "Insurer": "Future Generali",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliPYP Details- POI or Insurer or Policy number",
      "Insurer": "Future Generali",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliTP details",
      "Insurer": "Future Generali",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP or PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliCommunication Address",
      "Insurer": "Future Generali",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliDate of Birth (DOB)",
      "Insurer": "Future Generali",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliEmail Address",
      "Insurer": "Future Generali",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliMobile Number",
      "Insurer": "Future Generali",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliNominee Details",
      "Insurer": "Future Generali",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliSalutation",
      "Insurer": "Future Generali",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliOwner Driver Personal Accident",
      "Insurer": "Future Generali",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL, Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliPaid Driver",
      "Insurer": "Future Generali",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliUn Named Passanger Cover",
      "Insurer": "Future Generali",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/-  2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliCNG Addition External",
      "Insurer": "Future Generali",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliCNG Addition Company fitted",
      "Insurer": "Future Generali",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliCubic Capacity (CC)",
      "Insurer": "Future Generali",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Future Generali",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliIDV Change",
      "Insurer": "Future Generali",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliManufactured Date",
      "Insurer": "Future Generali",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliMake, Model & Variant",
      "Insurer": "Future Generali",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliOwnership Transfer",
      "Insurer": "Future Generali",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, NOC & Proposal form (NOC & PF format availble on MyAccount)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliNCB Correction (taken extra NCB)",
      "Insurer": "Future Generali",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliNCB Correction (taken less NCB)",
      "Insurer": "Future Generali",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliTop Up (PAYD plan)",
      "Insurer": "Future Generali",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Future Generali",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
  {
    "InsurerRequirement": "Future GeneraliPost Issuance Cancellation",
    "Insurer": "Future Generali",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "0",
    "Documents or any other requirement": "\"Alternate Policy\n\nWritten declaration with signature on KYC Xerox paper (Either PAN or Driving Licence)\nDeclaration wordings - I want to cancel my policy wide <<policy no.>> and proceed the refund.\"\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "0",
    "Any Exception": "For Ticketing Associates: Raise cancellation to insurer & meanwhile XML Sheet to tech",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
      "InsurerRequirement": "Future GeneraliPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Future Generali",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "",
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "",
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.\n\nFor ticketing associate: Raise cancellation with XML Sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "Future GeneraliM-Parivahan",
      "Insurer": "Future Generali",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticketing associate: Raise endorsement with XML sheet",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCAddition of GST No.",
      "Insurer": "HDFC",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCChassis Number",
      "Insurer": "HDFC",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCColour Change",
      "Insurer": "HDFC",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCEngine Number",
      "Insurer": "HDFC",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCHypothecation Remove",
      "Insurer": "HDFC",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC and NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCHypothecation Add",
      "Insurer": "HDFC",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCHypothecation Change",
      "Insurer": "HDFC",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC and NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCInsured name",
      "Insurer": "HDFC",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, Pehchaan ID, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": "Pehchan ID link: https://pehchaan.hdfcergo.com/"
    },
    {
      "InsurerRequirement": "HDFCNCB Certificate",
      "Insurer": "HDFC",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCRegistration Date",
      "Insurer": "HDFC",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCRegst. Number",
      "Insurer": "HDFC",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCRTO Endorsement",
      "Insurer": "HDFC",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCSeating Capacity",
      "Insurer": "HDFC",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCPeriod of Insurance (POI)",
      "Insurer": "HDFC",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCPYP Details- POI or Insurer or Policy number",
      "Insurer": "HDFC",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCTP details",
      "Insurer": "HDFC",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "TP Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCCommunication Address",
      "Insurer": "HDFC",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCDate of Birth (DOB)",
      "Insurer": "HDFC",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "DOB proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCEmail Address",
      "Insurer": "HDFC",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "New Mail ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCMobile Number",
      "Insurer": "HDFC",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "New Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCNominee Details",
      "Insurer": "HDFC",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCSalutation",
      "Insurer": "HDFC",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Customer Request",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCOwner Driver Personal Accident",
      "Insurer": "HDFC",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL and Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCPaid Driver",
      "Insurer": "HDFC",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "DL, 3 months Salary slip of driver.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCUn Named Passanger Cover",
      "Insurer": "HDFC",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy along with confirmation of 1Lac/2Lacs per seat coverage addition.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCCNG Addition External",
      "Insurer": "HDFC",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCCNG Addition Company fitted",
      "Insurer": "HDFC",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCCubic Capacity (CC)",
      "Insurer": "HDFC",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDCFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "HDFC",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCIDV Change",
      "Insurer": "HDFC",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCManufactured Date",
      "Insurer": "HDFC",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCMake, Model & Variant",
      "Insurer": "HDFC",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCOwnership Transfer",
      "Insurer": "HDFC",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PA Declaration form in pdf (available with ticketing team),pehchaan id, New owner details.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": "Pehchan ID link: https://pehchaan.hdfcergo.com/"
    },
    {
      "InsurerRequirement": "HDFCNCB Correction (taken extra NCB)",
      "Insurer": "HDFC",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCNCB Correction (taken less NCB)",
      "Insurer": "HDFC",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy,",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCTop Up (PAYD plan)",
      "Insurer": "HDFC",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "HDFC",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP AND KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCPost Issuance Cancellation",
      "Insurer": "HDFC",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "",
      "Documents or any other requirement": "Alternate and KYC Documents along with NEFT details (NEFT required in only in 2W policies)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "HDFC",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "",
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "",
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": ""
    },
    {
      "InsurerRequirement": "HDFCM-Parivahan",
      "Insurer": "HDFC",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No Requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "",
      "Inspection": "",
      "Any Exception": "",
      "Declaration format (if declaration required)": ""
    },{
      "Insurer": "ICICI",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated Rc or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated Rc or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,PYP, Aadhaar Card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Address with Pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "DOB proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Email Id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Customer Written Consent (By Mail or My Account)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL and Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible only before policy start date (Post policy start date will suggest customer to take separate PA through ICICI website)\nCustomer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "DL, 3 months Salary slip of driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible only before policy start date\nCustomer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy and Written consent from Customer along with confirmation of 1Lac/2Lacs per seat coverage addition.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible only before policy start date\nCustomer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice/PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Aadhaar Card and Pan Card (New owner), New owner details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "ICICI",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Customer Written Consent (By Mail or My Account)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
  {
    "InsurerRequirement": "ICICIMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
    "Insurer": "ICICI",
    "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
    "Endorsement type": "Non Financial Endt",
    "Documents or any other requirement": "Reg. date and MMV needs to be correct, then only correction is possible - RC required & Customer Consent\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "no",
    "Inspection": "No",
    "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
    "Declaration format (if declaration required)": "0\n"
  },
    {
      "Insurer": "ICICI",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
      "Declaration format (if declaration required)": null
    },
    {
    "InsurerRequirement": "ICICIPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch)",
    "Insurer": "ICICI",
    "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch)",
    "Endorsement type": "0",
    "Documents or any other requirement": "If Reg. date and MMV need to be correct, then only correction is possible - Alternate policy, RC required & Customer Consent\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Deduction",
    "Inspection": "0",
    "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
    "Declaration format (if declaration required)": "0"
  }
  ,
    {
      "Insurer": "ICICI",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC and written consent Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "correction can be done Post start date of the policy \nProceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP or PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Address Proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Insured DL & Nominee Name, Age & Relationship",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/-  2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, NOC from previous owner (in a format, format is with the ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "correction possible Post start date of the policy\nFor ticketing associate: Raise request to insurer with NOC in the said format",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Iffco tokio",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "NOC or Updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC and Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP and KYC of RC owner",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar (If CKYC not done) \nProceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter or Updated RC , PYP and NCB confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Regst. Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Third party Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy, Nominee detail. DL",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Endt possible before policy start date \n PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL of driver, Salary slip or bank statement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Endt possible before policy start date \n PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & confirmation from cx if he wants to opt Rs 50/seat or Rs 100/seat",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Endt possible before policy start date \n PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & CNG Kit invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy ,PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC, New owner detail",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Kotak",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": "PAN and Masked Adhar card is required ( If CKYC not done)",
      "Declaration format (if declaration required)": null
    },{
      "Insurer": "Liberty",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,Bank NOC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction letter & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,Previous Bank NOC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC , Masked Aadhar Card , pan card ,Previous Year Policy & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Will be considered as o/t incase of complete name mismatch\nFor Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sell letter , Previous Year Policy , NCB Confirmation and cancellation declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "Maybe",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,previous Year Policy & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Backdated correction not possible \nFor Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,previous Year Policy & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC ,previous Year Policy ,bundle Policy  & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Email Address",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , CNG Invoice & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticket associate: \nEndorsement form to be filled and raised to insurer \nInspection to be raised from Insurer portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC ,Masked Aadhar card and Pan Card , NOC and Transfer Form (will be provided by TL / Ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticket associate: \nEndorsement form to be filled and raised to insurer \nInspection to be raised from Insurer portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy and written consent",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For Ticket associate: Inspection to be raised from Insurer portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy  and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "For Ticket associate: Inspection to be raised from Insurer portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy and Endorsement form (will be provided by TL / ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "For Ticket associate: Endorsement form to be filled and raised to insurer",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Not Possible",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Liberty",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    }, {
      "Insurer": "Magma",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP,KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL, Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/-  2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, Proposal form (PF format availble on MyAccount)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
    "InsurerRequirement": "MagmaPost Issuance Cancellation",
    "Insurer": "Magma",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "0",
    "Documents or any other requirement": "\"Alternate Policy, KYC & NEFT details of the Insured\nAccount holder name - \nBank Name - \nAccount Number - \nIFSC Code - \"\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "0",
    "Any Exception": "0",
    "Declaration format (if declaration required)": "0\n"
  },
    {
      "Insurer": "Magma",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Magma",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Bank NOC and Updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC  or Loan Sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC and  Previous Bank NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Insured name",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , Previous year policy, Unmasked Aadhar or pan + (Rs 60/- Charges applicable in package policy)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "\nProceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Updated RC, Sell letter or RTO Receipt, PYP , NCB confirmation and cancellation declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": "Updated RC will not be required after policy expiry (possible on the basis of NCB confirmation letter)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Registration Date",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Regst. Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Previous Year Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "TP details",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Bundle Policy Required(POI not possible)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Updated Email Id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Updated mobile no.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , New owner details and Unmasked Aadhar or pan of new insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year policy and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year policy and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Alternate Policy , Written Consent and NEFT of insured as per policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent and Cancelled cheque  as per policy (For OD Refund  only)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "National",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },{
      "Insurer": "Oriental",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Chassis Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Engine Number",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "NOC Or Updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC and Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP and KYC of RC owner, Customer Declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": "Kindly ask the customer to share below declaration on mail: \n\"I certify that I have applied for the Correction in Insured name in policy no. __________________. This is not the case of Ownership transfer and there is no known or reported loss till date. I certify that the above facts are true to the best of my knowledge and if found false, I am liable for it and Insurer has the right to cancel the policy without any refund.\""
    },
  {
    "InsurerRequirement": "OrientalNCB Certificate",
    "Insurer": "Oriental",
    "Requirement": "NCB Certificate",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "\"Form 29/30\nor\nUpdated RC with transferred date\"\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "Charges would not be required incase policy has expired",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
      "Insurer": "Oriental",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Charges may be applicable incase of state / RTO code change",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "TP details",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Third party Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG invoice or PYP with CNG value",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy and PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC charges may be applicable",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC, New owner detail, Customer Declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": "Kindly ask the customer to share below declaration on mail: \n\"I certify that I have applied for the transfer of ownership in policy no. __________________ and there is no known or reported loss till date. I certify that the above facts are true to the best of my knowledge and if found false, I am liable for it and Insurer has the right to cancel the policy without any refund.\""
    },
    {
      "Insurer": "Oriental",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP and NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
    "InsurerRequirement": "OrientalPost Issuance Cancellation",
    "Insurer": "Oriental",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "na",
    "Documents or any other requirement": "Alternate Policy, Reason and Declaration",
    "TAT": "10 days",
    "Charges / Deduction": "yes",
    "Inspection": "no",
    "Any Exception": "To be raised on Mail",
    "Declaration format (if declaration required)": "Complete reason for cancellation from customer's registered email ID along with requested date and time, Declaration :- There is no claim running in the policy"
  },
    {
      "Insurer": "Oriental",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Oriental",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN Card mandate in KYC",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "NOC or Updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "PAN Card mandate in KYC + Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Regst. Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP & Customer declaration required on mail (I don't have any issue to cancel & rebook the insurance)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Email Id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/-  2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, \nDeclaration from old owner (Written confirmation on mail from Old owner with date & SIgnature - that he has no objection in transferring the policy to the new owner)\n& CPA declaration form (available with ticketing team)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "PAN Card mandate in KYC",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Raheja",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured, RC &  Pan Card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction not possible in Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Colour Change",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
    "InsurerRequirement": "RelianceHypothecation Remove",
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Remove",
    "Endorsement type": "Non Financial Endt",
    "Documents or any other requirement": "\"Customer Request Letter\nEndorsed RC Copy / NOC from Financier\"\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "no",
    "Inspection": "No",
    "Any Exception": "0",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
    "InsurerRequirement": "RelianceHypothecation Add",
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Add",
    "Endorsement type": "Nil Endt",
    "Documents or any other requirement": "Customer Request Letter and RC Copy\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "no",
    "Inspection": "No",
    "Any Exception": "0",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
  {
    "InsurerRequirement": "RelianceHypothecation Change",
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Change",
    "Endorsement type": "self endts",
    "Documents or any other requirement": "\"Customer Request Letter\n  Endorsed RC Copy / Financier letter / Sanction Letter from Financial Institute\"\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "no",
    "Inspection": "no",
    "Any Exception": "0",
    "Declaration format (if declaration required)": "0"
  },
    {
      "Insurer": "Reliance",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,KYC , PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter and cancellation declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": "Please confirm from the below scenario from the customer and share information:\n1. In case customer want to cancel policy then alternate policy or sell proof will be required and ncb will be recovered, also refund amount will be declared as per U/W \n2. If customer don't want to cancel only ncb will be recovered and cx can process ownership transfer also "
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,KYC , PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": "Correction not possible in Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,KYC , PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC,KYC , PYP and Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof of insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Nil Endt incase of Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "NA",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated email id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Nil Endt incase of Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated mobile no.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Nil Endt incase of Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee ID proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Nil Endt incase of Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Insured ID Proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Nil Endt incase of Xpas plan",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "May Be",
      "Inspection": "Maybe",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC , NOC ,New owner details and Pa Cover declaration",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Inspection to be raised from Reliance portal (from insurer end)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP and NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Cx request from my account (Kms to top up)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": "NA",
      "Documents or any other requirement": "Alternate Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Reliance",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },{
      "Insurer": "Royal Sundaram",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL, Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible Before policy Start Date",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible Before policy Start Date",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/-  2L",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Addition possible Before policy Start Date",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, Proposal form (sample available on MyAccount)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy & Customer declaration (with customer signature)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": "Declaration on paper: I want to cancel my policy no __________ due to ___________ reason. (Along with customer's signature)"
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent, Alternate policy, Cancelled cheque",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Royal Sundaram",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC with Owner serial no 1 and PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase of O.sno above 1 or pyp unavailibility - case to be considered as O/t",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card, Sale Letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card along with Previous year policy copy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card along with Previous year policy copy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card along with Bundled policy copy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Address with Pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Email Id",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct Salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card, RC, CNG Invoice or Pyp",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card, RC and PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card and RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PA Declaration (written confirmation if customer wants to add or not), Aadhaar Card and Pan Card (New owner), New owner details and Proposal Form (Available on MyAccount)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Aadhaar and Pan Card, Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Aadhaar and Pan Card and Alternate policy",
      "TAT": null,
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "can only be canceled if the period of insurance (POI) of the alternate policy is exactly the same as the current policy",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "SBI",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC, Unmasked Aadhar and Pan card Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible only on the same month of booking (For eg: Booking date is 27th Jan, correction only possible till 31st Jan)",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "NOC and updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP and KYC(Aadhaar & Pan)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter and Updated RC or form 29 and 30 with rto stamp , PYP and NCB confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associate: Need to raise on mail",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Registration Date",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Third party Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy, Nominee detail. DL",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL of driver, Salary slip or bank statement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC & confirmation from cx if he wants to opt Rs 50/seat or Rs 100/seat",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC copy, CNG Kit invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC, New owner detail, RC transfer Date, New Owner's father name",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "KYC - Pan and Aadhar card mandatory",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Confirmation from the customer if he/she is okay with Plan update to normal",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Top up not possible, plan can be changed from PAYD to regular",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy along with customer consent",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "Insurer": "Shriram",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },{
      "InsurerRequirement": "UnitedAddition of GST No.",
      "Insurer": "United",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedChassis Number",
      "Insurer": "United",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedColour Change",
      "Insurer": "United",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedEngine Number",
      "Insurer": "United",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedHypothecation Remove",
      "Insurer": "United",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC and Loan letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedHypothecation Add",
      "Insurer": "United",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC and Loan letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedHypothecation Change",
      "Insurer": "United",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC and Loan letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedInsured name",
      "Insurer": "United",
      "Requirement": "Insured name",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "RC and PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedNCB Certificate",
      "Insurer": "United",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedRegistration Date",
      "Insurer": "United",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedRegst. Number",
      "Insurer": "United",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedRTO Endorsement",
      "Insurer": "United",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedSeating Capacity",
      "Insurer": "United",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedPeriod of Insurance (POI)",
      "Insurer": "United",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "In TP, correction is only possible if previous year policy is also TP from United",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedPYP Details- POI or Insurer or Policy number",
      "Insurer": "United",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedTP details",
      "Insurer": "United",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "TP Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedCommunication Address",
      "Insurer": "United",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "New Address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedDate of Birth (DOB)",
      "Insurer": "United",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "DOB proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedEmail Address",
      "Insurer": "United",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "New Mail ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedMobile Number",
      "Insurer": "United",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "New Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedNominee Details",
      "Insurer": "United",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedSalutation",
      "Insurer": "United",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Salutation details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedOwner Driver Personal Accident",
      "Insurer": "United",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedPaid Driver",
      "Insurer": "United",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedUn Named Passanger Cover",
      "Insurer": "United",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedCNG Addition External",
      "Insurer": "United",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedCNG Addition Company fitted",
      "Insurer": "United",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedCubic Capacity (CC)",
      "Insurer": "United",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "United",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedIDV Change",
      "Insurer": "United",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedManufactured Date",
      "Insurer": "United",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedMake, Model & Variant",
      "Insurer": "United",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedOwnership Transfer",
      "Insurer": "United",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC and New owner details.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedNCB Correction (taken extra NCB)",
      "Insurer": "United",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedNCB Correction (taken less NCB)",
      "Insurer": "United",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "Correction possible after policy start date",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedTop Up (PAYD plan)",
      "Insurer": "United",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "United",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedPost Issuance Cancellation",
      "Insurer": "United",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate and Written Declaration from Customer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": "No",
      "Any Exception": "TP policy Cancellation : Alternate should be Comprehensive policy from United\nComprehensive policy Cancellation: Alteranate should have exact same POI (else later issued policy will be cancelled)\nSAOD policy cancellation: Alteranate could be bundle policy or alteranate SAOD policy from any insurer ",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "United",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "UnitedM-Parivahan",
      "Insurer": "United",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },{
      "InsurerRequirement": "TATA AIGAddition of GST No.",
      "Insurer": "TATA AIG",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGChassis Number",
      "Insurer": "TATA AIG",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGColour Change",
      "Insurer": "TATA AIG",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGEngine Number",
      "Insurer": "TATA AIG",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGHypothecation Remove",
      "Insurer": "TATA AIG",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGHypothecation Add",
      "Insurer": "TATA AIG",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGHypothecation Change",
      "Insurer": "TATA AIG",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGInsured name",
      "Insurer": "TATA AIG",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, Aadhaar & Pan card, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGNCB Certificate",
      "Insurer": "TATA AIG",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter, PYP, NCB Confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGRegistration Date",
      "Insurer": "TATA AIG",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGRegst. Number",
      "Insurer": "TATA AIG",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGRTO Endorsement",
      "Insurer": "TATA AIG",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGSeating Capacity",
      "Insurer": "TATA AIG",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGPeriod of Insurance (POI)",
      "Insurer": "TATA AIG",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGPYP Details- POI or Insurer or Policy number",
      "Insurer": "TATA AIG",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGTP details",
      "Insurer": "TATA AIG",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "TP Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGCommunication Address",
      "Insurer": "TATA AIG",
      "Requirement": "Communication Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Address Proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGDate of Birth (DOB)",
      "Insurer": "TATA AIG",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "DOB proof",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGEmail Address",
      "Insurer": "TATA AIG",
      "Requirement": "Email Address",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "New Mail ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGMobile Number",
      "Insurer": "TATA AIG",
      "Requirement": "Mobile Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "New Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGNominee Details",
      "Insurer": "TATA AIG",
      "Requirement": "Nominee Details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGSalutation",
      "Insurer": "TATA AIG",
      "Requirement": "Salutation",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Correct Salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGOwner Driver Personal Accident",
      "Insurer": "TATA AIG",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL and Nominee details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGPaid Driver",
      "Insurer": "TATA AIG",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "DL, 3 months Salary slip of driver.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGUn Named Passanger Cover",
      "Insurer": "TATA AIG",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy along with confirmation of 1Lac/2Lacs per seat coverage addition.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGCNG Addition External",
      "Insurer": "TATA AIG",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice/PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGCNG Addition Company fitted",
      "Insurer": "TATA AIG",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGCubic Capacity (CC)",
      "Insurer": "TATA AIG",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "TATA AIG",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGIDV Change",
      "Insurer": "TATA AIG",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGManufactured Date",
      "Insurer": "TATA AIG",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGMake, Model & Variant",
      "Insurer": "TATA AIG",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGOwnership Transfer",
      "Insurer": "TATA AIG",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Aadhaar Card and Pan Card (New owner), New owner details.",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGNCB Correction (taken extra NCB)",
      "Insurer": "TATA AIG",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGNCB Correction (taken less NCB)",
      "Insurer": "TATA AIG",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Previous Year Policy, NCB Confirmation letter from pyp insurer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGTop Up (PAYD plan)",
      "Insurer": "TATA AIG",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "TATA AIG",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGPost Issuance Cancellation",
      "Insurer": "TATA AIG",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate policy and Written consent from Customer",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "TATA AIG",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "TATA AIGM-Parivahan",
      "Insurer": "TATA AIG",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "No requirement",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoAddition of GST No.",
      "Insurer": "Universal Sompo",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoChassis Number",
      "Insurer": "Universal Sompo",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoColour Change",
      "Insurer": "Universal Sompo",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoEngine Number",
      "Insurer": "Universal Sompo",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoHypothecation Remove",
      "Insurer": "Universal Sompo",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "NOC or Updated RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoHypothecation Add",
      "Insurer": "Universal Sompo",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC or Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoHypothecation Change",
      "Insurer": "Universal Sompo",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Self Endt",
      "Documents or any other requirement": "Updated RC and Loan Sanction Letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoInsured name",
      "Insurer": "Universal Sompo",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP and KYC of RC owner",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For KYC: CKYC number or PAN and Adhar will required \nProceed with O/t incase cx doesn't have PYP",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoNCB Certificate",
      "Insurer": "Universal Sompo",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale Letter or Updated RC , PYP and NCB confirmation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoRegistration Date",
      "Insurer": "Universal Sompo",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoRegst. Number",
      "Insurer": "Universal Sompo",
      "Requirement": "Regst. Number",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoRTO Endorsement",
      "Insurer": "Universal Sompo",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoSeating Capacity",
      "Insurer": "Universal Sompo",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoPeriod of Insurance (POI)",
      "Insurer": "Universal Sompo",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoPYP Details- POI or Insurer or Policy number",
      "Insurer": "Universal Sompo",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoTP details",
      "Insurer": "Universal Sompo",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Third party Bundle Policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoCommunication Address",
      "Insurer": "Universal Sompo",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoDate of Birth (DOB)",
      "Insurer": "Universal Sompo",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete DOB",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoEmail Address",
      "Insurer": "Universal Sompo",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoMobile Number",
      "Insurer": "Universal Sompo",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoNominee Details",
      "Insurer": "Universal Sompo",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoSalutation",
      "Insurer": "Universal Sompo",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoOwner Driver Personal Accident",
      "Insurer": "Universal Sompo",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoPaid Driver",
      "Insurer": "Universal Sompo",
      "Requirement": "Paid Driver",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoUn Named Passanger Cover",
      "Insurer": "Universal Sompo",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoCNG Addition External",
      "Insurer": "Universal Sompo",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Kit invoice",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoCNG Addition Company fitted",
      "Insurer": "Universal Sompo",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC Copy, PYP",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoCubic Capacity (CC)",
      "Insurer": "Universal Sompo",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Universal Sompo",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoIDV Change",
      "Insurer": "Universal Sompo",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoManufactured Date",
      "Insurer": "Universal Sompo",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoMake, Model & Variant",
      "Insurer": "Universal Sompo",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoOwnership Transfer",
      "Insurer": "Universal Sompo",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC, New owner detail",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For KYC: CKYC number or PAN and Adhar will required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoNCB Correction (taken extra NCB)",
      "Insurer": "Universal Sompo",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoNCB Correction (taken less NCB)",
      "Insurer": "Universal Sompo",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP & NCB confirmation letter",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Maybe",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoTop Up (PAYD plan)",
      "Insurer": "Universal Sompo",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Kilometers to be top up",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "Odometer only inspection required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Universal Sompo",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Not Possible",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoPost Issuance Cancellation",
      "Insurer": "Universal Sompo",
      "Requirement": "Post Issuance Cancellation",
      "Endorsement type": null,
      "Documents or any other requirement": "Alternate Policy (should be updated on vahan)",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Universal Sompo",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "Universal SompoM-Parivahan",
      "Insurer": "Universal Sompo",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC Required",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": null,
      "Inspection": null,
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoAddition of GST No.",
      "Insurer": "Zuno",
      "Requirement": "Addition of GST No.",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "GST Certificate in the name of Insured, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoChassis Number",
      "Insurer": "Zuno",
      "Requirement": "Chassis Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoColour Change",
      "Insurer": "Zuno",
      "Requirement": "Colour Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoEngine Number",
      "Insurer": "Zuno",
      "Requirement": "Engine Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoHypothecation Remove",
      "Insurer": "Zuno",
      "Requirement": "Hypothecation Remove",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "NOC or Updated RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoHypothecation Add",
      "Insurer": "Zuno",
      "Requirement": "Hypothecation Add",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or Loan sanction letter, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoHypothecation Change",
      "Insurer": "Zuno",
      "Requirement": "Hypothecation Change",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Updated RC or NOC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoInsured name",
      "Insurer": "Zuno",
      "Requirement": "Insured name",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Proceed with O/t incase cx doesn't have PYP\nFor ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoNCB Certificate",
      "Insurer": "Zuno",
      "Requirement": "NCB Certificate",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "Sale letter, PYP, NCB Confirmation letter, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": "Kindly request the customer to provide in written on mail or from MyAccount:\nKindly confirm whether customer wants to cancel the Own damage part of the policy or want to recover the ncb."
    },
    {
      "InsurerRequirement": "ZunoRegistration Date",
      "Insurer": "Zuno",
      "Requirement": "Registration Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoRegst. Number",
      "Insurer": "Zuno",
      "Requirement": "Regst. Number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoRTO Endorsement",
      "Insurer": "Zuno",
      "Requirement": "RTO Endorsement",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoSeating Capacity",
      "Insurer": "Zuno",
      "Requirement": "Seating Capacity",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoPeriod of Insurance (POI)",
      "Insurer": "Zuno",
      "Requirement": "Period of Insurance (POI)",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoPYP Details- POI or Insurer or Policy number",
      "Insurer": "Zuno",
      "Requirement": "PYP Details- POI or Insurer or Policy number",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "PYP, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoTP details",
      "Insurer": "Zuno",
      "Requirement": "TP details",
      "Endorsement type": "Non Financial Endt",
      "Documents or any other requirement": "Bundled TP, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoCommunication Address",
      "Insurer": "Zuno",
      "Requirement": "Communication Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete address with pincode",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase raising to insurer then KYC - Pan Card and Unmasked Aadhar card is required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoDate of Birth (DOB)",
      "Insurer": "Zuno",
      "Requirement": "Date of Birth (DOB)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoEmail Address",
      "Insurer": "Zuno",
      "Requirement": "Email Address",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Complete Email ID",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase raising to insurer then KYC - Pan Card and Unmasked Aadhar card is required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoMobile Number",
      "Insurer": "Zuno",
      "Requirement": "Mobile Number",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Mobile Number",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase raising to insurer then KYC - Pan Card and Unmasked Aadhar card is required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoNominee Details",
      "Insurer": "Zuno",
      "Requirement": "Nominee Details",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Nominee Details",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase raising to insurer then KYC - Pan Card and Unmasked Aadhar card is required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoSalutation",
      "Insurer": "Zuno",
      "Requirement": "Salutation",
      "Endorsement type": "Nil Endt",
      "Documents or any other requirement": "Correct salutation",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "Incase raising to insurer then KYC - Pan Card and Unmasked Aadhar card is required",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoOwner Driver Personal Accident",
      "Insurer": "Zuno",
      "Requirement": "Owner Driver Personal Accident",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, DL, Nominee Details, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible Before Policy Start Date,\nFor Ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoPaid Driver",
      "Insurer": "Zuno",
      "Requirement": "Paid Driver",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible Before Policy Start Date,\nFor Ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoUn Named Passanger Cover",
      "Insurer": "Zuno",
      "Requirement": "Un Named Passanger Cover",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, written confirmation of coverage for Rs.50 - 1L and Rs.100/- \u00a02L, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "No",
      "Any Exception": "Correction possible Before Policy Start Date,\nFor Ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoCNG Addition External",
      "Insurer": "Zuno",
      "Requirement": "CNG Addition External",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, CNG Invoice, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoCNG Addition Company fitted",
      "Insurer": "Zuno",
      "Requirement": "CNG Addition Company fitted",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, PYP, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoCubic Capacity (CC)",
      "Insurer": "Zuno",
      "Requirement": "Cubic Capacity (CC)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoFuel Type (Petrol - Diesel, Diesel - petrol)",
      "Insurer": "Zuno",
      "Requirement": "Fuel Type (Petrol - Diesel, Diesel - petrol)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoIDV Change",
      "Insurer": "Zuno",
      "Requirement": "IDV Change",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoManufactured Date",
      "Insurer": "Zuno",
      "Requirement": "Manufactured Date",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoMake, Model & Variant",
      "Insurer": "Zuno",
      "Requirement": "Make, Model & Variant",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Maybe",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoOwnership Transfer",
      "Insurer": "Zuno",
      "Requirement": "Ownership Transfer",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "RC, New owner details, KYC, Proposal form (available on MyAccount), KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoNCB Correction (taken extra NCB)",
      "Insurer": "Zuno",
      "Requirement": "NCB Correction (taken extra NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Yes",
      "Inspection": "Yes",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoNCB Correction (taken less NCB)",
      "Insurer": "Zuno",
      "Requirement": "NCB Correction (taken less NCB)",
      "Endorsement type": "Financial Endt",
      "Documents or any other requirement": "PYP, NCB Confirmation, KYC - Pan Card and Unmasked Aadhar card",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Refund",
      "Inspection": "Yes",
      "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoTop Up (PAYD plan)",
      "Insurer": "Zuno",
      "Requirement": "Top Up (PAYD plan)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoMultiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Insurer": "Zuno",
      "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
      "Endorsement type": "Not Possible",
      "Documents or any other requirement": "Not Possible",
      "TAT": "Not Possible",
      "Charges / Deduction": "Not Possible",
      "Inspection": "Not Possible",
      "Any Exception": null,
      "Declaration format (if declaration required)": null
    },
    {
    "InsurerRequirement": "ZunoPost Issuance Cancellation",
    "Insurer": "Zuno",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": "0",
    "Documents or any other requirement": "Alternate Policy, KYC - Pan Card and Unmasked Aadhar card\n",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "0",
    "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
    "Declaration format (if declaration required)": "0\n"
  }
  ,
    {
      "InsurerRequirement": "ZunoPost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Insurer": "Zuno",
      "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
      "Endorsement type": null,
      "Documents or any other requirement": "Customer consent & Alternate policy",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "Deduction",
      "Inspection": null,
      "Any Exception": "Only third Party policy cannot be cancelled\n\nFor comprehensive: TP (Third Party) amount will be retained, and the OD (Own Damage) part will be refunded based on the usage of the policy.",
      "Declaration format (if declaration required)": null
    },
    {
      "InsurerRequirement": "ZunoM-Parivahan",
      "Insurer": "Zuno",
      "Requirement": "M-Parivahan",
      "Endorsement type": "NA",
      "Documents or any other requirement": "RC",
      "TAT": "SRS / 10 Days",
      "Charges / Deduction": "No",
      "Inspection": "No",
      "Any Exception": "For ticketing associates: Feedfile required while raising the case if Policy number starts with 52 series",
      "Declaration format (if declaration required)": null
    }
  ];  // Populate insurer dropdown for Endorsement
      try {
        const insurers = [...new Set(endorsementData.map(d => d["Insurer"]))].sort();
        insurers.forEach(ins => {
          const opt = document.createElement("option");
          opt.value = opt.textContent = ins;
          insurerDropdown.appendChild(opt);
        });
      } catch (error) {
        console.error("Error populating insurers for endorsement:", error);
        showMessage("Error in endorsement JSON data. Please check the syntax and paste valid JSON.", "error");
      }

      // Handle insurer selection for endorsement
      insurerDropdown.addEventListener("change", () => {
        requirementDropdown.innerHTML = "<option disabled selected>Select Requirement</option>";
        outputBox.style.display = "none";
        outputBox.classList.remove("show", "output-red");
        const selectedInsurer = insurerDropdown.value;
        const requirements = [...new Set(
          endorsementData.filter(d => d["Insurer"] === selectedInsurer)
              .map(d => d["Requirement"])
        )].sort();
        requirements.forEach(req => {
          const opt = document.createElement("option");
          opt.value = opt.textContent = req;
          requirementDropdown.appendChild(opt);
        });
        requirementDropdown.disabled = false;
      });

      // Handle requirement selection for endorsement
      requirementDropdown.addEventListener("change", () => {
        const ins = insurerDropdown.value;
        const req = requirementDropdown.value;
        const record = endorsementData.find(
          d => d["Insurer"] === ins && d["Requirement"] === req
        );
        if (record) {
          outputBox.innerHTML = `
            <div><span class="label">Endorsement Type:</span><span class="value">${record["Endorsement type"]}</span></div>
            <div><span class="label">Documents Required:</span><span class="value">${record["Documents or any other requirement"]}</span></div>
            <div><span class="label">TAT:</span><span class="value">${record["TAT"]}</span></div>
            <div><span class="label">Charges/Deduction:</span><span class="value">${record["Charges / Deduction"]}</span></div>
            <div><span class="label">Inspection:</span><span class="value">${record["Inspection"]}</span></div>
            <div><span class="label">Exception:</span><span class="value">${record["Any Exception"]}</span></div>
            <div><span class="label">Declaration Format:</span><span class="value">${record["Declaration format (if declaration required)"]}</span></div>
          `;
          if (record["Endorsement type"].toLowerCase() === "not possible") {
            outputBox.classList.add("output-red");
          } else {
            outputBox.classList.remove("output-red");
          }
          outputBox.style.display = "block";
          setTimeout(() => outputBox.classList.add("show"), 10);
        }
      });

      // Insurance Comparison Dashboard Data and Logic (from index (4).html)
      // IMPORTANT: User requested to remove this data and will add it later.
      const insuranceData = [{
              "insurer_name": "National",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "24 Hours",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "New India Assurance",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "24 Hours",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2<br>(Unlimited-3+3)",
              "non_zd_claims_year": "Unlimited<br>(Unlimited-3+3)",
              "brand_new_3_3": "Yes",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Oriental",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "24 Hours",
              "short_partial": "No",
              "artificial_low_lighting": "Yes",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "United India",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "48 Hours",
              "short_partial": "Yes",
              "artificial_low_lighting": "Yes",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
    "insurer_name": "Tata AIG",
    "commercial": "Yes",
    "video_approval": "At PB end",
    "video_tat": "2 days",
    "short_partial": "Yes",
    "artificial_low_lighting": "No",
    "scar_declaration": "Declaration Required (with vehicle number) within Video TAT",
    "zd_claims_year": "ZD-2<br>3+3 Plan (5 overall, max 2 in a year)<br>4+4 Plan (7 overall, max 2 in a year)<br>5+5 Plan (9 overall, max 2 in a year)",
    "non_zd_claims_year": "compre.-99<br>3+3 Plan -99<br>4+4 Plan -99<br>5+5 Plan -99",
    "brand_new_3_3": "Yes",
    "old_3_3": "Yes"
  },
        {
      "insurer_name": "ICICI Lombard",
      "commercial": "Yes",
      "video_approval": "At PB end",
      "video_tat": "2 days",
      "short_partial": "Yes",
      "artificial_low_lighting": "Yes",
      "scar_declaration": "Declaration Required within Video TAT",
      "zd_claims_year": "Maruti, Hyundai, Honda, Toyota, Kia, MG, Volvo, Ford: Unlimited but Other makers: 2 <br> (ICICI 3+3-6)",
      "non_zd_claims_year": "Unlimited <br> (ICICI 3+3-Unlimited)",
      "brand_new_3_3": "Yes",
      "old_3_3": "Yes"
  }
  ,
          {
              "insurer_name": "Zuno General",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Cholamandalam MS",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Not Accept Scar on WS/change insurer",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Future Generali",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "MAGMA",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required (Scar on Driver Side not accepted) within Video TAT",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Raheja QBE",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Kotak",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited (Cashless limited to 2)",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "SBI General",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Shriram",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required (Shriram format) + Address ID proof within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "3",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Iffco Tokio",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Liberty Videocon",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "No",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Not Accept Scar on WS/change insurer",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "HDFC Ergo",
              "commercial": "No",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Not Accept Scar on WS/change insurer",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Reliance",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required (with vehicle number) within Video TAT",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Bajaj Allianz",
              "commercial": "Yes",
              "video_approval": "At U/W end",
              "video_tat": "2 days",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Refer to Under Writer",
              "zd_claims_year": "2",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Royal Sundaram",
              "commercial": "No",
              "video_approval": "At U/W end",
              "video_tat": "2 days",
              "short_partial": "No",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Refer to Under Writer",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Universal Sompo",
              "commercial": "No",
              "video_approval": "At U/W end",
              "video_tat": "2 days",
              "short_partial": "No",
              "artificial_low_lighting": "No",
              "scar_declaration": "Will Refer to Under Writer",
              "zd_claims_year": "Unlimited till",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          {
              "insurer_name": "Digit",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "2 days",
              "short_partial": "No",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "Yes",
              "old_3_3": "Yes"
          }]; 
      // You will need to add your insurance data here in the future
      /*
      const insuranceData =
      // You will need to add your insurance data here in the future
      /*
      const insuranceData = [
          {
              "insurer_name": "National",
              "commercial": "Yes",
              "video_approval": "At PB end",
              "video_tat": "24 Hours",
              "short_partial": "Yes",
              "artificial_low_lighting": "No",
              "scar_declaration": "Declaration Required within Video TAT",
              "zd_claims_year": "ZD Plan: 2, ZD+: Unlimited",
              "non_zd_claims_year": "Unlimited",
              "brand_new_3_3": "No",
              "old_3_3": "No"
          },
          // ... all other 27 companies if needed];
      */

      function populateTable(data) {
          const tableBody = document.getElementById('tableBody');
          if (!tableBody) {
              console.error("Error: tableBody element not found for insuranceTable.");
              return;
          }
          tableBody.innerHTML = ''; // Clear existing rows
          if (data.length === 0) {
              // Display a message if no data is available
              tableBody.innerHTML = '<tr><td colspan="11" class="p-4 text-center text-gray-500">No insurance data available. Please add data to the "insuranceData" array in the script.</td></tr>';
              return;
          }
          data.forEach(item => {
              const row = document.createElement('tr');
              row.className = 'table-row border-b';
              row.innerHTML = `
                  <td class="p-2 font-medium text-indigo-900">${item.insurer_name}</td>
                  <td class="p-2">${item.zd_claims_year}</td>
                  <td class="p-2">${item.non_zd_claims_year}</td>
                  <td class="p-2 ${item.commercial === 'Yes' ? 'text-green-700' : 'text-red-700'}">${item.commercial}</td>
                  <td class="p-2">${item.video_approval}</td>
                  <td class="p-2">${item.video_tat}</td>
                  <td class="p-2 ${item.short_partial === 'Yes' ? 'text-green-700' : 'text-red-700'}">${item.short_partial}</td>
                  <td class="p-2 ${item.artificial_low_lighting === 'Yes' ? 'text-green-700' : 'text-red-700'}">${item.artificial_low_lighting}</td>
                  <td class="p-2">${item.scar_declaration}</td>
                  <td class="p-2 ${item.brand_new_3_3 === 'Yes' ? 'text-green-700' : 'text-red-700'}">${item.brand_new_3_3}</td>
                  <td class="p-2 ${item.old_3_3 === 'Yes' ? 'text-green-700' : 'text-red-700'}">${item.old_3_3}</td>
              `;
              tableBody.appendChild(row);
          });
      }

      function sortTable(column, order) {
          // Create a copy of the original data to sort, to avoid modifying the global `insuranceData` directly
          const sortedData = [...insuranceData].sort((a, b) => {
              const aValue = String(a[column]).toLowerCase(); // Ensure values are strings for comparison
              const bValue = String(b[column]).toLowerCase();

              if (order === 'asc') {
                  return aValue > bValue ? 1 : -1;
              } else {
                  return aValue < bValue ? 1 : -1;
              }
          });
          populateTable(sortedData);
      }

      function setupInsuranceDashboardListeners() {
          // Remove existing listeners to prevent multiple bindings if the page is opened multiple times
          const tableHeaders = document.querySelectorAll('#insuranceTable .table-header');
          tableHeaders.forEach(header => {
              // Remove previous event listener safely by recreating the element
              const newHeader = header.cloneNode(true);
              header.parentNode.replaceChild(newHeader, header);
          });

          // Add event listeners to the newly (or freshly cloned) table headers
          document.querySelectorAll('#insuranceTable .table-header').forEach(header => {
              header.addEventListener('click', () => {
                  const column = header.dataset.column;
                  const currentOrder = header.classList.contains('sort-asc') ? 'desc' : 'asc';

                  document.querySelectorAll('#insuranceTable .table-header').forEach(h => {
                      h.classList.remove('sort-asc', 'sort-desc');
                      h.classList.add('sort-icon'); /* Default icon wapas add karein */
                  });

                  header.classList.remove('sort-icon'); /* Current header se default icon hatayen */
                  header.classList.add(currentOrder === 'asc' ? 'sort-asc' : 'sort-desc');

                  sortTable(column, currentOrder);
              });
          });

          // Remove existing listener for search input and re-add
          const searchInput = document.getElementById('searchInput');
          // searchInput maujood hai ya nahi, check karein clone karne se pehle
          if (searchInput) {
              const newSearchInput = searchInput.cloneNode(true);
              searchInput.parentNode.replaceChild(newSearchInput, searchInput);

              newSearchInput.addEventListener('input', (e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filteredData = insuranceData.filter(item =>
                      item.insurer_name.toLowerCase().includes(searchTerm)
                  );
                  populateTable(filteredData);
              });
          }
      }

      // Data for Inspection Waiver
      const inspectionWaiverData = [{ "Insurer Name": "Bajaj Allianz", "Policy Waiver": "5 Days" },
{ "Insurer Name": "Cholamandalam MS", "Policy Waiver": "5 Days" },
{ "Insurer Name": "Future Generali", "Policy Waiver": "No waiver" },
{ "Insurer Name": "Digit", "Policy Waiver": "No waiver" },
{ "Insurer Name": "HDFC Ergo", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "ICICI Lombard", "Policy Waiver": "5 Days only for Some cases" },
{ "Insurer Name": "Iffco Tokio", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "LIBERTY GENERAL", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "Magma General", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "National Insurance", "Policy Waiver": "5 Days" },
{ "Insurer Name": "Reliance", "Policy Waiver": "15 Days – ( Renewal ), 1 Day ( Fresh, Rollover )" },
{ "Insurer Name": "Royal Sundaram", "Policy Waiver": "7 Days" },
{ "Insurer Name": "SBI", "Policy Waiver": "5 days ( Only Renewal )" },
{ "Insurer Name": "Shriram", "Policy Waiver": "5 Days" },
{ "Insurer Name": "TATA AIG", "Policy Waiver": "1 Day" },
{ "Insurer Name": "New India", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "Oriental", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "United", "Policy Waiver": "5 Days" },
{ "Insurer Name": "Universal Sompo", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "Zuno General", "Policy Waiver": "No Waiver" },
{ "Insurer Name": "Zurich Kotak", "Policy Waiver": "5 Days" }
      ];

      function populateInspectionWaiverTable(data) {
          const tableBody = document.getElementById('inspectionWaiverTableBody');
          // Check if tableBody exists before proceeding
          if (!tableBody) {
              console.error("Error: inspectionWaiverTableBody element not found.");
              return;
          }
          tableBody.innerHTML = ''; // Clear existing rows
          data.forEach(item => {
              const row = document.createElement('tr');
              const waiverText = item["Policy Waiver"].toLowerCase();
              let waiverClass = '';
              if (waiverText.includes("no waiver")) {
                  waiverClass = 'no-waiver';
              } else if (waiverText.includes("days") || waiverText.includes("day")) {
                  waiverClass = 'days-waiver';
              }

              row.innerHTML = `
                  <td>${item["Insurer Name"]}</td>
                  <td class="policy-waiver-column ${waiverClass}">${item["Policy Waiver"]}</td>
              `;
              tableBody.appendChild(row);
          });
      }

      // Data for RSA & Contact
      // Function to clean numbers and replace commas with slashes
      function cleanAndFormatNumber(numberString) {
          if (!numberString) return "";
          return numberString.replace(/,/g, '/').trim();
      }

      const rsaContactData = [
          
    { "Sr.": "1", "Insurer Name": "Bajaj Allianz", "RSA and Toll Free Number": "1800 209 5858 / 1800 209 0144 / 1800 103 5858", "Claim No.": "1800 209 0144 / 1800-209-5858" },
    { "Sr.": "2", "Insurer Name": "United Insurance", "RSA and Toll Free Number": "7042113114 (Roadzen-delhi) and 1800 210 2051 (ROI)", "Claim No.": "" },
    { "Sr.": "3", "Insurer Name": "Digit General", "RSA and Toll Free Number": "1800 258 5956 / (7026061234-whatsapp)", "Claim No.": "1800 103 4448" },
    { "Sr.": "4", "Insurer Name": "Edelweiss (Zuno)", "RSA and Toll Free Number": "22 4231 2000 / 1800 12 000", "Claim No.": "" },
    { "Sr.": "5", "Insurer Name": "Future Generali", "RSA and Toll Free Number": "1860 500 3333 / 1800 220 233 / 022 67837800", "Claim No.": "" },
    { "Sr.": "6", "Insurer Name": "HDFC Ergo", "RSA and Toll Free Number": "022 6234 6234 / 0120 6234 6234", "Claim No.": "" },
    { "Sr.": "7", "Insurer Name": "Iffco Tokio", "RSA and Toll Free Number": "1800 103 5499", "Claim No.": "" },
    { "Sr.": "8", "Insurer Name": "Kotak General Insurance", "RSA and Toll Free Number": "1800 266 4545", "Claim No.": "" },
    { "Sr.": "9", "Insurer Name": "Magma HDI", "RSA and Toll Free Number": "1800 266 3202", "Claim No.": "" },
    { "Sr.": "10", "Insurer Name": "Reliance General Insurance", "RSA and Toll Free Number": "022 4890 3009 / 1800 3009 / 022 48947020", "Claim No.": "" },
    { "Sr.": "11", "Insurer Name": "Royal Sundaram", "RSA and Toll Free Number": "1800 568 9999", "Claim No.": "" },
    { "Sr.": "12", "Insurer Name": "SBI General Insurance", "RSA and Toll Free Number": "1800 22 1111 / 1800 102 1111", "Claim No.": "" },
    { "Sr.": "13", "Insurer Name": "Shriram General Insurance", "RSA and Toll Free Number": "1800 300 30000 / 1800 103 3009", "Claim No.": "" },
    { "Sr.": "14", "Insurer Name": "TATA AIG", "RSA and Toll Free Number": "1800 266 7780", "Claim No.": "" },
    { "Sr.": "15", "Insurer Name": "Universal Sompo", "RSA and Toll Free Number": "1800 22 4030 / 1800 200 5142 / 022 27639800 / 1800 22 4090 / 1800 200 4030", "Claim No.": "" },
    { "Sr.": "16", "Insurer Name": "Raheja QBE", "RSA and Toll Free Number": "1800 102 7723", "Claim No.": "18001027723" },
    { "Sr.": "17", "Insurer Name": "Oriental Insurance", "RSA and Toll Free Number": "1800 309 1209", "Claim No.": "1800118485 / 011-33208485" },
    { "Sr.": "18", "Insurer Name": "New India Insurance", "RSA and Toll Free Number": "1800-209-1415", "Claim No.": "1800-209-1415" },
    { "Sr.": "19", "Insurer Name": "ICICI Lombard", "RSA and Toll Free Number": "1800 2666", "Claim No.": "1800 2666" },
    { "Sr.": "20", "Insurer Name": "National", "RSA and Toll Free Number": "1800 345 0330", "Claim No.": "" },
    { "Sr.": "21", "Insurer Name": "Liberty Videocon", "RSA and Toll Free Number": "1800 266 5844", "Claim No.": "" },
    { "Sr.": "22", "Insurer Name": "PB_What's App No.", "RSA and Toll Free Number": "8506013131", "Claim No.": "" },
    { "Sr.": "23", "Insurer Name": "PB_Service Team No.", "RSA and Toll Free Number": "1800-258-5970", "Claim No.": "" },
    { "Sr.": "24", "Insurer Name": "PB_Health Renewal Team No.", "RSA and Toll Free Number": "1800-572-3919", "Claim No.": "" },
    { "Sr.": "25", "Insurer Name": "PB_Health Sales Team No.", "RSA and Toll Free Number": "1800-419-7715", "Claim No.": "" },
    { "Sr.": "26", "Insurer Name": "PB_Car Motor Sales Team No.", "RSA and Toll Free Number": "1800-419--7716", "Claim No.": "" },
    { "Sr.": "27", "Insurer Name": "PB_Term/Jeevan Bima Sales Team No.", "RSA and Toll Free Number": "1800-419-7713", "Claim No.": "" },
    { "Sr.": "28", "Insurer Name": "PB_Investment Sales Team No.", "RSA and Toll Free Number": "1800-419-7717", "Claim No.": "" },
    { "Sr.": "29", "Insurer Name": "PB_Travel Sales Team No.", "RSA and Toll Free Number": "1800-419-7824", "Claim No.": "" },
    { "Sr.": "30", "Insurer Name": "PB_Corporate Sales Team No.", "RSA and Toll Free Number": "1800-309-0988", "Claim No.": "" },
    { "Sr.": "31", "Insurer Name": "PB_Corporate Service Team No.", "RSA and Toll Free Number": "1800-572-3918", "Claim No.": "" },
    { "Sr.": "32", "Insurer Name": "PB_Home Insurance Team No.", "RSA and Toll Free Number": "1800-258-7202", "Claim No.": "" },
    { "Sr.": "33", "Insurer Name": "PB_Commercial Vehicle Sales Team No.", "RSA and Toll Free Number": "0124-6108850", "Claim No.": "" },
    { "Sr.": "34", "Insurer Name": "PB_Service Email Id", "RSA and Toll Free Number": "CARE@POLICYBAZAAR.COM", "Claim No.": "" },
    { "Sr.": "35", "Insurer Name": "PB_NRI Team No.", "RSA and Toll Free Number": "0124-6656507", "Claim No.": "" },
    { "Sr.": "36", "Insurer Name": "PB Partner Agent Team No.", "RSA and Toll Free Number": "1800-120-800", "Claim No.": "" },
    { "Sr.": "37", "Insurer Name": "PB_Mail", "RSA and Toll Free Number": "SUPPORT@PBPARTNER.COM", "Claim No.": "" },
    { "Sr.": "38", "Insurer Name": "Paisa Bazaar.com Team No.", "RSA and Toll Free Number": "1800-208-8877", "Claim No.": "" },
    { "Sr.": "39", "Insurer Name": "PB_2W Renewal Team No.", "RSA and Toll Free Number": "0124-6138301", "Claim No.": "" },
    { "Sr.": "40", "Insurer Name": "PB_Sales Team No.", "RSA and Toll Free Number": "1800-419-7716", "Claim No.": "" },
    { "Sr.": "41", "Insurer Name": "PB_Claim Team NO.", "RSA and Toll Free Number": "1800-258-5881", "Claim No.": "" }

      ];

      function populateRSATable(data) {
          const tableBody = document.getElementById('rsaContactTableBody');
          // Check if tableBody exists before proceeding
          if (!tableBody) {
              console.error("Error: rsaContactTableBody element not found.");
              return;
          }
          tableBody.innerHTML = ''; // Clear existing rows
          if (data.length === 0) {
              tableBody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">No RSA & Contact data available.</td></tr>';
              return;
          }
          data.forEach(item => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item["Sr."]}</td>
                  <td>${item["Insurer Name"]}</td>
                  <td>${cleanAndFormatNumber(item["RSA and Toll Free Number"])}</td>
                  <td>${cleanAndFormatNumber(item["Claim No."])}</td>
              `;
              tableBody.appendChild(row);
          });
      }

      function setupRSADashboardListeners() {
          // Remove existing listener for search input and re-add
          const rsaSearchInput = document.getElementById('rsaSearchInput');
          if (rsaSearchInput) {
              const newRSASearchInput = rsaSearchInput.cloneNode(true);
              rsaSearchInput.parentNode.replaceChild(newRSASearchInput, rsaSearchInput);

              newRSASearchInput.addEventListener('input', (e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filteredData = rsaContactData.filter(item =>
                      item["Insurer Name"].toLowerCase().includes(searchTerm) ||
                      cleanAndFormatNumber(item["RSA and Toll Free Number"]).toLowerCase().includes(searchTerm) ||
                      cleanAndFormatNumber(item["Claim No."]).toLowerCase().includes(searchTerm)
                  );
                  populateRSATable(filteredData);
              });
          }
      }


      // Page load hone par images ko shuruat mein load karein
      loadImages();

      // --- NEW JAVASCRIPT FOR UPDATES BUTTON AND MODAL ---
      document.addEventListener('DOMContentLoaded', function() {
          const updatesButton = document.getElementById('companyUpdatesButton');
          const updatesModal = document.getElementById('updatesModal');
          const closeModalButton = document.getElementById('closeModalButton');
          const updatesContainer = document.getElementById('updatesContainer');
          const latestUpdateSnippetElem = document.getElementById('latestUpdateSnippet');
          const newUpdateIndicator = document.getElementById('newUpdateIndicator');

          // --- IMPORTANT: DAILY UPDATES DATA SECTION (दैनिक अपडेट डेटा सेक्शन) ---
          // YAHAN AAP APNE DAILY UPDATES DALEIN. (यहां आप अपने दैनिक अपडेट डालें।)
          // Har company ke liye, updates ko array ke andar dalien. (हर कंपनी के लिए, अपडेट को एरे के अंदर डालें।)
          // Naye updates ko array ke shuruat (top) mein dalien, taaki woh pehle dikhein. (नए अपडेट को एरे की शुरुआत (शीर्ष) में डालें, ताकि वह पहले दिखें।)
          // Format: { date: "YYYY-MM-DD", update: "Your update text here" } (फॉर्मेट: { date: "YYYY-MM-DD", update: "आपका अपडेट टेक्स्ट यहां" })
          const companyUpdates = {
              "National": [],
              "New India Assurance": [],
              "Oriental": [],
              "United India": [],
              "Tata AIG": [{
    "date": "2025-06-30",
    "update": "TATA AIG Battery Protection Cover 1. Applicable for EV vehicles 2. Covers damage to battery, drive motor/electric motor, and includes chargers & cables as well (up to the IDV) 3. Provides coverage for water ingression, short circuit, or damages from accidental external factors 4. Counted as a claim 5. Allowed 2 times in a policy year"
  }
  ],
              "ICICI Lombard": [{
    "date": "2025-06-30",
    "update": "ICICI Lombard Battery Protection 1. Provides coverage for damages arising from water ingression or short circuits, resulting in loss or damage to the battery, drive motor/electric motor, and HEV (Hybrid Electric Vehicle) system 2. Coverage extends up to the Insured Declared Value (IDV) 3. Counted as a claim with a limit of 1 time per policy year 4. Charging cables and chargers are not included under this protection cover 5. Applicable for both Hybrid and EV vehicles"
  }
  ],
              "Zuno General": [],
              "Cholamandalam MS": [],
              "Future Generali": [],
              "Magma": [],
              "Raheja QBE": [],
              "Kotak": [],
              "SBI General": [{ date: "2025-08-11", update: "For all Pre issuance rejection: Please mark an email to customer regarding the refund process of 7 working days from the date of rejection" }],
              "Shriram": [],
              "IFFCO Tokio": [],
              "Liberty Videocon": [],
              "HDFC Ergo": [],
              "Reliance": [
                  { date: "2025-06-12", update: "Unmasked KYC documents (Aadhar and PAN card) are needed for KYC in Reliance. Please ask the CX to share Aadhar card through Email." }
              ],
              "Bajaj Allianz": [],
              "Royal Sundaram": [],
              "Universal Sompo": [],
              "Digit": [{ date: "2025-06-12", update: "if cx comes for odometere update in DIGIT , THese 4 things needs to be captured:- odomeret reading, engraved, chasis number, 360 degree view and Engiene compartment" },{
    "date": "2025-06-30",
    "update": "Digit Battery Protection Add-on 1. Applicable for both Hybrid and EV vehicles 2. Covers damage to battery, drive motor/electric motor, and Hybrid Electric Vehicle (HEV), including chargers and cables as well (up to the IDV) 3. Provides coverage for water ingression, short circuit, or damages from accidental external factors 4. Counted as a claim 5. Allowed 2 times in a policy year"
  },{ date: "2025-08-11", update: "For all Pre issuance rejection: Please mark an email to customer regarding the refund process of 7 working days from the date of rejection" }],
              "BAJAJ CPA": [],
              "DIGIT CPA": [],
              "CHOLA CPA": [],
              "KOTAK CPA": [],
              "RELIENCE CPA": [],
              "LIBERTY CPA": []
          };
          // --- END OF DAILY UPDATES DATA SECTION ---


          // This variable will hold the snippet for display on the button.
          let latestUpdateSnippetText = "";
          let hasNewUpdate = false;

          // Find the most recent update among all companies for the button snippet
          // This will pick the first company in the list that has an update.
          // If no updates are present in any company, hasNewUpdate will remain false.
          // Sort all updates by date in descending order to get the latest one
          const allUpdates = [];
          for (const company in companyUpdates) {
              if (companyUpdates.hasOwnProperty(company)) {
                  companyUpdates[company].forEach(updateItem => {
                      allUpdates.push({ company: company, date: updateItem.date, update: updateItem.update });
                  });
              }
          }

          allUpdates.sort((a, b) => new Date(b.date) - new Date(a.date));

          if (allUpdates.length > 0) {
              const mostRecentUpdate = allUpdates[0];
              latestUpdateSnippetText = `${mostRecentUpdate.company}: ${mostRecentUpdate.update}`;
              hasNewUpdate = true;
          }


          // Function to display the modal
          function showUpdatesModal() {
              if (updatesModal) updatesModal.classList.add('active');
              populateUpdates(); // Populate updates when modal opens
              // After showing, mark as seen for this session
              sessionStorage.setItem('updatesSeen', 'true');
              hideNewUpdateIndicatorAndSnippet(); // Hide indicator once modal is opened
              hideAllMainContent(); // Hide other main content when updates modal is open
          }

          // Function to hide the modal
          function closeUpdatesModal() {
              if (updatesModal) updatesModal.classList.remove('active');
              showAllMainContent(); // Show other main content when updates modal is closed
          }

          // Function to populate the updates in an accordion style
          function populateUpdates() {
              if (!updatesContainer) {
                  console.error("Error: updatesContainer element not found.");
                  return;
              }
              updatesContainer.innerHTML = ''; // Clear previous content
              // Dynamically add all company names as accordion headers
              const allCompanies = [
                  "National", "New India Assurance", "Oriental", "United India", "Tata AIG",
                  "ICICI Lombard", "Zuno General", "Cholamandalam MS", "Future Generali",
                  "Magma", "Raheja QBE", "Kotak", "SBI General", "Shriram", "IFFCO Tokio",
                  "Liberty Videocon", "HDFC Ergo", "Reliance", "Bajaj Allianz", "Royal Sundaram",
                  "Universal Sompo", "Digit", "BAJAJ CPA", "DIGIT CPA", "CHOLA CPA",
                  "KOTAK CPA", "RELIENCE CPA", "LIBERTY CPA"
              ];

              allCompanies.forEach(company => {
                  const companyUpdatesList = companyUpdates[company] || []; // Use empty array if company not in data
                  // Sort updates for each company by date descending
                  companyUpdatesList.sort((a, b) => new Date(b.date) - new Date(a.date));
                      
                  const accordionItem = document.createElement('div');
                  accordionItem.classList.add('accordion-item');

                  const accordionHeader = document.createElement('div');
                  accordionHeader.classList.add('accordion-header');
                  accordionHeader.textContent = company; // Company name is always set
                  accordionHeader.dataset.company = company; // Store company name for identifier

                  const accordionContent = document.createElement('div');
                  accordionContent.classList.add('accordion-content');
                  const ul = document.createElement('ul');

                  if (companyUpdatesList.length === 0) {
                      const li = document.createElement('li');
                      li.textContent = "No updates available yet."; // This text is added if no updates
                      ul.appendChild(li);
                  } else {
                      companyUpdatesList.forEach(updateItem => {
                          const li = document.createElement('li');
                          li.innerHTML = `<strong>${updateItem.date}:</strong> ${updateItem.update}`;
                          ul.appendChild(li);
                      });
                  }
                  
                  accordionContent.appendChild(ul);
                  accordionItem.appendChild(accordionHeader);
                  accordionItem.appendChild(accordionContent);
                  updatesContainer.appendChild(accordionItem);
              });

              // Add event listeners to all accordion headers
              document.querySelectorAll('.accordion-header').forEach(header => {
                  header.addEventListener('click', function() {
                      const content = this.nextElementSibling;
                      // Toggle active class on header
                      this.classList.toggle('active');
                      // Toggle active class on content to control max-height and padding
                      content.classList.toggle('active');
                  });
              });
          }

          // --- New Update Indicator Logic ---
          function showNewUpdateIndicatorAndSnippet() {
              // If there's an update and it hasn't been seen in this session
              if (hasNewUpdate && !sessionStorage.getItem('updatesSeen')) {
                  if (latestUpdateSnippetElem) latestUpdateSnippetElem.textContent = latestUpdateSnippetText;
                  if (newUpdateIndicator) newUpdateIndicator.style.display = 'block'; // Show the pulsating dot
              } else {
                  if (latestUpdateSnippetElem) latestUpdateSnippetElem.textContent = ''; // Clear snippet
                  if (newUpdateIndicator) newUpdateIndicator.style.display = 'none';
              }
          }

          function hideNewUpdateIndicatorAndSnippet() {
              if (latestUpdateSnippetElem) latestUpdateSnippetElem.textContent = '';
              if (newUpdateIndicator) newUpdateIndicator.style.display = 'none';
          }

          // --- Event Listeners for the New Updates Feature ---
          if (updatesButton) updatesButton.addEventListener('click', showUpdatesModal);
          if (closeModalButton) closeModalButton.addEventListener('click', closeUpdatesModal);
          // Close modal if clicked directly on the overlay background
          if (updatesModal) {
              updatesModal.addEventListener('click', function(event) {
                  if (event.target === updatesModal) { // Only closes if clicked on the dark background
                      closeUpdatesModal();
                  }
              });
          }

          // Initial call to display new update indicator/snippet on page load
          showNewUpdateIndicatorAndSnippet();
      });
  // Fill CSAT & Quality dropdowns + AHT
  window.onload = function () {
    let csatSelect = document.getElementById("incentiveCSAT");
    let qualitySelect = document.getElementById("incentiveQuality");
    let minSelect = document.getElementById("incentiveAHTMin");
    let secSelect = document.getElementById("incentiveAHTSec");

    // Clear existing options to prevent duplication issues
    csatSelect.innerHTML = '';
    qualitySelect.innerHTML = '';
    minSelect.innerHTML = '';
    secSelect.innerHTML = '';

    // CSAT 80–100
    for (let i = 80; i <= 100; i++) {
      csatSelect.innerHTML += `<option value="${i}">${i}%</option>`;
      if (i < 100) {
        csatSelect.innerHTML += `<option value="${i}+">${i}+%</option>`;
      }
    }
    csatSelect.value = "90";

    // Quality 40–100
    for (let i = 40; i <= 100; i++) {
      qualitySelect.innerHTML += `<option value="${i}">${i}%</option>`;
      if (i < 100) {
        qualitySelect.innerHTML += `<option value="${i}+">${i}+%</option>`;
      }
    }
    qualitySelect.value = "90";

    // AHT minutes (2–7 min)
    for (let i = 2; i <= 7; i++) {
      minSelect.innerHTML += `<option value="${i}">${i} Min</option>`;
    }
    minSelect.value = "4";

    // AHT seconds (step of 10 sec)
    // AHT seconds (1 to 59 sec)
  for (let i = 0; i < 60; i++) {
    secSelect.innerHTML += `<option value="${i}">${i} Sec</option>`;
  }
    secSelect.value = "30";
  };

  // Open Modal
  window.openIncentiveModal = function () {
    document.getElementById("incentiveModal").style.display = "flex";
  };

  // Close Modal
  window.closeIncentiveModal = function () {
    document.getElementById("incentiveModal").style.display = "none";
  };

  // --- Helper Functions ---

  // Step 1: CSAT flat amount
  function getCSATFlatAmount(csatValue) {
    let csat = parseFloat(csatValue);
    let isPlus = csatValue.includes("+");

    if (csat <= 85 && !isPlus) return 0;
    if (csat <= 87 && !isPlus) return 2000;
    if (csat <= 90 && !isPlus) return 5000;
    if (csat <= 92 && !isPlus) return 6000;
    if (csat <= 95 && !isPlus) return 7000;
    if (csat <= 97 && !isPlus) return 8000;
    
    // Logic for '+' values and scores > 97
    if (csat > 97 || (isPlus && csat >= 97)) return 10000;
    if (isPlus && csat >= 95) return 8000;
    if (isPlus && csat >= 92) return 7000;
    if (isPlus && csat >= 90) return 6000;
    if (isPlus && csat >= 87) return 5000;
    if (isPlus && csat >= 85) return 2000;
    if (isPlus && csat < 85) return 0;

    return 0; // Default case
  }

  // Step 2: Quality Bonus
  function getQualityBonus(qualityValue, csatFlatAmount) {
    let quality = parseFloat(qualityValue);
    let isPlus = qualityValue.includes("+");

    if (quality < 80 && !isPlus) return null; // Cancel incentive
    if (quality <= 85 && !isPlus) return csatFlatAmount * 0.05;
    if (quality <= 90 && !isPlus) return csatFlatAmount * 0.10;

    // Logic for '+' values and scores > 90
    if (quality > 90 || (isPlus && quality >= 90)) return csatFlatAmount * 0.25;
    if (isPlus && quality >= 85) return csatFlatAmount * 0.10;
    if (isPlus && quality < 85 && quality >= 80) return csatFlatAmount * 0.05;
    if (isPlus && quality < 80) return null;

    return csatFlatAmount * 0.25; // Default for >90
  }

  // Step 3: AHT Bonus (No change here)
  function getAHTBonus(aht, csatFlatAmount) {
    if (aht <= 230) return csatFlatAmount * 0.25; // ≤ 3:50
    else if (aht <= 290) return csatFlatAmount * 0.10; // 3:51 – 4:50
    else if (aht <= 360) return csatFlatAmount * 0.05; // 4:51 – 6:00
    else return 0; // > 6:00
  }

  // --- Main Logic ---
  window.calculateIncentive = function () {
    let csatValue = document.getElementById("incentiveCSAT").value;
    let qualityValue = document.getElementById("incentiveQuality").value;
    let min = parseInt(document.getElementById("incentiveAHTMin").value);
    let sec = parseInt(document.getElementById("incentiveAHTSec").value);
    let escalation = document.getElementById("escalation").value;
    let warning = parseInt(document.getElementById("warning").value);

    let aht = min * 60 + sec; // total seconds

    // Get the original CSAT flat amount first
    let csatFlatAmount = getCSATFlatAmount(csatValue);

    // Then calculate the 70% CSAT bonus
    let csatBonus = csatFlatAmount * 0.7;

    // Calculate Quality & AHT bonuses based on the original flat amount
    let qBonus = getQualityBonus(qualityValue, csatFlatAmount);
    let ahtBonus = getAHTBonus(aht, csatFlatAmount);

    // Check for quality rule (if < 80, incentive is null)
    if (qBonus === null) {
      document.getElementById("incentiveResult").innerHTML =
        "<p style='color:red;'>❌ Incentive Cancelled (Quality < 80%)</p>";
      return;
    }

    // Calculate total before final deductions
    let totalIncentive = csatBonus + qBonus + ahtBonus;

    // Step 4: Final Deductions
    if (warning >= 1) {
      totalIncentive = 0;
    } else {
      if (escalation == "1") totalIncentive *= 0.75;
      else if (escalation == "2" || escalation == "2+") totalIncentive *= 0.5;
    }

    document.getElementById(
      "incentiveResult"
    ).innerHTML = `<p>💰 Final Incentive: <b>₹${totalIncentive.toFixed(0)}</b></p>`;
  };
  // Highlight "NO" cells in ADP table
document.addEventListener("DOMContentLoaded", () => {
  const adpTable = document.querySelector(".manual-vi-page table");
  if (adpTable) {
    adpTable.querySelectorAll("td").forEach(td => {
      if (td.textContent.trim().toUpperCase() === "NO") {
        td.classList.add("bg-red-100", "text-red-700", "font-semibold");
      }
    });
  }
});
// ✅ PB Wheels Popup Control
window.openPBWheelsScript = function () {
  const popup = document.getElementById("pbPopup");
  const closeBtn = document.getElementById("closePopupBtn");
  if (!popup || !closeBtn) return;

  // 🔹 Popup open karo
  popup.classList.remove("hidden");

  // 🔹 Close button par click karne se band ho
  closeBtn.onclick = () => popup.classList.add("hidden");

  // 🔹 Popup ke bahar click karne se bhi band ho
  popup.addEventListener("click", (event) => {
    // agar user ne background (black area) pe click kiya
    if (event.target === popup) {
      popup.classList.add("hidden");
    }
  });
};
