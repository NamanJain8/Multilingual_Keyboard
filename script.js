
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


      //   // Custom keyboard handling
      //   document.addEventListener("click", function(e) {
      //     if (e.target.matches('.keyboard button')) {
      //         const char = e.target.getAttribute('data-char');
      //         const selection = quill.getSelection(true);
              
      //         if (char === "←") {
      //             if (selection.length > 0) {
      //                 quill.deleteText(selection.index, selection.length);
      //             } else if (selection.index > 0) {
      //                 quill.deleteText(selection.index - 1, 1);
      //             }
      //         } else if (char === "space") {
      //             quill.insertText(selection.index, ' ');
      //             quill.setSelection(selection.index + 1);
      //         } else if (char === "↩") {
      //             quill.insertText(selection.index, '\n');
      //             quill.setSelection(selection.index + 1);
      //         } else {
      //             quill.insertText(selection.index, char);
      //             quill.setSelection(selection.index + 1);
      //         }
      //     }
      // });


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


// Initialize Quill with enhanced Unicode support
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
      toolbar: [
          [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' },
           { 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }, { 'align': [] }],
          ['link', 'image', 'formula'],
          ['clean']
      ]
  },
  placeholder: 'लिखना शुरू करें।',
});

// Prevent default keyboard on mobile devices
const editorElement = document.querySelector('#editor');
const editorContainer = document.querySelector('.ql-container');

// Prevent focus and showing keyboard on iOS
editorElement.addEventListener('touchstart', function(e) {
  e.preventDefault();
  showMainKeyboard(); // Show your custom keyboard
});

// Prevent focus and showing keyboard on Android
editorElement.addEventListener('click', function(e) {
  e.preventDefault();
  showMainKeyboard(); // Show your custom keyboard
});

// Add these attributes to prevent mobile keyboard
editorContainer.setAttribute('readonly', 'readonly');
editorContainer.setAttribute('inputmode', 'none');

// Additional measures to prevent mobile keyboard
document.addEventListener('DOMContentLoaded', function() {
  // Disable contentEditable when touching/clicking
  const preventKeyboard = function(e) {
    const editor = quill.root;
    editor.setAttribute('contenteditable', 'false');
    
    // Re-enable contentEditable after a short delay
    // This allows Quill to work while preventing keyboard
    setTimeout(() => {
      editor.setAttribute('contenteditable', 'true');
    }, 100);
  };

  editorElement.addEventListener('touchstart', preventKeyboard);
  editorElement.addEventListener('mousedown', preventKeyboard);
});

// Custom keyboard handling (your existing code)
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
      quill.insertText(selection.index, ' ');
      quill.setSelection(selection.index + 1);
    } else if (char === "↩") {
      quill.insertText(selection.index, '\n');
      quill.setSelection(selection.index + 1);
    } else {
      quill.insertText(selection.index, char);
      quill.setSelection(selection.index + 1);
    }
  }
});

// Add this to your CSS
const style = document.createElement('style');
style.textContent = `
  .ql-container {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .ql-editor {
    caret-color: transparent;
  }
`;
document.head.appendChild(style);


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
