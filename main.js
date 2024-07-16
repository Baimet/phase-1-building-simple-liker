// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const hearts = document.querySelectorAll(".like-glyph");

  // Add .hidden class to modal initially
  modal.classList.add("hidden");

  // Event listener for each heart
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      // Check if heart is already full
      if (heart.innerHTML === FULL_HEART) {
        // If heart is full, empty it
        heart.classList.remove("activated-heart");
        heart.innerHTML = EMPTY_HEART;
      } else {
        // If heart is empty, fill it after server call
        mimicServerCall()
          .then(() => {
            heart.classList.add("activated-heart");
            heart.innerHTML = FULL_HEART;
          })
          .catch((error) => {
            // Show error modal
            modalMessage.innerText = error;
            modal.classList.remove("hidden");

            // Hide error modal after 3 seconds
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
