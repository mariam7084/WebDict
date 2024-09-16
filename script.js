const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inputWord = document.getElementById("inp-word");

// Function to perform the search
function searchWord() {
    let inpWord = inputWord.value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Extract the audio URL, if available
            let audioUrl = data[0].phonetics.find(p => p.audio)?.audio || "";


            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
            </div>
            <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
            </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">Example Usage : 
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

            // Set the audio source if the URL is available
            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                console.log("No audio available for this word.");
            }

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}

// Event listener for button click
btn.addEventListener("click", searchWord);

// Event listener for Enter key press
inputWord.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWord();
    }
});

function playSound() {
    sound.play();
}

