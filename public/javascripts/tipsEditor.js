/* Wait until the DOM is fully loaded. */
document.addEventListener('DOMContentLoaded', function () {
    // Find the Quill editor container by its ID.
    const quillEl = document.querySelector('#editor');
    if (quillEl) {
      // Initialize the Quill editor with the "snow" theme and a toolbar configuration.  This was cool to work with.  I chose "snow" vs "bubble" theme thinking it was more user intuitive.  But I understand that platforms such as Medium.com use "bubble."
      const quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Write your tip here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],  // Header dropdown (h1, h2, normal text).
            ['bold', 'italic', 'underline'],  // Text formatting buttons.
            [{ list: 'ordered' }, { list: 'bullet' }],  // List buttons.
            ['link']  // Link button.
          ]
        }
      });
  
      // Focus on the editor and set the cursor position at the start.
      const range = quill.getSelection();
      if (range) {
        quill.setSelection(0); // Move the cursor to the very beginning of the editor content.  Additional adjsutment to placement added in CSS.
      }
  
      // Find the form element and add a submit event listener.
      const form = document.querySelector('form');
      form.addEventListener('submit', function () {
        // Before form submission, transfer the HTML content from the Quill editor
        // to the hidden input field so that it is submitted with the form.
        document.querySelector('#hiddenContent').value = quill.root.innerHTML;
      });
    }
  });
  
  /**
   * Function to print a tip.
   * It clones the tip element removing interactive elements.  Edit, Delete, and Print.  It builds an HTML document
   * using a Blob to avoid using document.write() which I discovered is deprecated and Stackoverflow suggested alternative approach.  This then opens a print dialog.
   *
   * @param {string} tipId - Unique ID of the tip to print.
   */
  function printTip(tipId) {
    // Retrieve the tip element using its dynamic ID.
    const tipElement = document.getElementById(`tip-${tipId}`);
    
    if (tipElement) {
      // Clone the tip element.
      const printContent = tipElement.cloneNode(true);
  
      // Remove interactive elements.
      const buttons = printContent.querySelectorAll('.btn, form');
      buttons.forEach(button => button.style.display = 'none');
  
      // Construct the complete HTML for the print page, including a UTF-8 meta tag which addresses some punctuation errors I was encountering. 
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Print Tip</title>
            <style>
              /* Print page styling */
              body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
              h1 { color: #4b8673; }
              .content { margin-top: 20px; }
              .category { font-size: 0.95rem; color: #6c757d; }
              .tip-title { font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>Tip Details</h1>
            <div class="content">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `;
  
      // Create a Blob from the HTML string (avoiding document.write).
      const blob = new Blob([html], { type: 'text/html' });
      // Generate an object URL for the Blob.
      const url = URL.createObjectURL(blob);
      // Open a new window with the generated URL.
      const printWindow = window.open(url, '_blank', 'width=600,height=400');
  
      // When the print window finishes loading, trigger the print dialog.
      printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
        // Revoke the object URL to free memory.
        URL.revokeObjectURL(url);
      };
    } else {
      console.error('Tip not found');
    }
  }