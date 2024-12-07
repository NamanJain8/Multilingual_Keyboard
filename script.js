
// document.addEventListener("DOMContentLoaded", function() {
//   const textInput = document.getElementById("textInput");
//   const keys = document.querySelectorAll(".keyboard button");

//   keys.forEach(key => {
//       key.addEventListener("click", () => {
//           const char = key.getAttribute("data-char");
//           // Focus textInput to enable updates with custom keyboard
//           textInput.focus(); 


//           if (char === "←") {
//               // Backspace functionality
//               textInput.innerText = textInput.innerText.slice(0, -1);
//               textInput.innerText = textInput.innerText.slice(0, -1);
//           }else if (char === "←←") {
//             textInput.innerText = textInput.innerText.slice(0, -1);
//           }else if (char === "space") {
//               // Space functionality
//               console.log("Space is pressed");
//               textInput.innerText += ' ';
//           }else if (char === "↩") {
//             // Enter functionality (new line)
//             textInput.innerText += '\n';  // Adds a new line
//           }else {
//               // Insert character
//               textInput.innerText += char;
//           }
//       });
//   });
// });

// Custom keyboard handling
document.addEventListener("click", function(e) {
  if (e.target.matches('.keyboard button')) {
      const char = e.target.getAttribute('data-char');
      const selection = quill.getSelection(true);
      
      if (char === "←") {
          if (selection.length > 0) {
              quill.deleteText(selection.index, selection.length);
          } else if (selection.index > 0) {
              quill.deleteText(selection.index - 1, 1);
          }
      } else if (char === "space") {
          quill.insertText(selection.index, '  ');
          quill.setSelection(selection.index + 2);
      } else if (char === "↩") {
          quill.insertText(selection.index, '\n');
          quill.setSelection(selection.index + 1);
      } else {
          quill.insertText(selection.index, char);
          quill.setSelection(selection.index + char.length);
      }
  }
});


// Function to toggle the display of keyboards
function toggleKeyboard(keyboardId) {
  // Hide all keyboards
  const keyboards = document.querySelectorAll('.keyboard');
  keyboards.forEach(keyboard => {
      keyboard.style.display = 'none'; // Hide all keyboards
  });

  // Show the selected keyboard
  const selectedKeyboard = document.getElementById(keyboardId);
  hideAllKeyboards();
  if (selectedKeyboard) {
      selectedKeyboard.style.display = 'flex'; // Show the selected keyboard
      selectedKeyboard.style.flexDirection = 'row'; // Ensure it's in row layout
  }
}

// Function to hide all keyboard elements (if needed in future extensions)
function hideAllKeyboards() {
  const keyboards = document.querySelectorAll(".keyboard");
  keyboards.forEach(keyboard => {
      keyboard.style.display = "none";
  });
}

function hideAllKeyboards() {
  for (let i = 1; i <= 12; i++) {
    const keyboard = document.getElementById(`keyboard${i}`);
    if (keyboard) {
      keyboard.style.display = "none";
    }
  }
}

// Function to show the second alternate keyboard (signs) and hide all others
function showOtherKeyboard() {
  hideAllKeyboards(); // Hide all keyboards
  document.getElementById("otherKeyboard").style.display = "none";
  document.getElementById("otherKeyboardsigns").style.display = "flex"; // Show the second alternate keyboard
}

// Function to show the main keyboard (keyboard1) only
function showMainKeyboard() {
  hideAllKeyboards(); // Ensure all keyboards are hidden first
  document.getElementById("otherKeyboard").style.display = "none";
  document.getElementById("otherKeyboardsigns").style.display = "none"; 
  document.getElementById("keyboard1").style.display = "flex"; // Display the main keyboard
}

// window.onload = function() {
//   // // Focus the textarea
//   // var textarea = document.getElementById('textInput');
//   // // Focus it immediately on load
//   // textarea.focus();
//   const editableDiv = document.getElementById('textInput');

//     // Prevent mobile keyboard by preventing focus
//     editableDiv.addEventListener('click', function(event) {
//       // Optionally, you could log or handle clicks here
//       event.preventDefault();
//       event.stopPropagation();
//       editableDiv.blur();  // Remove focus immediately
//     });

//     // Optionally prevent the focus event itself, but this might block all edits
//     editableDiv.addEventListener('focus', function(event) {
//       event.preventDefault();
//     });
// };

// Add loading indicator functions
function showLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'pdf-loading';
  loadingDiv.innerHTML = 'Generating PDF...';
  document.body.appendChild(loadingDiv);
}

