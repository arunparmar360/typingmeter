const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Fast fingers make fun work.",
    "Every letter counts in the typing game.",
    "Speed and accuracy are key to typing.",
    "Keep calm and type on."
];

let currentQuote = "";
let startTime = null;
let interval = null;

const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const startButton = document.getElementById("startBtn");
const resultDiv = document.getElementById("result");
const wpmDisplay = document.getElementById("wpm");
const charDisplay = document.getElementById("chars");

startButton.addEventListener("click", () => {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerText = currentQuote;
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    resultDiv.innerText = "";
    startTime = new Date().getTime();
    updateStats(); // show WPM 0 and chars 0
    clearInterval(interval);
    interval = setInterval(updateStats, 500);
});

inputField.addEventListener("input", () => {
    updateStats();
    if (inputField.value === currentQuote) {
        clearInterval(interval);
        const timeTaken = (new Date().getTime() - startTime) / 1000;
        const words = currentQuote.trim().split(/\s+/).length;
        const wpm = Math.round((words / timeTaken) * 60);
        resultDiv.innerText = `🚀 Final WPM: ${wpm}`;
        inputField.disabled = true;
    }
});

function updateStats() {
    const typed = inputField.value;
    const charCount = typed.replace(/\s/g, "").length;
    const timeElapsed = (new Date().getTime() - startTime) / 1000;
    const words = typed.trim().split(/\s+/).length;
    const wpm = timeElapsed > 0 ? Math.round((words / timeElapsed) * 60) : 0;

    charDisplay.innerText = `Characters: ${charCount}`;
    wpmDisplay.innerText = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
}