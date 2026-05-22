<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>

<style>
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: #f0f4f8;
    color: #2d3748;
    padding: 40px 20px;
    margin: 0;
  }
  .app-container {
    max-width: 900px;
    margin: 0 auto;
  }
  .header {
    text-align: center;
    margin-bottom: 25px;
  }
  h2 { color: #1a365d; margin: 0 0 10px 0; font-size: 28px; }
  .subtitle { color: #718096; margin: 0; font-size: 14px; }
  
  .card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    margin-bottom: 20px;
  }
  .input-group { margin-bottom: 20px; }
  label { display: block; margin-bottom: 8px; color: #4a5568; font-size: 15px; font-weight: bold; }
  
  .mapper-row {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f7fafc;
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin-bottom: 10px;
  }
  .mapper-row span {
    font-weight: bold;
    color: #2b6cb0;
    min-width: 140px;
  }
  .mapper-row select {
    flex: 1;
    padding: 8px;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    background: white;
  }

  textarea {
    width: 100%; box-sizing: border-box; padding: 12px; border: 2px dashed #cbd5e0;
    border-radius: 6px; font-family: monospace; font-size: 12px; background: #f7fafc; resize: vertical;
  }
  input[type="file"] {
    display: block; width: 100%; box-sizing: border-box; padding: 12px; background: #f7fafc; border: 2px dashed #cbd5e0; border-radius: 6px; cursor: pointer;
  }
  button.btn-main {
    width: 100%; padding: 14px; background-color: #38a169; color: white;
    border: none; border-radius: 6px; font-size: 16px; font-weight: 600;
    cursor: pointer; box-shadow: 0 4px 6px -1px rgba(56, 161, 105, 0.3);
  }
  button.btn-main:hover { background-color: #2f855a; }
  
  #status { margin-top: 15px; padding: 10px; border-radius: 4px; text-align: center; font-weight: bold; font-size: 14px; }
  .download-link {
    display: block; margin: 8px 0; padding: 10px; background: #3182ce; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;
  }
  .download-link:hover { background: #2b6cb0; }

  /* UNIVERSAL FOOTER STYLE BLOCK */
  .footer-copyright {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #cbd5e0;
    font-size: 13px;
    color: #718096;
  }

  /* --- GATEKEEPER REGISTRATION MODAL OVERLAY --- */
  .gatekeeper-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(26, 32, 44, 0.95); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(8px);
    transition: opacity 0.3s ease;
  }
  .gatekeeper-modal {
    background: white; width: 100%; max-width: 460px; padding: 35px;
    border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  .gatekeeper-modal h3 { margin: 0 0 10px 0; color: #1a365d; font-size: 22px; text-align: center; }
  .gatekeeper-modal p { margin: 0 0 25px 0; color: #718096; font-size: 14px; text-align: center; line-height: 1.5; }
  .gatekeeper-input {
    width: 100%; padding: 12px; margin-bottom: 18px; border: 2px solid #cbd5e0;
    border-radius: 6px; font-size: 14px; box-sizing: border-box;
  }
  .gatekeeper-input:focus { border-color: #3182ce; outline: none; }
  .gatekeeper-btn {
    width: 100%; padding: 14px; background: #3182ce; color: white; border: none;
    border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;
  }
  .gatekeeper-btn:hover { background: #2b6cb0; }
</style>

<div id="registrationLock" class="gatekeeper-overlay">
  <div class="gatekeeper-modal">
    <h3>Welcome to 3HML Mapping Pro</h3>
    <p>Please enter your details to activate the workspace.</p>
    
    <label style="font-size: 13px; color: #4a5568;">Your Full Name</label>
    <input type="text" id="regName" class="gatekeeper-input" placeholder="e.g., Dr. Adam Smith" required />

    <label style="font-size: 13px; color: #4a5568;">Email Address</label>
    <input type="email" id="regEmail" class="gatekeeper-input" placeholder="e.g., adam@university.edu" required />
    
    <label style="font-size: 13px; color: #4a5568;">Institution / University</label>
    <input type="text" id="regSchool" class="gatekeeper-input" placeholder="e.g., Universiti Teknologi Malaysia" required />
    
    <button type="button" class="gatekeeper-btn" onclick="submitUserRegistration()">Activate Workspace</button>
  </div>
</div>

<div class="app-container">
  <div class="header">
    <h2>3HML Universal Form-Mapping Automator</h2>
    <p class="subtitle">Smart Data Mapping for Busy Lecturers.</p>
  </div>
  
  <div class="card">
    <div class="input-group">
      <label for="pdfFile">Step 1: Upload Your Rubric PDF Template</label>
      <input type="file" id="pdfFile" accept=".pdf" />
    </div>
  </div>

  <div class="card" id="mapperCard" style="display: none;">
    <label>Step 2: Connect Spreadsheet Data to PDF Fields</label>
    <p style="font-size: 13px; color: #718096; margin-top: 0; margin-bottom: 15px;">
      The system successfully detected fields inside your document. Select which spreadsheet column belongs to each field target below:
    </p>
    <div id="dynamicMapperContainer"></div>
  </div>

  <div class="card">
    <div class="input-group">
      <label for="studentData">Step 3: Paste Your Student Scores Matrix</label>
      <textarea id="studentData" rows="8" oninput="extractSpreadsheetHeaders()"></textarea>
      <small style="color: #718096; margin-top: 4px; display: block;">Ensure columns include Name, Matric Number, individual criteria, and a Total Score.</small>
    </div>

    <button class="btn-main" type="button" id="processBtn">Generate 9 Moderated PDFs</button>
    <div id="status"></div>
  </div>
  
  <div id="downloadArea" style="margin-top: 20px; text-align: center;"></div>

  <footer class="footer-copyright">
    <p>&copy; <span id="currentYear"></span> Catherine Nguoi C. L. All rights reserved.</p>
    <p style="font-size: 11px; margin-top: 4px; color: #a0aec0;">Released under the MIT License. Powered by PDF-Lib Framework.</p>
    
    <div style="margin-top: 12px;">
      <img src="https://komarev.com/ghvc/?username=3hml-automator-project&label=APP%20VIEWS&color=blue&style=flat" alt="Visitor Counter Badge" border="0" />
    </div>
  </footer>
</div>

<script>
let excelHeaders = [];
let pdfFormFields = [];
let pdfBytesData = null;

document.addEventListener("DOMContentLoaded", function() {
  // Check if the user has already registered in this browser session
  if (localStorage.getItem("3hml_verified_user") === "true") {
    document.getElementById("registrationLock").style.display = "none";
  }

  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('processBtn').addEventListener('click',