function hideLoading() {
  const loadingDiv = document.querySelector('.pdf-loading');
  if (loadingDiv) {
      loadingDiv.remove();
  }
}
// Initialize Quill with enhanced Unicode support
const quill = new Quill('#editor', {
  theme: 'snow',
  readOnly: true,
  modules: {
    toolbar: {
      container: [
        [{ 'size': ['10px', '12px', '14px', '18px', '24px']}],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote'
          // , 'code-block'
        ],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        // [{ 'direction': 'ltr' }, { 'align': [] }],
        // ['link'],
        ['image'],
        // ['formula'],
        // ['clean'],
        ['download-pdf']  // Add this new option
      ],
      handlers: {
        'download-pdf': function() {
          const userChoice = prompt('Choose download format:\n1. PDF\n2. Image\nType "1" for PDF or "2" for Image');
          if (userChoice === '1') {
            // User wants to save as PDF
            downloadPDF();
          } else if (userChoice === '2') {
            // User wants to save as Image
            downloadPNG();
          } else {
            alert('Invalid choice. Please type "1" for PDF or "2" for Image.');
          }
        }
      }
    }
  },
  placeholder: 'लिखना शुरू करें।',
});

// Add the PDF download button icon
const customButton = document.querySelector('.ql-download-pdf');
if (customButton) {
    customButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
    `;
    customButton.setAttribute('title', 'Download PDF');
}

// Add the PDF download function
async function downloadPDF() {
    // Create a clone of the editor content
    const editorContent = document.querySelector('.ql-editor');
    const clone = editorContent.cloneNode(true);
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    // Style the temporary container
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1632px'; // A4 width at 96 DPI
    tempContainer.style.minHeight = '1056px'; // A4 height at 96 DPI
    
    try {
        // Convert to canvas
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: 1632,
            windowHeight: 1056
        });

        // Initialize PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        // Calculate dimensions
        const imgWidth = 595.28; // A4 width in points
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save PDF
        pdf.save('document.pdf');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        // Clean up
        tempContainer.remove();
    }
}

async function downloadPNG() {
  // Create a clone of the editor content
  const editorContent = document.querySelector('.ql-editor');
  const clone = editorContent.cloneNode(true);
  
  // Create a temporary container
  const tempContainer = document.createElement('div');
  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);
  
  // Style the temporary container
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '-9999px';
  tempContainer.style.width = '1632px'; // A4 width at 96 DPI
  tempContainer.style.minHeight = '1056px'; // A4 height at 96 DPI
  
  try {
      // Convert to canvas
      const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 1632,
          windowHeight: 1056
      });
      
      const imgData = canvas.toDataURL('image/png');
      // Create a temporary link to trigger the download without showing the link to the user
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'brahmi-image.png'; // Filename for the image

      // Trigger the download directly
      link.click();
  } catch (error) {
      console.error('Error generating PNG:', error);
  } finally {
      // Clean up
      tempContainer.remove();
  }
}
// Prevent default keyboard on mobile devices
// const editorElement = document.querySelector('.ql-editor');
// const editorContainer = document.querySelector('.ql-container');

// // Disable mobile keyboard
// editorContainer.setAttribute('readonly', 'true');
// editorContainer.setAttribute('inputmode', 'none');

// // Disable contentEditable but enable Quill features
// editorElement.setAttribute('contenteditable', 'true');

// // Add a blinking cursor effect
// function addBlinkingCursor() {
//   let cursor = document.createElement('span');
//   cursor.classList.add('custom-cursor');
//   cursor.textContent = '|';
//   editorElement.appendChild(cursor);

//   // Blinking effect
//   setInterval(() => {
//     cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
//   }, 500);
// }

// addBlinkingCursor();

// // Handle focus on custom keyboard
// editorElement.addEventListener('touchstart', (e) => {
//   e.preventDefault();
//   showMainKeyboard();
// });

// editorElement.addEventListener('mousedown', (e) => {
//   e.preventDefault();
//   showMainKeyboard();
// });

// // Custom keyboard handling (your existing code)
// document.addEventListener("click", function (e) {
//   if (e.target.matches('.keyboard button')) {
//     const char = e.target.getAttribute('data-char');
//     const selection = quill.getSelection(true);

//     if (char === "←") {
//       if (selection.length > 0) {
//         quill.deleteText(selection.index, selection.length);
//       } else if (selection.index > 0) {
//         quill.deleteText(selection.index - 1, 1);
//       }
//     } else if (char === "space") {
//       quill.insertText(selection.index, ' ');
//       quill.setSelection(selection.index + 1);
//     } else if (char === "↩") {
//       quill.insertText(selection.index, '\n');
//       quill.setSelection(selection.index + 1);
//     } else {
//       quill.insertText(selection.index, char);
//       quill.setSelection(selection.index + 1);
//     }
//   }
// });

// // Add this to your CSS
// const style = document.createElement('style');
// style.textContent = `
//   .ql-container {
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//   }

//   .ql-editor {
//     caret-color: transparent;
//     position: relative;
//   }
  
//   .custom-cursor {
//     position: absolute;
//     display: inline;
//     visibility: visible;
//     animation: blink 1s step-end infinite;
//   }

//   @keyframes blink {
//     50% {
//       opacity: 0;
//     }
//   }
// `;
// document.head.appendChild(style);

// Auto-save functionality
let saveTimeout;
const saveStatus = document.querySelector('.save-status');

// quill.on('text-change', function() {
//   saveStatus.textContent = 'Saving...';
  
//   clearTimeout(saveTimeout);
//   saveTimeout = setTimeout(() => {
//       // Simulate saving to server
//       saveDocument();
//   }, 1000);
// });

function saveDocument() {
  // In a real application, this would save to a server
  const content = quill.getContents();
  localStorage.setItem('doc-content', JSON.stringify(content));
  saveStatus.textContent = 'All changes saved';
}

// Load saved content if it exists
const savedContent = localStorage.getItem('doc-content');
if (savedContent) {
  quill.setContents(JSON.parse(savedContent));
}

// // Handle document title changes
// const titleInput = document.querySelector('.doc-title');
// titleInput.addEventListener('input', function() {
//   document.title = titleInput.value || 'Untitled document';
//   saveStatus.textContent = 'Saving...';
  
//   clearTimeout(saveTimeout);
//   saveTimeout = setTimeout(() => {
//       localStorage.setItem('doc-title', titleInput.value);
//       saveStatus.textContent = 'All changes saved';
//   }, 1000);
// });

// Load saved title if it exists
const savedTitle = localStorage.getItem('doc-title');
if (savedTitle) {
  titleInput.value = savedTitle;
  document.title = savedTitle;
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
          case 'b':
              e.preventDefault();
              quill.format('bold', !quill.getFormat().bold);
              break;
          case 'i':
              e.preventDefault();
              quill.format('italic', !quill.getFormat().italic);
              break;
          case 'u':
              e.preventDefault();
              quill.format('underline', !quill.getFormat().underline);
              break;
      }
  }
});
// Variable to control whether to allow the keyboard
// let allowKeyboard = false;
//   // Event listener to prevent default keyboard
//   const editor = document.getElementById('editor');
//   editor.addEventListener('focus', function(event) {
//     if (!allowKeyboard) {
//       // Prevent the default on-screen keyboard
//       event.preventDefault();
//       editor.blur(); // Optionally remove focus to avoid any blinking cursor
//       console.log("Default keyboard prevented");
//     }
//   });

