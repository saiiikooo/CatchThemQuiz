const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 3 x 5?',
        choice1: '2',
        choice2: '18',
        choice3: '15',
        choice4: '28',
        answer: 3,
    },
    {
        question: 'What is the fastest mammmal in the world?',
        choice1: 'Cheetah',
        choice2: 'Kangaroo',
        choice3: 'Elephant',
        choice4: 'Horse',
        answer: 1,
    },
    {
        question: 'Whats the deepest ocean in the world?',
        choice1: 'Western Pacific Ocean',
        choice2: 'Indian Ocean',
        choice3: 'Southern Ocean',
        choice4: 'Atlantic Ocean',
        answer: 1,
    },
    {
        question: 'The tallest buidling in the world is located in which city?',
        choice1: 'Shanghai',
        choice2: 'New York',
        choice3: 'Dubai',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'What is the fastest car in the world?',
        choice1: 'Mclaren Speedtail',
        choice2: 'Bugatti Chiron supper',
        choice3: 'SSC Tuatara',
        choice4: 'Ferrari',
        answer: 3,
    },
    {
        question: 'What is the melting point of Iron?',
        choice1: '213c',
        choice2: '1223c',
        choice3: '784c',
        choice4: '1538c',
        answer: 4,
    },
    {
        question: 'What is 3 x 10?',
        choice1: '2',
        choice2: '18',
        choice3: '21',
        choice4: '30',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 7

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')

    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() *availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach (choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()