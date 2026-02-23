const popupModal = document.getElementById('popup-modal');
const popupText = document.getElementById('popup-text');
const popupOk = document.getElementById('popup-ok');
const popupImg = document.getElementById('popup-img');

const allImages = [
  "public/correct.webp",
  "public/wrong.webp",
  "public/wrong1.webp",
  "public/wrong2.webp",
  "public/wrong3.webp"
];

allImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

function showPopup(message, imgSrc = null) {
  return new Promise(resolve => {
    popupText.textContent = message;

    const displayModal = () => {
      popupModal.classList.add('show');
    };

    if (imgSrc) {
      popupImg.src = imgSrc;
      popupImg.style.display = "block";
      popupImg.onload = displayModal;
      popupImg.onerror = displayModal;

      if (popupImg.complete) displayModal();
    } else {
      popupImg.style.display = "none";
      displayModal();
    }

    popupOk.onclick = () => {
      popupModal.classList.remove('show');
      popupImg.onload = null;
      popupImg.onerror = null;
      resolve();
    };
  });
}

let wrongImagesPool = [];

export async function checkLie(element, isLie) {
  const statusClass = isLie ? 'correct' : 'wrong';
  element.classList.add(statusClass);

  try {
    if (isLie) {
      await showPopup("Correct! That was the lie", "public/correct.webp");
    } else {
      if (wrongImagesPool.length === 0) {
        wrongImagesPool = ["public/wrong.webp", "public/wrong1.webp", "public/wrong2.webp", "public/wrong3.webp"];
      }
      const randomIndex = Math.floor(Math.random() * wrongImagesPool.length);
      const randomImg = wrongImagesPool.splice(randomIndex, 1)[0];
      await showPopup("Oops! That was actually true", randomImg);
    }
  } catch (err) {
    console.error("Error in the popup:", err);
  } finally {
    element.classList.remove('correct', 'wrong');

    if (typeof element.blur === 'function') {
      element.blur();
    }
  }
}