// Listen for focus events on the editor
let lastSelection = null;
quill.root.addEventListener('focus', function(e) {
  lastSelection = quill.getSelection(true);  // Store the current cursor position
  e.preventDefault();  // Prevent the keyboard from appearing
  quill.setSelection(lastSelection.index, lastSelection.length);  // Restore the cursor position immediately
});

quill.root.addEventListener('mousedown', function(e) {
  console.log("mouse down event")
  lastSelection = quill.getSelection(true);  // Store the current cursor position
  e.preventDefault();  // Prevent the keyboard from appearing
  quill.setSelection(lastSelection.index, lastSelection.length);  // Restore the cursor position immediately
});

// Get the editor element (the actual editable div)
const editorElement = document.querySelector('.ql-editor');
// editorElement.preventDefault();

// Function to prevent keyboard while maintaining focus
function preventKeyboardKeepFocus() {
  console.log("prevening")
  // Set readonly attribute
  // editorElement.setAttribute('readonly', 'readonly');
  
  // Prevent keyboard on iOS and Android
  // editorElement.setAttribute('inputmode', 'none');
  
  // Add additional attributes to prevent mobile keyboards
  editorElement.setAttribute('contenteditable', 'true');
  // editorElement.style.userSelect = 'text';  // Allows text selection
  
  // Prevent default on touch events
  // editorElement.addEventListener('touchstart', function(e) {
  //   e.preventDefault();
  //   // Keep focus
  //   this.focus();
  // }, { passive: false });

  // // Prevent keyboard but maintain focus on click
  // editorElement.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   // Keep focus
  //   this.focus();
  // });

  // // Optional: Maintain cursor visibility
  // editorElement.style.caretColor = 'auto';  // Shows cursor
  
  // // Prevent keyboard on focus
  // editorElement.addEventListener('focus', function(e) {
  //   // No need to prevent default or blur
  //   // Just let it maintain focus without keyboard
  // });
}

// Initialize the keyboard prevention
preventKeyboardKeepFocus();

// // If you need to programmatically focus the editor:
// function focusEditor() {
//   editorElement.focus();
// }
