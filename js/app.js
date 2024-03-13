const totalCards = 12;
let cards =[];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;


let cardTemplate = '<div class="card"> <div class="back"></div><div class="face"></div></div>'

function activate(e) {
    if (currentMove < 2) {
        e.target.classList.add('active');

        if(!selectedCards[0] || selectedCards[0] !== e.target) {
            selectedCards.push(e.target);

            if (++currentMove === 2) {
                const firstCardValue = selectedCards[0].querySelectorAll('.face')[0].innerHTML;
                const secondCardValue = selectedCards[1].querySelectorAll('.face')[0].innerHTML;
                
                if (firstCardValue !== secondCardValue) {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 2000); // Cambio aquí el tiempo de espera a 5 segundos (5000 ms)
                } else {
                    selectedCards = [];
                    currentMove = 0;
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    }
    else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
       rtn = availableCards[value];
    }
    return rtn;
 }

for (let i=0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = valuesUsed[i];
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

// document.getElementById('resetButton').addEventListener('click', resetGame);

// function resetGame() {
//     // Elimina la clase 'active' de todas las cartas
//     document.querySelectorAll('.card').forEach(card => {
//         card.classList.remove('active');
//     });

//     // Reinicia los arrays y las variables utilizadas para el juego
//     selectedCards = [];
//     valuesUsed = [];
//     currentMove = 0;

//     // Vuelve a generar las cartas
//     generateCards();
// }

// // Función para generar las cartas
// function generateCards() {
//     // Código para generar las cartas...
// }