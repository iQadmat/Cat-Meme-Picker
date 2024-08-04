import { catsData } from "./data.js";

const emotionRadiosContainer = document.querySelector("#emotion-radios");
const getImagesBtn = document.querySelector("#get-image-btn");
const gifsOnlyOption = document.querySelector("#gifs-only-option");
const memeModal = document.querySelector("#meme-modal");
const memeModelInner = document.querySelector("#meme-modal-inner");
const closeMemeModal = document.querySelector("#meme-modal-close-btn");

// Event listener for the close button.
closeMemeModal.addEventListener("click", () => {
  memeModal.style.display = "none";
});

// Event listener to highlight the selected radio button.
emotionRadiosContainer.addEventListener("change", highlightCheckedOption);

// Event listener for the 'Get Image' button.
getImagesBtn.addEventListener("click", renderCat);

// To highlight the selected radio button.
function highlightCheckedOption(e) {
  const radios = document.querySelectorAll(".radio");
  radios.forEach((div) => {
    div.classList.remove("highlight");
  });

  document
    .querySelector(`#${e.target.id}`)
    .parentElement.classList.add("highlight");
}

// To render the cat image.
function renderCat() {
  const catObj = getSingleCatObj();
  memeModelInner.innerHTML = `<img class="cat-img" src="./images/${catObj.image}" alt="${catObj.name}">`;
  memeModal.style.display = "flex";
}

// To get the cat object matching the user's selection.
function getSingleCatObj() {
  const filteredCats = getMatchingCatsArray();

  if (filteredCats.length === 1) {
    return filteredCats[0];
  } else {
    return filteredCats[Math.floor(Math.random() * filteredCats.length)];
  }
}

// To get the array of cats matching the user's selection.
function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const filteredCatsData = catsData.filter(
      (cat) => cat.emotionTags.includes(selectedEmotion) && cat.isGif === isGif
    );
    return filteredCatsData;
  }
}

// To get the unique emotions array.
function getEmotionsArray(data) {
  const emotionsArray = [];

  for (let cat of catsData) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }

  return emotionsArray;
}

// To render the radio buttons.
function renderEmotionsRadios(data) {
  const emotions = getEmotionsArray(data);
  let emotionsString = "";

  emotions.forEach((emotion) => {
    emotionsString += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" name="emotion" value="${emotion}" id="${emotion}">
    </div>
    `;
  });

  emotionRadiosContainer.innerHTML = emotionsString;
}

// Call the function to render the radio buttons.
renderEmotionsRadios(catsData);
