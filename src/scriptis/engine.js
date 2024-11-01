const emojis = ["😶‍🌫️", "😶‍🌫️", "😱", "😱", "🤓", "🤓", "🥸", "🥸", "🤠", "🤠", "🥳", "🥳", "🥵", "🥵", "😡", "😡"] // guardar os emojis
let openCards = [] //guardar os elementos que foram abertos

const timeLeft = document.querySelector('#time-left')
let currentTime = 60
let countDownTimer = setInterval(countDown, 1000)

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime <= 0) {
        alert(`Game Over! Sua pontuação foi ${(document.querySelectorAll('.boxMatch').length) / 2}`)
        window.location.reload()
    }
}

//ordenar o vetor aleatoriamente
//se o numero gerado por Math.random() for maior que 0.5 ele dara o peso de 2 ao elemento que vai ser ordenado, senão o peso de -1
//assim ficará ordenando aleatoriamente o vetor
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1))

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div")
    box.className = 'item'
    box.innerHTML = shuffleEmojis[i]
    box.onclick = handleClick
    document.querySelector('.game').appendChild(box)
}

function handleClick() {
    //abrir uma carta
    if (openCards.length < 2) { // executa apenas se tiver no maximo 2 cartas abertas
        this.classList.add('boxOpen')
        openCards.push(this)
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500) //define um delay na chamada da função
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add('boxMatch')
        openCards[1].classList.add('boxMatch')
    } else {
        openCards[0].classList.remove('boxOpen')
        openCards[1].classList.remove('boxOpen')
    }
    openCards = []

    if (document.querySelectorAll('.boxMatch').length == emojis.length) {
        alert('voce ganhou')
    }
}