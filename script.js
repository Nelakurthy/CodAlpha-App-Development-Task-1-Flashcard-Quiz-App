const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const scoreEl = document.getElementById('score');
const flashcardForm = document.getElementById('flashcardForm');
const newQuestion = document.getElementById('newQuestion');
const newAnswer = document.getElementById('newAnswer');
const congratsMessage = document.getElementById('congratsMessage');
const endScreen = document.getElementById('endScreen');
const finalScore = document.getElementById('finalScore');
const congratsMessageEnd = document.getElementById('congratsMessageEnd');
const newGameBtn = document.getElementById('newGameBtn');

let flashcards = [];
let currentIndex = 0;
let score = 0;
let totalAttempts = 0;

function loadFlashcard() {
    if (flashcards.length === 0) {
        questionEl.textContent = 'No flashcards available. Add some!';
        answerEl.textContent = '';
        return;
    }
    const flashcardData = flashcards[currentIndex];
    questionEl.textContent = flashcardData.question;
    answerEl.textContent = flashcardData.answer;
    flashcard.classList.remove('flipped');
    congratsMessage.classList.add('hidden');
}

flashcard.addEventListener('click', () => {
    if (flashcards.length === 0) return;
    
    flashcard.classList.toggle('flipped');
    if (flashcard.classList.contains('flipped')) {
        totalAttempts++;
        const userAnswer = prompt('What is your answer?');
        if (answerEl.textContent.trim().toLowerCase() === userAnswer.trim().toLowerCase()) {
            score++;
        }
        updateScore();
        // Automatically move to the next flashcard
        currentIndex = (currentIndex + 1) % flashcards.length;
        setTimeout(loadFlashcard, 1000); // Add a slight delay before loading the next card
        
        // Check if all questions have been answered
        if (currentIndex === 0) {
            showEndScreen();
        }
    }
});

flashcardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newFlashcard = {
        question: newQuestion.value,
        answer: newAnswer.value,
    };
    flashcards.push(newFlashcard);
    newQuestion.value = '';
    newAnswer.value = '';
    if (flashcards.length === 1) loadFlashcard();
});

newGameBtn.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    flashcards = [];
    currentIndex = 0;
    score = 0;
    totalAttempts = 0;
    loadFlashcard();
    updateScore();
    hideEndScreen();
}

function updateScore() {
    scoreEl.textContent = `Score: ${score} / ${totalAttempts}`;
}

function showEndScreen() {
    endScreen.classList.add('active');
    finalScore.textContent = `Final Score: ${score} / ${totalAttempts}`;
    if (score === flashcards.length && totalAttempts === flashcards.length) {
        congratsMessageEnd.classList.remove('hidden');
    }
}

function hideEndScreen() {
    endScreen.classList.remove('active');
}
