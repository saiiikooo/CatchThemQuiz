const highScoreList = documnet.querySelector ('#highScoreList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTMl = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')