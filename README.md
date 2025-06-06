<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHIVANG</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); /* हल्का नीला ग्रेडिएंट */
      text-align: center;
      margin: 0;
      min-height: 100vh;
    }
    h2, h3 {
      color: #1a237e;
      font-weight: 600;
    }
    h2 {
      font-size: 3em; /* फॉन्ट साइज़ को 3em कर दिया गया है */
      letter-spacing: 1px;
    }
    h3 {
      font-size: 1.5em;
    }
    .upload-section {
      margin-top: 100px; /* Adjusted margin-top to push it further down */
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
      background-color: #ADD8E6 !important; /* हल्का नीला बैकग्राउंड कलर */
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #87CEEB !important; /* गहरा नीला ऑन होवर */
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
      background-color: #ADD8E6 !important; /* हल्का नीला बैकग्राउंड कलर */
      color: white;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .modal-content .upload-btn:hover {
      background-color: #87CEEB !important; /* गहरा नीला ऑन होवर */
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
    .csat-modal-content .button-group { /* Added for button alignment */
      display: flex;
      justify-content: center;
      gap: 10px; /* Space between buttons */
      margin-top: 15px;
    }
    .csat-modal-content .close-btn, .csat-modal-content .calculate-btn {
      flex: 1; /* Make buttons take equal width */
      max-width: 150px; /* Limit max width for larger screens */
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      margin: 0 !important; /* Remove individual margins */
    }
    .csat-modal-content .close-btn {
      background-color: #f44336;
      color: white;
      border: none;
    }
    .csat-modal-content .close-btn:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .csat-modal-content .calculate-btn {
      background-color: #3f51b5;
      color: white;
      border: none;
    }
    .csat-modal-content .calculate-btn:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    /* Fixed Buttons */
    .csat-btn, .endorsement-btn, .manual-vi-btn-fixed, .claim-nstp-btn-fixed {
      position: fixed;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      font-size: 0.9em;
      background-color: #FF4500; /* OrangeRed */
    }

    .csat-btn:hover, .endorsement-btn:hover, .manual-vi-btn-fixed:hover, .claim-nstp-btn-fixed:hover {
      background-color: #E63900; /* Darker OrangeRed on hover */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    /* CSAT and Claim Count buttons */
    .csat-btn {
      top: 10px;
      left: 10px;
    }
    .claim-nstp-btn-fixed {
      top: 60px; /* Positioned below CSAT button */
      left: 10px;
    }

    /* Endorsement and Manual VI buttons */
    .endorsement-btn {
      top: 10px;
      right: 10px;
    }
    .manual-vi-btn-fixed {
        top: 60px; /* Positioned below endorsement button */
        right: 10px; /* Aligned with endorsement button */
    }

    /* ENDORSEMENT Full-Page Widget Styles */
    .endorsement-page {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); /* हल्का नीला ग्रेडिएंट */
      z-index: 1000;
      padding: 0; /* Removed padding to make it truly full-page */
      margin: 0; /* Ensure no margins */
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }
    .endorsement-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, opacity 0.3s ease;
      transform: scale(0.9);
      opacity: 0;
      position: relative;
      top: 50%;
      transform: translateY(-50%); /* Center vertically */
    }
    .endorsement-container.active {
      transform: scale(1) translateY(-50%); /* Adjust transform to include centering */
      opacity: 1;
    }
    .endorsement-container h1 {
      text-align: center;
      color: #1a237e;
      font-size: 1.8em;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .created-by {
      text-align: center;
      font-size: 0.8em;
      margin-bottom: 15px;
      background: linear-gradient(90deg, #3f51b5, #e91e63);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: fadeIn 1.5s ease-in-out;
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .endorsement-container label {
      display: block;
      color: #263238;
      font-size: 1em;
      font-weight: 500;
      margin: 10px 0 6px;
    }
    .PB_DROPDOWN {
      width: 100%;
      padding: 10px;
      border: 2px solid #b0bec5;
      border-radius: 8px;
      font-size: 0.95em;
      font-family: Arial, Helvetica, sans-serif; /* Changed to fix BAJAJ rendering */
      background: #fafafa;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      height: 40px; /* Fixed height to prevent extra space */
      appearance: none; /* Remove default browser styling */
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>'); /* Custom dropdown arrow */
      background-repeat: no-repeat;
      background-position: right 10px center;
    }
    .PB_DROPDOWN:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 8px rgba(63, 81, 181, 0.3);
    }
    .PB_DROPDOWN:hover {
      border-color: #3f51b5;
    }
    .output {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 10px;
      margin-top: 15px;
      font-size: 1em;
      font-weight: 500;
      line-height: 1.6;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border: 1px solid #bbdefb;
      transform: scale(0.95);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .output.show {
      transform: scale(1);
      opacity: 1;
    }
    .output.output-red {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
    }
    .output div {
      margin-bottom: 8px;
    }
    .label {
      color: #1565c0;
      font-weight: 700;
      margin-right: 8px;
    }
    .output-red .label {
      color: #721c24;
    }
    .value {
      color: #263238;
    }
    .back-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      margin-top: 15px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .back-btn:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    /* Styles for Manual VI Page */
    .manual-vi-page {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); /* हल्का नीला ग्रेडिएंट */
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
      overflow-y: auto; /* Make content scrollable */
    }
    .manual-vi-page .card {
        margin-top: 10px; /* Consistent margin */
    }
    .manual-vi-page .card-header {
      background-color: #343a40 !important; /* Dark background for header */
      color: white !important; /* White text for header */
      padding: 10px 15px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      font-weight: 600;
    }
    .manual-vi-page .card-body {
      padding: 20px;
    }
    .manual-vi-page ul {
      list-style-type: disc; /* Ensure bullet points are visible */
      padding-left: 20px;
      text-align: left; /* Align text to the left within the lists */
    }

    /* Styles for Claim Count & NSTP Page */
    .claim-nstp-page {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); /* हल्का नीला ग्रेडिएंट */
      z-index: 1000;
      padding: 20px;
      padding-top: 20px; /* Adjusted padding-top as no fixed button at top now */
      box-sizing: border-box;
      text-align: center;
      overflow-y: auto; /* Make content scrollable */
    }
    /* Removed .claim-nstp-page .back-to-home-btn styles as the button is removed */
    
    /* Table styles for claim-nstp-page */
    .claim-nstp-page table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden; /* Ensures rounded corners are applied to table content */
    }
    .claim-nstp-page th, .claim-nstp-page td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    .claim-nstp-page th {
        background-color: #3f51b5;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        white-space: nowrap; /* Prevent wrapping for headers */
    }
    .claim-nstp-page td {
      white-space: nowrap; /* Prevent wrapping for cell content */
    }
    .claim-nstp-page tr:nth-child(odd) {
        background-color: #f8faff;
    }
    .claim-nstp-page tr:nth-child(even) {
        background-color: #eef2ff;
    }
    .claim-nstp-page tr:hover {
        background-color: #dbe0ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease-in-out;
    }
    .claim-nstp-page .positive {
        color: #2e7d32;
        font-weight: 500;
    }
    .claim-nstp-page .negative {
        color: #c62828;
        font-weight: 500;
    }
    .claim-nstp-page .neutral {
        color: #455a64;
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
        display: none; /* This hides CSAT button on mobile */
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
      .endorsement-btn {
        display: none; /* Hide endorsement button for mobile users */
      }
      .manual-vi-btn-fixed { /* Adjust for mobile */
        top: 10px; /* Back to top for mobile */
        left: 50%;
        transform: translateX(-50%);
      }
      /* New button for Claim Count & NSTP on mobile */
      .claim-nstp-btn-fixed {
        display: none; /* Hide for mobile as CSAT is also hidden */
      }
      .endorsement-container {
        width: 90vw;
        padding: 15px;
      }
      .endorsement-container h1 {
        font-size: 1.5em;
      }
      .PB_DROPDOWN {
        font-size: 0.9em;
        height: 36px; /* Adjusted for mobile */
      }
      .output {
        font-size: 0.95em;
      }
      .created-by {
        font-size: 0.7em;
      }
      .manual-vi-page {
        padding-top: 20px; /* Consistent padding for mobile */
      }
      .manual-vi-page .card {
        margin-top: 10px; /* Consistent margin for mobile */
      }
      .claim-nstp-page {
        padding-top: 20px; /* Adjusted padding-top for mobile - removed space for fixed button */
      }
      /* Removed .claim-nstp-page .back-to-home-btn styles for mobile as button is removed */
      .claim-nstp-page table {
        margin-top: 10px;
      }
    }
  </style>
</head>
<body>
  <button class="csat-btn" onclick="openCSATModal()">CSAT Calculator</button>

  <button class="claim-nstp-btn-fixed" onclick="openClaimNSTPPage()">Claim_Count & NSTP</button>

  <button class="endorsement-btn" onclick="openEndorsementPage()">ENDORSEMENT</button>

  <button class="manual-vi-btn-fixed" onclick="openManualVIPage()">MANUAL-VI</button>

  <h2 id="mainHeader"></h2> <!-- 📷SHIVANG टेक्स्ट को हटा दिया गया है -->
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
      <div class="button-group"> <!-- Added button-group div -->
        <button class="close-btn" onclick="closeCSATModal()">Close</button>
        <button class="calculate-btn" id="calculateButton" onclick="calculateCSAT()">Calculate</button>
      </div>
    </div>
  </div>

  <div class="endorsement-page" id="endorsementPage">
    <div class="endorsement-container">
      <h1>ENDORSEMENT</h1>
      <div class="created-by">Created by Shivang</div>
      <button class="back-btn" onclick="closeEndorsementPage()">Back to Main Page</button>
      <label for="insurer">Select Insurance Company:</label>
      <select id="insurer" class="PB_DROPDOWN">
        <option disabled selected>Select Insurer</option>
      </select>
      <label for="requirement">Select Requirement:</label>
      <select id="requirement" class="PB_DROPDOWN" disabled>
        <option disabled selected>Select Requirement</option>
      </select>
      <div id="output" class="output"></div>
    </div>
  </div>

  <div class="manual-vi-page" id="manualVIPage">
    <div class="card mt-4">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        </div>
      <div class="card-body">
        <div class="mb-3 p-3 rounded" style="background-color: #e3f2fd;">
          <strong>ADP Home Visit Cities: 42</strong>
          <ul class="mb-0" style="columns: 2;">
            <li>Aligarh</li><li>Alwar</li><li>Ambala</li><li>Amritsar</li><li>Belgaum</li>
            <li>Bhiwani</li><li>Bhubaneshwar</li><li>Bilaspur</li><li>Coimbatore</li><li>Dhanbad</li>
            <li>Guwahati</li><li>Haldwani</li><li>Haridwar</li><li>Indore</li><li>Jalandhar</li>
            <li>Jamshedpur</li><li>Jhajjar</li><li>Jhansi</li><li>Jind</li><li>Jodhpur</li>
            <li>Kangra</li><li>Madurai</li><li>Mathura</li><li>Moradabad</li><li>Muzaffarnagar</li>
            <li>Mysore</li><li>Nagpur</li><li>Panipat</li><li>Pondicherry</li><li>Raipur</li>
            <li>Rajkot</li><li>Rewa</li><li>Rewari</li><li>Rohtak</li><li>Satara</li>
            <li>Shimla</li><li>Surat</li><li>Thiruvananthapuram</li><li>Thrissur</li><li>Udaipur</li>
            <li>Varanasi</li><li>Yamuna Nagar</li>
          </ul>
        </div>
        <div class="mb-3 p-3 rounded" style="background-color: #d0f0c0;">
          <strong>Manual Home Visit Cities: 14</strong>
          <ul class="mb-0" style="columns: 2;">
            <li>Ahmedabad</li><li>Bangalore</li><li>Chennai</li><li>Delhi</li><li>Faridabad</li>
            <li>Ghaziabad</li><li>Gurgaon</li><li>Hyderabad</li><li>Kolkata</li><li>Mumbai</li>
            <li>Noida & Greater Noida</li><li>Patna</li><li>Pune</li><li>Thane & Navi Mumbai</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="claim-nstp-page" id="claimNSTPPage">
    <h2 class="text-4xl font-bold text-center mb-6 text-indigo-800 tracking-tight">Claim Count & NSTP Details</h2>
    <div class="created-by">Created by Shivang</div>
    <div class="container mx-auto p-4 bg-white rounded-2xl shadow-2xl max-w-7xl w-full border-4 border-transparent bg-clip-border bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div class="mb-4">
            <input type="text" id="claimNstpSearchInput" placeholder="Search by Insurer Name..." class="search-input w-full p-3 text-lg border-2 border-blue-500 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500 bg-blue-50 text-gray-800 placeholder-gray-500">
        </div>
        <div class="overflow-x-auto rounded-lg" id="claimNstpTableContainer">
            <table id="claimNstpTable" class="w-full bg-white border border-gray-300">
                <thead class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-semibold">
                    <tr>
                        <th class="table-header p-2 text-left" data-column="insurer_name">Insurer Name</th>
                        <th class="table-header p-2 text-left" data-column="zd_claims_year">ZD Claims/Year</th>
                        <th class="table-header p-2 text-left" data-column="non_zd_claims_year">Non-ZD Claims/Year</th>
                        <th class="table-header p-2 text-left" data-column="commercial">Commercial</th>
                        <th class="table-header p-2 text-left" data-column="video_approval">Video Approval</th>
                        <th class="table-header p-2 text-left" data-column="video_tat">Video TAT</th>
                        <th class="table-header p-2 text-left" data-column="short_partial">Short Partial</th>
                        <th class="table-header p-2 text-left" data-column="artificial_low_lighting">Artificial Low Lighting</th>
                        <th class="table-header p-2 text-left" data-column="scar_declaration">Scar Declaration</th>
                        <th class="table-header p-2 text-left" data-column="brand_new_3_3">Brand New 3+3</th>
                        <th class="table-header p-2 text-left" data-column="old_3_3">Old 3+3</th>
                    </tr>
                </thead>
                <tbody id="claimNstpTableBody" class="text-gray-800 text-base">
                    <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
        </div>
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
        alert(" कृपया एक टैग डालें।");
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
        document.querySelector('.endorsement-container').classList.add('active');
      }, 10);
      document.getElementById('mainHeader').style.display = 'none';
      document.querySelector('.upload-section').style.display = 'none';
      document.querySelector('h3').style.display = 'none';
      document.getElementById('gallery').style.display = 'none';
      document.querySelector('.csat-btn').style.display = 'none';
      document.querySelector('.endorsement-btn').style.display = 'none';
      document.querySelector('.manual-vi-btn-fixed').style.display = 'none';
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'none'; /* Added to hide new button */
    };

    window.closeEndorsementPage = function() {
      document.getElementById('endorsementPage').style.display = 'none';
      document.querySelector('.endorsement-container').classList.remove('active');
      document.getElementById('mainHeader').style.display = 'block';
      document.querySelector('.upload-section').style.display = 'block';
      document.querySelector('h3').style.display = 'block';
      document.getElementById('gallery').style.display = 'grid';
      document.querySelector('.csat-btn').style.display = 'block';
      document.querySelector('.endorsement-btn').style.display = 'block';
      document.querySelector('.manual-vi-btn-fixed').style.display = 'block';
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'block'; /* Added to show new button */
    };

    // Close ENDORSEMENT Page on Outside Click
    document.getElementById('endorsementPage').addEventListener('click', function(event) {
      if (event.target === this) {
        closeEndorsementPage();
      }
    });

    // MANUAL-VI Full-Page Functionality
    window.openManualVIPage = function() {
      document.getElementById('manualVIPage').style.display = 'block'; /* Show the manual VI page */
      document.getElementById('mainHeader').style.display = 'none'; /* Hide main header */
      document.querySelector('.upload-section').style.display = 'none'; /* Hide upload section */
      document.querySelector('h3').style.display = 'none'; /* Hide "Uploaded Images" header */
      document.getElementById('gallery').style.display = 'none'; /* Hide gallery */
      document.querySelector('.csat-btn').style.display = 'none'; /* Hide CSAT button */
      document.querySelector('.endorsement-btn').style.display = 'none'; /* Hide ENDORSEMENT button */
      document.querySelector('.manual-vi-btn-fixed').style.display = 'none'; /* Hide the MANUAL-VI button itself */
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'none'; /* Added to hide new button */
    };

    window.closeManualVIPage = function() {
      document.getElementById('manualVIPage').style.display = 'none'; /* Hide the manual VI page */
      document.getElementById('mainHeader').style.display = 'block'; /* Show main header */
      document.querySelector('.upload-section').style.display = 'block'; /* Show upload section */
      document.querySelector('h3').style.display = 'block'; /* Show "Uploaded Images" header */
      document.getElementById('gallery').style.display = 'grid'; /* Show gallery */
      document.querySelector('.csat-btn').style.display = 'block'; /* Show CSAT button */
      document.querySelector('.endorsement-btn').style.display = 'block'; /* Show ENDORSEMENT button */
      document.querySelector('.manual-vi-btn-fixed').style.display = 'block'; /* Show the MANUAL-VI button itself */
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'block'; /* Added to show new button */
    };

    // Close Manual VI Page on Outside Click (optional, but good for consistency)
    document.getElementById('manualVIPage').addEventListener('click', function(event) {
      if (event.target === this) {
        closeManualVIPage();
      }
    });

    // Data for the Claim Count & NSTP table
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
      {
          "insurer_name": "New India Assurance",
          "commercial": "Yes",
          "video_approval": "At PB end",
          "video_tat": "24 Hours",
          "short_partial": "Yes",
          "artificial_low_lighting": "No",
          "scar_declaration": "Declaration Required within Video TAT",
          "zd_claims_year": "2",
          "non_zd_claims_year": "Unlimited",
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
          "zd_claims_year": "2",
          "non_zd_claims_year": "Unlimited",
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
          "zd_claims_year": "2",
          "non_zd_claims_year": "Unlimited",
          "brand_new_3_3": "Yes",
          "old_3_3": "Yes"
      },
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
          "zd_claims_year": "2",
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
          "non_zd_claims_year": "Unlimited",
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
          "zd_claims_year": "Unlimited",
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
          "non_zd_claims_year": "Unlimited till IDV",
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
          "zd_claims_year": "2",
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
          "non_zd_claims_year": "Unlimited till IDV",
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
          "zd_claims_year": "Unlimited till IDV",
          "non_zd_claims_year": "Unlimited till IDV",
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
          "zd_claims_year": "Unlimited till IDV",
          "non_zd_claims_year": "Unlimited till IDV",
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
          "zd_claims_year": "1 or 2 claims (as per selected plan)",
          "non_zd_claims_year": "Unlimited till IDV",
          "brand_new_3_3": "Yes",
          "old_3_3": "Yes"
      }
    ];

    // Function to populate the Claim Count & NSTP table
    function populateClaimNSTPTable(data) {
        const tableBody = document.getElementById('claimNstpTableBody');
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'table-row';
            row.innerHTML = `
                <td class="p-2 font-medium text-indigo-900">${item.insurer_name}</td>
                <td class="p-2 neutral">${item.zd_claims_year}</td>
                <td class="p-2 neutral">${item.non_zd_claims_year}</td>
                <td class="p-2 ${item.commercial === 'Yes' ? 'positive' : 'negative'}">${item.commercial}</td>
                <td class="p-2 neutral">${item.video_approval}</td>
                <td class="p-2 neutral">${item.video_tat}</td>
                <td class="p-2 ${item.short_partial === 'Yes' ? 'positive' : 'negative'}">${item.short_partial}</td>
                <td class="p-2 ${item.artificial_low_lighting === 'Yes' ? 'positive' : 'negative'}">${item.artificial_low_lighting}</td>
                <td class="p-2 neutral">${item.scar_declaration}</td>
                <td class="p-2 ${item.brand_new_3_3 === 'Yes' ? 'positive' : 'negative'}">${item.brand_new_3_3}</td>
                <td class="p-2 ${item.old_3_3 === 'Yes' ? 'positive' : 'negative'}">${item.old_3_3}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Claim Count & NSTP Full-Page Functionality (नया जोड़ा गया)
    window.openClaimNSTPPage = function() {
      document.getElementById('claimNSTPPage').style.display = 'block'; /* Show the new page */
      populateClaimNSTPTable(insuranceData); // Populate the table when the page opens

      // Set up search and sort for Claim NSTP page
      document.getElementById('claimNstpSearchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = insuranceData.filter(item =>
                item.insurer_name.toLowerCase().includes(searchTerm)
            );
            populateClaimNSTPTable(filteredData);
        });

      document.querySelectorAll('#claimNstpTable .table-header').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                const currentOrder = header.classList.contains('sort-asc') ? 'desc' : 'asc';

                document.querySelectorAll('#claimNstpTable .table-header').forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                    // h.classList.add('sort-icon'); // You might want to add a default sort icon if needed
                });

                header.classList.remove('sort-icon');
                header.classList.add(currentOrder === 'asc' ? 'sort-asc' : 'sort-desc');

                // Sort the data based on the full insuranceData, then populate
                const sortedData = [...insuranceData].sort((a, b) => {
                    const aValue = String(a[column]).toLowerCase(); // Ensure string conversion
                    const bValue = String(b[column]).toLowerCase(); // Ensure string conversion
                    if (currentOrder === 'asc') {
                        return aValue > bValue ? 1 : -1;
                    } else {
                        return aValue < bValue ? 1 : -1;
                    }
                });
                populateClaimNSTPTable(sortedData);
            });
        });

      document.getElementById('mainHeader').style.display = 'none'; /* Hide main header */
      document.querySelector('.upload-section').style.display = 'none'; /* Hide upload section */
      document.querySelector('h3').style.display = 'none'; /* Hide "Uploaded Images" header */
      document.getElementById('gallery').style.display = 'none'; /* Hide gallery */
      document.querySelector('.csat-btn').style.display = 'none'; /* Hide CSAT button */
      document.querySelector('.endorsement-btn').style.display = 'none'; /* Hide ENDORSEMENT button */
      document.querySelector('.manual-vi-btn-fixed').style.display = 'none'; /* Hide Manual VI button */
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'none'; /* Hide itself */
    };

    window.closeClaimNSTPPage = function() {
      document.getElementById('claimNSTPPage').style.display = 'none'; /* Hide the new page */
      document.getElementById('mainHeader').style.display = 'block'; /* Show main header */
      document.querySelector('.upload-section').style.display = 'block'; /* Show upload section */
      document.querySelector('h3').style.display = 'block'; /* Show "Uploaded Images" header */
      document.getElementById('gallery').style.display = 'grid'; /* Show gallery */
      document.querySelector('.csat-btn').style.display = 'block'; /* Show CSAT button */
      document.querySelector('.endorsement-btn').style.display = 'block'; /* Show ENDORSEMENT button */
      document.querySelector('.manual-vi-btn-fixed').style.display = 'block'; /* Show Manual VI button */
      document.querySelector('.claim-nstp-btn-fixed').style.display = 'block'; /* Show itself */
    };

    // नया लॉजिक: सेक्शन के बाहर क्लिक करने पर मुख्य पेज पर वापसी
    document.getElementById('claimNSTPPage').addEventListener('click', function(event) {
      const container = document.querySelector('#claimNSTPPage .container');
      if (container && !container.contains(event.target)) {
        closeClaimNSTPPage();
      }
    });

    // नया लॉजिक: कीबोर्ड ऐरो की (arrow keys) से साइड स्क्रॉल
    document.addEventListener('keydown', function(event) {
      const claimNstpPage = document.getElementById('claimNSTPPage');
      if (claimNstpPage.style.display === 'block') { // Only scroll if claimNstpPage is visible
        const tableContainer = document.getElementById('claimNstpTableContainer');
        if (event.key === 'ArrowRight') {
          tableContainer.scrollLeft += 100; // Scroll 100px to the right
        } else if (event.key === 'ArrowLeft') {
          tableContainer.scrollLeft -= 100; // Scroll 100px to the left
        }
      }
    });


    const insurerDropdown = document.querySelector('.endorsement-page #insurer');
    const requirementDropdown = document.querySelector('.endorsement-page #requirement');
    const outputBox = document.querySelector('.endorsement-page #output');

    // Empty array for you to manually add JSON data
    const data = [{
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
    "Any Exception": "",
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
    "Inspection": "",
    "Any Exception": "",
    "Declaration format (if declaration required)": ""
  },
  {
    "InsurerRequirement": "New India AssurancePost Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
    "Insurer": "New India Assurance",
    "Requirement": "Post Issuance Cancellation (Multiple Mismatch - Reg no, chassis no & Engine no mismatch",
    "Endorsement type": "NA",
    "Documents or any other requirement": "RC, KYC, Bank Statement with Payee name & Alternate Policy",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Deduction",
    "Inspection": "",
    "Any Exception": "",
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
    "Documents or any other requirement": "RC, DL, Nominee Details",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "Correction possible before policy start date",
    "Declaration format (if declaration required)": ""
  },
  {
    "InsurerRequirement": "DigitPaid Driver",
    "Insurer": "Digit",
    "Requirement": "Paid Driver",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "RC, Salary slip of last 3 months, DL of the driver",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "Correction possible before policy start date",
    "Declaration format (if declaration required)": ""
  },
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
    "Endorsement type": "Not Possible",
    "Documents or any other requirement": "Not Possible",
    "TAT": "Not Possible",
    "Charges / Deduction": "Not Possible",
    "Inspection": "Not Possible",
    "Any Exception": "",
    "Declaration format (if declaration required)": ""
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
    "Endorsement type": "",
    "Documents or any other requirement": "Alternate Policy",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "",
    "Any Exception": "For Ticketing Associates: Raise cancellation to insurer & meanwhile XML Sheet to tech",
    "Declaration format (if declaration required)": ""
  },
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
    "Insurer": "ICICI",
    "Requirement": "Multiple Mismatch (Reg no, chassis no & Engine no mismatch)",
    "Endorsement type": "Non Financial Endt",
    "Documents or any other requirement": "Reg. date and MMV needs to be correct, then only correction is possible - RC PYP & Aadhaar and Pan required or else cancellation (RC, Alternate, Aadhaar and Pan required for cancellation)",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "No",
    "Inspection": "No",
    "Any Exception": "Customer request for endorsement mandatory - Please ask the customer to share written consent",
    "Declaration format (if declaration required)": null
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
    "Insurer": "ICICI",
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
  },
  {
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
    "Insurer": "Magma",
    "Requirement": "Post Issuance Cancellation",
    "Endorsement type": null,
    "Documents or any other requirement": "Alternate Policy, KYC",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Deduction",
    "Inspection": null,
    "Any Exception": null,
    "Declaration format (if declaration required)": null
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
    "Insurer": "Oriental",
    "Requirement": "NCB Certificate",
    "Endorsement type": "Financial Endt",
    "Documents or any other requirement": "Sale Letter and PYP",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Yes",
    "Inspection": "No",
    "Any Exception": "Charges would not be required incase policy has expired",
    "Declaration format (if declaration required)": null
  },
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
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Remove",
    "Endorsement type": "Non Financial Endt",
    "Documents or any other requirement": "Bank NOC",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "No",
    "Inspection": "No",
    "Any Exception": null,
    "Declaration format (if declaration required)": null
  },
  {
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Add",
    "Endorsement type": "Nil Endt",
    "Documents or any other requirement": "Updated RC  or Loan Sanction letter",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "No",
    "Inspection": "No",
    "Any Exception": null,
    "Declaration format (if declaration required)": null
  },
  {
    "Insurer": "Reliance",
    "Requirement": "Hypothecation Change",
    "Endorsement type": "Self Endt",
    "Documents or any other requirement": "RC and Previous Bank NOC",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "No",
    "Inspection": "No",
    "Any Exception": null,
    "Declaration format (if declaration required)": null
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
    "Endorsement type": "Not Possible",
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
    "Endorsement type": "Non Financial Endt",
    "Documents or any other requirement": "Aadhaar and Pan Card with GST Certificate in the name of Insured",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "No",
    "Inspection": "No",
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
    "Endorsement type": null,
    "Documents or any other requirement": "Alternate Policy, KYC - Pan Card and Unmasked Aadhar card",
    "TAT": "SRS / 10 Days",
    "Charges / Deduction": "Deduction",
    "Inspection": null,
    "Any Exception": "For ticketing associates: Feedfile required while raising the endorsement if Policy number starts with 52 series",
    "Declaration format (if declaration required)": null
  },
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
];

    // Populate insurer dropdown
    try {
      const insurers = [...new Set(data.map(d => d["Insurer"]))].sort();
      insurers.forEach(ins => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = ins;
        insurerDropdown.appendChild(opt);
      });
    } catch (error) {
      console.error("Error populating insurers:", error);
      alert("Error in JSON data. Please check the syntax and paste valid JSON.");
    }

    // Handle insurer selection
    insurerDropdown.addEventListener("change", () => {
      requirementDropdown.innerHTML = "<option disabled selected>Select Requirement</option>";
      outputBox.style.display = "none";
      outputBox.classList.remove("show", "output-red");
      const selectedInsurer = insurerDropdown.value;
      const requirements = [...new Set(
        data.filter(d => d["Insurer"] === selectedInsurer)
            .map(d => d["Requirement"])
      )].sort();
      requirements.forEach(req => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = req;
        requirementDropdown.appendChild(opt);
      });
      requirementDropdown.disabled = false;
    });

    // Handle requirement selection
    requirementDropdown.addEventListener("change", () => {
      const ins = insurerDropdown.value;
      const req = requirementDropdown.value;
      const record = data.find(
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

  </script>
</body>
</html>
