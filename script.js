document.addEventListener("DOMContentLoaded", function() {
  const textInput = document.getElementById("textInput");
  const keys = document.querySelectorAll(".keyboard button");

  // Automatically slice the last 4 characters when the page loads
  if (textInput.value.length >= 4) {
      textInput.value = textInput.value.slice(0, -4);
  }

  keys.forEach(key => {
      key.addEventListener("click", () => {
          const char = key.getAttribute("data-char");

          if (char === "←") {
              // Backspace functionality
              textInput.value = textInput.value.slice(0, -1);
              textInput.value = textInput.value.slice(0, -1);
          } else if (char === "←←") {
            textInput.value = textInput.value.slice(0, -1);
          } else if (char === "space") {
              // Space functionality
              console.log("Space is pressed");
              textInput.value += ' ';
          }else if (char === "↩") {
            // Enter functionality (new line)
            textInput.value += '\n';  // Adds a new line
        }else {
              // Insert character
              textInput.value += char;
          }
      });
  });
});

// Prevent default keyboard from opening if possible
document.getElementById('textInput').addEventListener('focus', function(e) {
  e.preventDefault(); // Attempt to prevent the default keyboard from opening
  this.blur(); // Blurring here, assuming custom keyboard will manage focus
});

// Focus back to simulate the custom keyboard input (optional)
document.querySelector('.keyboard').addEventListener('click', function() {
  document.getElementById('textInput').focus(); // Bring focus back for custom input
});


  function toggleKeyboard(keyboardId) {
    // Hide all keyboards
    const keyboards = document.querySelectorAll('.keyboard');
    keyboards.forEach(keyboard => {
        keyboard.style.display = 'none'; // Hide all keyboards
    });

    // Show the selected keyboard
    const selectedKeyboard = document.getElementById(keyboardId);
    if (selectedKeyboard) {
        selectedKeyboard.style.display = 'flex'; // Show the selected keyboard
        selectedKeyboard.style.flexDirection = 'row'; // Ensure it's in row layout
    }
}

document.getElementById("languageButton").onclick = function() {
  // Toggle the keyboard with id "keyboard5"
  toggleKeyboard("keyboard5");
};

// Function to toggle the display of keyboards
function toggleKeyboard(keyboardId) {
  // Hide all keyboards
  const keyboards = document.querySelectorAll('.keyboard');
  keyboards.forEach(keyboard => {
      keyboard.style.display = 'none'; // Hide all keyboards
  });

  // Show the selected keyboard
  const selectedKeyboard = document.getElementById(keyboardId);
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


// function showOtherKeyboard() {
//   document.getElementById("keyboard1").style.display = "none";
//   document.getElementById("otherKeyboard").style.display = "flex"; // Ensure flex layout is applied
// }
// function showOtherKeyboards() {
//   document.getElementById("keyboard1").style.display = "none"; // Hide the first keyboard
//   document.getElementById("keyboard2").style.display = "none"; // Hide the first keyboard
//   document.getElementById("otherKeyboard").style.display = "none"; // Show the second keyboard
//   document.getElementById("otherKeyboardsigns").style.display = "flex"; // Show the second keyboard
// }

// function showMainKeyboard() {
//   document.getElementById("keyboard1").style.display = "flex";
//   document.getElementById("otherKeyboardsigns").style.display = "none"; // Ensure flex layout is applied
//   document.getElementById("otherKeyboard").style.display = "none";
// }
// Function to hide all keyboards from keyboard1 to keyboard12
function hideAllKeyboards() {
  for (let i = 1; i <= 12; i++) {
    const keyboard = document.getElementById(`keyboard${i}`);
    if (keyboard) {
      keyboard.style.display = "none";
    }
  }
}

// Function to show a specific alternate keyboard
function showOtherKeyboard() {
  hideAllKeyboards(); // Hide all keyboards
  document.getElementById("otherKeyboard").style.display = "flex"; // Display the specific alternate keyboard
}

// Function to show the second alternate keyboard (signs) and hide all others
function showOtherKeyboards() {
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
