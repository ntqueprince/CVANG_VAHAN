<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>SHIVANG</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS CDN for Insurance Comparison Dashboard styles -->
<script src="https://cdn.tailwindcss.com"></script>
<style>
    /* * IMPORTANT: All existing styles from the user's provided structure.html are preserved.
     * ONLY new styles required for the "UPDATES" button and modal are added below this line.
     */
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
    /* Styles for Download Button (updated to match previous download-btn styles) */
    .download-btn {
      background-color: #ff5722;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 5px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: inline-block;
      text-decoration: none;
      white-space: nowrap;
      z-index: 2;
      position: relative;
      min-width: 100px;
      text-align: center;
    }

    /* ✅ Extra support for small screen (mobile) */
    @media (max-width: 600px) {
      .download-btn {
        font-size: 16px;
        padding: 10px 20px;
        min-width: 110px;
        text-align: center;
      }
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
    /* Button container for "Close" and "Calculate" */
    .csat-modal-content .button-container {
      display: flex;
      justify-content: center; /* Center buttons horizontally */
      gap: 15px; /* Space between buttons */
      margin-top: 20px; /* Space from content above */
      flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
    }
    .csat-modal-content .button-container button {
      flex: 1; /* Allow buttons to grow and shrink */
      max-width: 150px; /* Limit individual button width */
      margin: 0; /* Remove individual button margins handled by gap */
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
      /* margin-left: 10px; Removed, as gap handles spacing */
    }
    .csat-modal-content .calculate-btn:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    /* Fixed Buttons */
    .csat-btn, .endorsement-btn, .manual-vi-btn-fixed, .claim-count-nstp-btn-fixed, .inspection-waiver-btn-fixed, .rsa-contact-btn-fixed {
      position: fixed;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      font-size: 0.9em;
      /* Default visibility for larger screens */
      display: block;
    }

    .csat-btn {
      top: 10px;
      left: 10px;
      background-color: #1b5e20; /* Keep CSAT button green */
    }
    .csat-btn:hover {
      background-color: #2e7d32;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    .endorsement-btn {
      top: 10px;
      right: 10px;
      background-color: #1b5e20; /* Keep ENDORSEMENT button green */
    }
    .endorsement-btn:hover {
      background-color: #2e7d32;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    .manual-vi-btn-fixed {
        top: 60px; /* Positioned just below endorsement button */
        right: 10px; /* Aligned with endorsement button */
        background-color: #3f51b5; /* Blue as per original manual button */
    }

    .manual-vi-btn-fixed:hover {
      background-color: #303f9f;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    .claim-count-nstp-btn-fixed {
        top: 60px; /* Positioned just below CSAT button */
        left: 10px; /* Aligned with CSAT button */
        background-color: #3f51b5; /* Blue color, matching Manual VI */
    }
    .claim-count-nstp-btn-fixed:hover {
        background-color: #303f9f;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
    
    /* New Inspection Waiver Button */
    .inspection-waiver-btn-fixed {
        top: 110px; /* Positioned below Claim Count & NSTP button */
        left: 10px; /* Aligned with CSAT and Claim Count buttons */
        background-color: #ff9800; /* Light Orange */
    }
    .inspection-waiver-btn-fixed:hover {
        background-color: #fb8c00; /* Darker orange on hover */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    /* New RSA & Contact Button */
    .rsa-contact-btn-fixed {
        top: 110px; /* Positioned below Manual VI & Claim Coverage button */
        right: 10px; /* Aligned with Manual VI & Claim Coverage button */
        background-color: #ff9800; /* Light Orange, same as Inspection Waiver */
    }
    .rsa-contact-btn-fixed:hover {
        background-color: #fb8c00; /* Darker orange on hover */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    /* ENDORSEMENT Full-Page Widget Styles */
    .endorsement-page {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      z-index: 1000;
      padding: 0; /* Removed padding to make it truly full-page */
      margin: 0; /* Ensure no margins */
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
      overflow-y: auto; /* Make content scrollable */
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
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
      overflow-y: auto; /* Make content scrollable */
    }
    .manual-vi-page .back-to-home-btn {
      /* This button is removed as per user request, keeping styles here for reference if needed */
      display: none;
    }
    .manual-vi-page .card {
        margin-top: 100px; /* Increased margin to prevent overlap with the button */
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
      padding-top: 20px; /* Add padding to the top of the list */
    }
    /* Styles for Claim Coverage Overlay */
    .claim-coverage-overlay {
      display: none; /* Hidden by default */
      position: absolute; /* Position relative to .manual-vi-page */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95); /* Semi-transparent white background */
      z-index: 1001; /* Above other content in manual-vi-page */
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      text-align: left; /* Align text to the left within the overlay */
      overflow-y: auto;
    }

    .claim-coverage-content {
      background-color: #f0f8ff; /* Light blue background for content */
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      max-width: 500px; /* Max width for readability */
      width: 100%;
      border: 2px solid #5c6bc0; /* Blue border */
    }

    .claim-coverage-content h4 {
      color: #1a237e;
      font-size: 1.8em;
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
    }

    .claim-coverage-content ul {
      list-style-type: disc;
      padding-left: 25px;
      color: #37474f;
      line-height: 1.8;
      font-size: 1.1em;
    }

    .claim-coverage-content ul li strong {
      color: #3f51b5; /* Blue for strong text */
    }

    /* Green color for Claim Coverage button */
    .claim-coverage-btn-green {
        background-color: #4CAF50; /* Green */
    }
    .claim-coverage-btn-green:hover {
        background-color: #45a049; /* Darker green on hover */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    /* Styles for Claim_Count & NSTP Page (Insurance Comparison Dashboard) */
    .claim-count-nstp-page {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto; /* Make content scrollable */
      font-family: 'Poppins', sans-serif; /* Use Poppins font for consistency */
    }
    /* Styles from index (4).html adjusted for integration */
    .claim-count-nstp-page .table-header {
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        /* Changed to dark grey background with white text for better visibility */
        background-color: #2d3748; /* Dark grey */
        color: white; /* White text */
    }
    .claim-count-nstp-page .table-header:hover {
        background-color: #4a5568; /* Slightly lighter grey on hover */
        transform: scale(1.03); /* Reduced scale for subtler effect */
    }
    .claim-count-nstp-page .sort-icon::after {
        content: '↕';
        margin-left: 5px;
        display: inline-block;
        color: white; /* Ensure icon is white */
    }
    .claim-count-nstp-page .sort-asc::after {
        content: '↑';
        color: white; /* Ensure icon is white */
    }
    .claim-count-nstp-page .sort-desc::after {
        content: '↓';
        color: white; /* Ensure icon is white */
    }
    .claim-count-nstp-page .table-row {
        transition: background-color 0.3s;
    }
    .claim-count-nstp-page .table-row:hover {
        background-color: #fefcbf;
    }
    .claim-count-nstp-page .search-input {
        transition: all 0.3s;
    }
    .claim-count-nstp-page .search-input:focus {
        border-color: #db2777;
        box-shadow: 0 0 10px rgba(219, 39, 119, 0.5);
    }
    .claim-count-nstp-page td, .claim-count-nstp-page th {
        white-space: normal !important;
        word-break: break-words !important;
    }
    .claim-count-nstp-page .table-row:nth-child(odd) {
        background-color: #e0f7fa; /* Light blue for odd rows */
    }
    .claim-count-nstp-page .table-row:nth-child(even) {
        background-color: #fce4ec; /* Light pink for even rows */
    }
    .claim-count-nstp-page .table-row:hover {
        background-color: #fff9c4 !important; /* Bright yellow on hover */
    }
    
    /* Styles for Inspection Waiver Page */
    .inspection-waiver-page {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      font-family: 'Poppins', sans-serif;
      text-align: center;
    }
    .inspection-waiver-container {
      max-width: 700px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border: 3px solid #ff9800; /* Orange border */
      position: relative;
      animation: slideInFromTop 0.5s ease-out;
    }
    @keyframes slideInFromTop {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .inspection-waiver-container h1 {
      color: #e65100; /* Darker orange for title */
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 15px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    .inspection-waiver-container .created-by {
      font-size: 0.7em;
      color: #616161;
      margin-bottom: 20px;
      background: none; /* Remove gradient from global .created-by */
      -webkit-background-clip: unset;
      background-clip: unset;
      color: #616161; /* Specific color for this section */
      text-align: center;
      animation: none; /* Remove animation from global .created-by */
    }
    .inspection-waiver-table-container {
      margin-top: 20px;
      overflow-x: auto;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .inspection-waiver-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background-color: #fff;
      border-radius: 15px;
      overflow: hidden; /* Ensures rounded corners apply to content */
    }
    .inspection-waiver-table th, .inspection-waiver-table td {
      padding: 15px;
      border-bottom: 1px solid #f0f0f0;
      text-align: left;
      font-size: 1em;
    }
    .inspection-waiver-table th {
      background-color: #ffcc80; /* Lighter orange for header */
      color: #8d4000; /* Dark orange text */
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .inspection-waiver-table tbody tr:nth-child(odd) {
      background-color: #fff3e0; /* Very light orange for odd rows */
    }
    .inspection-waiver-table tbody tr:nth-child(even) {
      background-color: #ffe0b2; /* Slightly darker light orange for even rows */
    }
    .inspection-waiver-table tbody tr:hover {
      background-color: #ffd54f; /* Yellowish orange on hover */
      transition: background-color 0.2s ease;
    }
    .inspection-waiver-table td:first-child {
      font-weight: 500;
      color: #e65100; /* Insurer Name in dark orange */
    }
    .policy-waiver-column {
        color: #37474f; /* Default text color */
    }
    .policy-waiver-column.no-waiver {
        color: #d32f2f; /* Red for "No Waiver" */
        font-weight: 600;
    }
    .policy-waiver-column.days-waiver {
        color: #1b5e20; /* Green for waiver with days */
        font-weight: 600;
    }

    /* Styles for RSA & Contact Page */
    .rsa-contact-page {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      font-family: 'Poppins', sans-serif;
      text-align: center;
    }
    .rsa-contact-container {
      max-width: 900px; /* Wider for more content */
      margin: 20px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border: 3px solid #ff9800; /* Orange border, same as inspection waiver */
      position: relative;
      animation: slideInFromTop 0.5s ease-out;
    }
    .rsa-contact-container h1 {
      color: #e65100; /* Darker orange for title, same as inspection waiver */
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 15px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    .rsa-contact-container .created-by {
      font-size: 0.7em;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #ff9800, #ff5722); /* Orange gradient for text */
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent; /* Makes the gradient visible */
      animation: fadeIn 1.5s ease-in-out;
    }
    .rsa-contact-table-container {
      margin-top: 20px;
      overflow-x: auto;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .rsa-contact-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background-color: #fff;
      border-radius: 15px;
      overflow: hidden;
    }
    .rsa-contact-table th, .rsa-contact-table td {
      padding: 12px 15px; /* Slightly less padding for more content */
      border-bottom: 1px solid #f0f0f0;
      text-align: left;
      font-size: 0.95em;
    }
    .rsa-contact-table th {
      background-color: #ffcc80; /* Lighter orange for header */
      color: #8d4000; /* Dark orange text */
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .rsa-contact-table tbody tr:nth-child(odd) {
      background-color: #fff3e0; /* Very light orange for odd rows */
    }
    .rsa-contact-table tbody tr:nth-child(even) {
      background-color: #ffe0b2; /* Slightly darker light orange for even rows */
    }
    .rsa-contact-table tbody tr:hover {
      background-color: #ffd54f; /* Yellowish orange on hover */
      transition: background-color 0.2s ease;
    }
    .rsa-contact-table td:first-child {
      font-weight: 500;
      color: #e65100; /* Insurer Name in dark orange */
    }
    .rsa-contact-table td {
        white-space: normal; /* Allow text to wrap */
        word-break: break-word;
    }


    @media (max-width: 600px) {
      /* Hide all fixed buttons on main page view for mobile */
      .csat-btn,
      .endorsement-btn,
      .manual-vi-btn-fixed,
      .claim-count-nstp-btn-fixed,
      .inspection-waiver-btn-fixed,
      .rsa-contact-btn-fixed { /* New button added here */
        display: none;
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
      /* Ensure the mobile page content has enough margin to clear any top elements */
      .manual-vi-page .card, .claim-count-nstp-page .container, .inspection-waiver-page .inspection-waiver-container, .rsa-contact-page .rsa-contact-container {
        margin-top: 60px; /* Adjusted for mobile to account for back buttons */
      }
      .claim-count-nstp-page h1, .inspection-waiver-page h1, .rsa-contact-page h1 {
        font-size: 1.8em; /* Adjust font size for mobile view */
      }
      /* Ensure back buttons within active full-page sections are visible on mobile */
      .endorsement-page .back-btn,
      .manual-vi-page .back-btn, /* This is the "Back to Main Page" button */
      .manual-vi-page .claim-coverage-btn, /* New button for Claim Coverage */
      .claim-count-nstp-page .back-btn,
      .inspection-waiver-page .back-btn,
      .rsa-contact-page .back-btn { /* New button for RSA Contact */
        display: block; /* Make sure these buttons are visible within their pages on mobile */
        position: absolute; /* Changed to absolute to be relative to the page div */
        top: 20px;
        left: 20px;
        z-index: 1001; /* Ensure it's above other content */
      }
      /* Adjust position for the new Claim Coverage button on mobile */
      .manual-vi-page .claim-coverage-btn {
        top: 60px; /* Position below Back to Main Page button */
      }
      /* Adjust position for the new Inspection Waiver button on mobile */
      /* No specific adjustment needed here, general .back-btn styles should apply */

      /* On mobile, when the claim coverage overlay is active, the regular card should be hidden */
      .manual-vi-page.claim-coverage-active .card {
          display: none;
      }
    }

    /* --- NEW STYLES FOR UPDATES BUTTON AND MODAL --- */
    /* These styles are added to blend with the existing design */
    #companyUpdatesButton {
        background-color: #28a745; /* Matching the 'Aaj Ki Baat' green */
        color: white;
        padding: 10px 25px;
        border: none;
        border-radius: 8px;
        font-size: 1.5em;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        text-decoration: none;
        display: flex; /* Changed from inline-block to flex */
        flex-direction: column; /* Stack text and snippet */
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        position: relative; /* For the new update indicator */
        width: 80%; /* Match existing input/button width */
        max-width: 300px; /* Match existing input/button max-width */
        margin-left: auto; /* Center the button */
        margin-right: auto; /* Center the button */
        overflow: hidden; /* Hide anything overflowing, especially for snippet */
    }

    #companyUpdatesButton:hover {
        background-color: #218838; /* Darker green on hover */
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    }

    #latestUpdateSnippet {
        font-size: 0.6em; /* Smaller font for snippet */
        color: rgba(255, 255, 255, 0.8); /* Slightly faded white for readability */
        margin-top: 5px;
        text-align: center;
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
    }

    #newUpdateIndicator {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 12px;
        height: 12px;
        background-color: #ffc107; /* Yellow for "New" highlight */
        border-radius: 50%;
        display: none; /* Hidden by default */
        box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
        100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
    }

    /* Modal Overlay (for updates section) */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent dark overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    /* Modal Content */
    .modal-content {
        background-color: white;
        padding: 25px;
        border-radius: 15px; /* Matching other modals */
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 600px; /* Adjusted max-width for better readability of updates */
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        border: 2px solid #3f51b5; /* Matching other modals' border color */
        animation: fadeInScale 0.3s ease-out;
    }

    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }

    .modal-content h2 {
        color: #1a237e; /* Matching existing h2 color */
        font-weight: 600;
        font-size: 1.8em; /* Adjusted for modal h2 */
        margin-top: 0;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        text-align: center; /* Center align title */
    }

    .modal-close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 1.8em;
        cursor: pointer;
        color: #888;
        transition: color 0.2s;
    }

    .modal-close-button:hover {
        color: #333;
    }

    /* Accordion Styles for Updates */
    .accordion-item {
        border: 1px solid #b0bec5; /* Matching input/button border */
        border-radius: 8px; /* Matching input/button border-radius */
        margin-bottom: 10px;
        overflow: hidden;
    }

    .accordion-header {
        background-color: #eceff1; /* Light grey, blending with progress bar / modal inputs */
        color: #37474f; /* Matching tag/label color */
        padding: 12px 15px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500; /* Matching existing font-weights */
        font-size: 1.1em;
        transition: background-color 0.2s;
    }

    .accordion-header:hover {
        background-color: #cfd8dc; /* Slightly darker grey on hover */
    }

    .accordion-header::after {
        content: '+';
        font-size: 1.2em;
        transition: transform 0.3s ease;
    }

    .accordion-header.active::after {
        content: '-';
        transform: rotate(0deg);
    }

    .accordion-content {
        padding: 0 15px;
        background-color: #f9f9f9; /* Lighter background for content area */
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, padding 0.3s ease-out;
    }

    .accordion-content.active {
        max-height: 500px; /* Sufficient height for updates */
        padding: 15px;
        border-top: 1px solid #e0e0e0;
    }

    .accordion-content ul {
        list-style: none; /* No bullets */
        padding: 0;
        margin: 0;
        text-align: left;
    }

    .accordion-content ul li {
        margin-bottom: 8px;
        line-height: 1.4;
        color: #455a64; /* Matching status text color */
        font-size: 0.95em;
    }

    .accordion-content ul li strong {
        color: #3f51b5; /* Matching button/border blue */
        margin-right: 5px;
    }

    /* Mobile adjustments for the new button and modal */
    @media (max-width: 600px) {
        #companyUpdatesButton {
            font-size: 1.2em;
            padding: 8px 15px;
            width: 90%; /* Adjust width for mobile */
            max-width: none; /* Remove max-width on mobile */
        }
        #latestUpdateSnippet {
            font-size: 0.55em;
        }
        .modal-content {
            padding: 15px;
            max-width: 95%; /* Make modal wider on very small screens */
        }
        .modal-content h2 {
            font-size: 1.4em;
        }
        .accordion-header {
            font-size: 1em;
            padding: 10px;
        }
        .accordion-content ul li {
            font-size: 0.9em;
        }
    }

    /* New styles for the Notebook button */
    #notebookButton {
        background-color: #673ab7; /* Purple color */
        color: white;
        padding: 10px 25px;
        border: none;
        border-radius: 8px;
        font-size: 1.5em;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px; /* Adjust margin to be below UPDATES button */
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        width: 80%;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
    }

    #notebookButton:hover {
        background-color: #512da8; /* Darker purple on hover */
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    }

    @media (max-width: 600px) {
        #notebookButton {
            font-size: 1.2em;
            padding: 8px 15px;
            width: 90%;
            max-width: none;
        }
    }
  
.animated-btn {
  position: relative;
  overflow: hidden;
  padding: 12px 24px;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.animated-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.animated-btn::after {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 200%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s ease;
  z-index: -1;
}
.animated-btn:hover::after {
  left: 100%;
}
</style>
</head>
<body>
<div class="flex flex-wrap gap-4 justify-center p-10 bg-gradient-to-tr from-blue-100 to-purple-100">
<button class="animated-btn bg-gradient-to-r from-blue-500 to-blue-700" onclick="openCSATModal()">CSAT Calculator</button>
<button class="animated-btn bg-gradient-to-r from-green-500 to-green-700" onclick="openEndorsementPage()">ENDORSEMENT</button>
<button class="animated-btn bg-gradient-to-r from-indigo-500 to-indigo-700" onclick="openManualVIPage()">MANUAL-VI &amp; Claim Coverage</button>
<button class="animated-btn bg-gradient-to-r from-indigo-500 to-indigo-700" onclick="openClaimCountNSTPPage()">Claim_Count &amp; NSTP</button>
<button class="animated-btn bg-gradient-to-r from-orange-500 to-orange-700" onclick="openInspectionWaiverPage()">Inspection Waiver</button>
<button class="animated-btn bg-gradient-to-r from-orange-500 to-orange-700" onclick="openRSAPage()">RSA &amp; CONTACT</button>
<button class="animated-btn bg-gradient-to-r from-purple-500 to-purple-700" onclick="window.open('https://ntqueprince.github.io/notebook/', '_blank')">NOTEBOOK</button>
</div>
<!-- Renamed Manual VI button -->
<!-- New button for Claim_Count & NSTP -->
<!-- New button for Inspection Waiver -->
<!-- New button for RSA & Contact -->
<!-- "📷SHIVANG" header ko "Aaj Ki Baat" button se replace kiya gaya hai -->
<!-- REPLACED: Aaj Ki Baat button will now be the UPDATES button -->
<!-- New Notebook button added here -->

<!-- "UPDATES" button moved here, above the upload-section -->
<div id="companyUpdatesButton">
<span>UPDATES</span>
<span id="latestUpdateSnippet"></span>
<span id="newUpdateIndicator"></span>
</div>

<div class="upload-section">
<h2>Upload Images</h2>
<label for="fileUpload">Choose image files to upload:</label>
<input accept="image/*" id="fileUpload" type="file"/>
<input id="tagInput" placeholder="Enter tag (e.g., SHIVANG)" type="text"/>
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
<div class="modal" id="tagModal">
<div class="modal-content">
<h4>Error: Tag is required!</h4>
<input id="modalTagInput" placeholder="Enter tag (e.g., SHIVANG)" type="text"/>
<button class="upload-btn" onclick="submitTag()">Upload</button>
<button class="cancel-btn" onclick="closeModal()">Cancel</button>
<div class="modal-progress-container" id="modalProgressContainer">
<div class="modal-progress-bar">
<div class="modal-progress" id="modalProgress">0%</div>
</div>
</div>
</div>
</div>
<div class="csat-modal" id="csatModal">
<div class="csat-modal-content">
<h4>CSAT Calculator</h4>
<div class="input-section good-section">
<label>Good Count:</label>
<input id="goodCount" min="0" type="number" value="0"/>
</div>
<div class="input-section bad-section">
<label>Bad Count:</label>
<input id="badCount" min="0" type="number" value="0"/>
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
<!-- New button container for alignment -->
<div class="button-container">
<button class="close-btn" onclick="closeCSATModal()">Close</button>
<button class="calculate-btn" id="calculateButton" onclick="calculateCSAT()">Calculate</button>
</div>
</div>
</div>
<div class="modal-overlay" id="updatesModal">
<div class="modal-content">
<span class="modal-close-button" id="closeModalButton">×</span>
<h2>Company Updates</h2>
<div id="updatesContainer">
<!-- Updates will be populated here by JavaScript -->
</div>
</div>
</div>
<div class="endorsement-page" id="endorsementPage">
<div class="endorsement-container">
<h1>ENDORSEMENT</h1>
<div class="created-by">Created by Shivang</div>
<button class="back-btn" onclick="closeEndorsementPage()">Back to Main Page</button>
<label for="insurer">Select Insurance Company:</label>
<select class="PB_DROPDOWN" id="insurer">
<option disabled="" selected="">Select Insurer</option>
</select>
<label for="requirement">Select Requirement:</label>
<select class="PB_DROPDOWN" disabled="" id="requirement">
<option disabled="" selected="">Select Requirement</option>
</select>
<div class="output" id="output"></div>
</div>
</div>
<div class="manual-vi-page" id="manualVIPage">
<button class="back-btn" onclick="closeManualVIPage()">Back to Main Page</button>
<!-- New "Claim Coverage" button with green color -->
<button class="claim-coverage-btn back-btn claim-coverage-btn-green" onclick="toggleClaimCoverage()">Claim Coverage</button>
<div class="card mt-4" id="manualVICardContent">
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
<li>Shimla</li><li>Ludhiana</li><li>Surat</li><li>Thiruvananthapuram</li><li>Thrissur</li><li>Udaipur</li>
<li>Varanasi</li><li>Yamuna Nagar</li>
</ul>
</div>
<div class="mb-3 p-3 rounded" style="background-color: #d0f0c0;">
<strong>Manual Home Visit Cities: 14</strong>
<ul class="mb-0" style="columns: 2;">
<li>Ahmedabad</li><li>Bangalore</li><li>Chennai</li><li>Delhi</li><li>Faridabad</li>
<li>Ghaziabad</li><li>Gurgaon</li><li>Hyderabad</li><li>Kolkata</li><li>Mumbai</li>
<li>Noida &amp; Greater Noida</li><li>Patna</li><li>Pune</li><li>Thane &amp; Navi Mumbai</li>
</ul>
</div>
</div>
</div>
<!-- Claim Coverage Overlay -->
<div class="claim-coverage-overlay" id="claimCoverageOverlay">
<div class="claim-coverage-content">
<h4>Claim Coverage Details</h4>
<ul>
<li><strong>Plastic Nylon Rubber:</strong> 50%</li>
<li><strong>Tyre tube Batteries:</strong> 50%</li>
<li><strong>Denting Painting:</strong> 87.5%</li>
<li><strong>Fiberglass:</strong> 70%</li>
<li><strong>Windshield glass:</strong> 100%</li>
<li><strong>Metal, Wooden fiber and other parts:</strong> As per car age</li>
</ul>
</div>
</div>
</div>
<!-- New Claim_Count & NSTP Section (Insurance Comparison Dashboard) -->
<div class="claim-count-nstp-page" id="claimCountNSTPPage">
<div class="container mx-auto p-4 bg-white rounded-2xl shadow-2xl max-w-7xl w-full border-4 border-transparent bg-clip-border bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" style="margin-top: 20px;">
<h1 class="text-4xl font-bold text-center mb-6 text-indigo-800 tracking-tight">Insurance Comparison Dashboard</h1>
<div class="mb-4">
<input class="search-input w-full p-3 text-lg border-2 border-blue-500 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500 bg-blue-50 text-gray-800 placeholder-gray-500" id="searchInput" placeholder="Search by Insurer Name..." type="text"/>
</div>
<div class="overflow-x-auto rounded-lg">
<table class="w-full bg-white border border-gray-300" id="insuranceTable">
<thead class="bg-gray-900 text-white text-lg font-semibold">
<tr>
<th class="table-header p-2 text-left" data-column="insurer_name">Insurer Name</th>
<!-- Reordered columns: ZD Claims/Year and Non-ZD Claims/Year moved up -->
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
<tbody class="text-gray-800 text-base" id="tableBody">
<!-- Data will be populated by JavaScript -->
</tbody>
</table>
</div>
</div>
<button class="back-btn" onclick="closeClaimCountNSTPPage()">Back to Main Page</button>
</div>
<!-- New Inspection Waiver Page -->
<div class="inspection-waiver-page" id="inspectionWaiverPage">
<div class="inspection-waiver-container">
<h1>Inspection Waiver</h1>
<div class="created-by">Created by Shivang</div>
<div class="inspection-waiver-table-container">
<table class="inspection-waiver-table">
<thead>
<tr>
<th>Insurer Name</th>
<th>Policy Waiver</th>
</tr>
</thead>
<tbody id="inspectionWaiverTableBody">
<!-- Data will be populated by JavaScript -->
</tbody>
</table>
</div>
<button class="back-btn" onclick="closeInspectionWaiverPage()">Back to Main Page</button>
</div>
</div>
<!-- New RSA & Contact Page -->
<div class="rsa-contact-page" id="rsaContactPage">
<div class="rsa-contact-container">
<h1>RSA &amp; CONTACT</h1>
<div class="created-by">Created by Shivang</div>
<div class="mb-4">
<input class="search-input w-full p-3 text-lg border-2 border-purple-500 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500 bg-purple-50 text-gray-800 placeholder-gray-500" id="rsaSearchInput" placeholder="Search by Insurer Name..." type="text"/>
</div>
<div class="rsa-contact-table-container">
<table class="rsa-contact-table">
<thead>
<tr>
<th>Sr.</th>
<th>Insurer Name</th>
<th>RSA and Toll Free Number</th>
<th>Claim No.</th>
</tr>
</thead>
<tbody id="rsaContactTableBody">
<!-- Data will be populated by JavaScript -->
</tbody>
</table>
</div>
<button class="back-btn" onclick="closeRSAPage()">Back to Main Page</button>
</div>
</div>
<script type="module">
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
    const cloudName    = 'dfajanvsi'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'anonymous_upload'; // Replace with your Cloudinary upload preset

    // Global variables
    let selectedFile = null;
    let hasCalculated = false;

    // Expose functions to window object
    window.uploadImage = function() {
      const fileInput = document.getElementById('fileUpload');
      const tagInput = document.getElementById('tagInput');
      const file = fileInput.files[0];
      const tag = tagInput.value.trim();
      const progressBar = document.getElementById('progress');
      const statusText = document.getElementById('status');

      if (!file) {
        showMessage("Please select a file first!", "error");
        return;
      }

      if (!tag) {
        selectedFile = file; // Store file for modal upload
        document.getElementById('tagModal').style.display = 'flex';
        return;
      }

      uploadFile(file, tag, progressBar, statusText);
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

      uploadFile(selectedFile, tag, progressBar, statusText, modalProgress);
    };

    function uploadFile(file, tag, progressBar, statusText, modalProgress = null) {
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
          statusText.textContent = 'Uploading...';
        }
      };

      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log("Cloudinary Response:", data);
          if (!data.secure_url) {
            showMessage('Upload failed: No secure URL received', 'error');
            statusText.textContent = 'Upload failed!';
            closeModal();
            return;
          }
          const imgObj = {
            url: data.secure_url,
            tag: tag,
            name: file.name, // Store original file name for download
            timestamp: Date.now() // Use Date.now() for client-side timestamp
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
              statusText.textContent = 'Complete';
              showMessage('Uploaded Successfully!', 'info');
              closeModal();
              document.getElementById('fileUpload').value = ''; // Clear file input
              document.getElementById('tagInput').value = ''; // Clear tag input
              loadImages(); // Reload images to display the new one
            })
            .catch((error) => {
              console.error("Firebase Push Error:", error);
              statusText.textContent = 'Upload failed: Firebase error';
              showMessage('Upload failed: Firebase error', 'error');
              closeModal();
            });
        } else {
          console.error("Cloudinary Upload Failed (HTTP status:", xhr.status, ") Response:", xhr.responseText);
          statusText.textContent = 'Upload failed!';
          showMessage('Upload failed!', 'error');
          closeModal();
        }
      };

      xhr.onerror = function() {
        console.error("Upload error occurred (XHR onerror):", xhr.status);
        statusText.textContent = 'Upload error occurred!';
        showMessage('Upload failed due to a network error!', 'error');
        closeModal();
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
  "Inspection": "NA",
  "Any Exception": "To cancel a third-party policy, need to provide an alternate policy from the same insurer with the same issuance date(POI).",
  "Declaration format (if declaration required)": "NA"
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
    "zd_claims_year": "2 per year\n(Unlimited for Maruti, Hyundai, Honda, Toyota, Kia, MG, Volvo, Ford)",
    "non_zd_claims_year": "Unlimited",
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
    const inspectionWaiverData = [
        { "Insurer Name": "Bajaj Allianz", "Policy Waiver": "Only Fresh Cases. 3 Days" },
        { "Insurer Name": "Cholamandalam", "Policy Waiver": "5 Days" },
        { "Insurer Name": "Digit", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Future Generali", "Policy Waiver": "5 Days" },
        { "Insurer Name": "Hdfc Ergo", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Icici Lombard", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Iffco Tokio", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Kotak General Insurance", "Policy Waiver": "5 Days" },
        { "Insurer Name": "Liberty General Insurance", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Magma Hdi", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "National Insurance", "Policy Waiver": "5 Days" },
        { "Insurer Name": "New India Assurance", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Oriental", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Raheja Qbe", "Policy Waiver": "5 Days" },
        { "Insurer Name": "Reliance", "Policy Waiver": "1 Day" },
        { "Insurer Name": "Royal Sundaram", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "SBI", "Policy Waiver": "Only In Pb Renewal 5 Days" },
        { "Insurer Name": "Shriram General Insurance", "Policy Waiver": "5 Days" },
        { "Insurer Name": "United Insurance", "Policy Waiver": "10 Days" },
        { "Insurer Name": "Universal Sompo", "Policy Waiver": "No Waiver" },
        { "Insurer Name": "Zuno", "Policy Waiver": "5 Days" }
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
        { "Sr.": "2", "Insurer Name": "United Insurance", "RSA and Toll Free Number": "7042113114 (Roadzen)", "Claim No.": "" },
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
        { "Sr.": "17", "Insurer Name": "Oriental Insurance", "RSA and Toll Free Number": "1800 309 1209", "Claim No.": "1800118485 / 011-33208485" }
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
            "SBI General": [],
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
}],
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
  </script></body>
</html>
