const totalCards = 14;const availableCards = [
    '<img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript">',
    '<img src="https://img.icons8.com/color/48/000000/c-sharp-logo.png" alt="C#">',
    '<img src="https://img.icons8.com/color/48/000000/typescript.png" alt="TypeScript">',
    '<img src="https://img.icons8.com/color/48/000000/bootstrap.png" alt="Bootstrap">',
    '<img src="https://img.icons8.com/color/48/000000/css3.png" alt="CSS">',
    '<img src="https://img.icons8.com/color/48/000000/html-5.png" alt="HTML">',
    '<img src="https://img.icons8.com/color/48/000000/sql.png" alt="SQL">'
];

let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

const activate = (e) => {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                // Verifica si las dos cartas seleccionadas son iguales
                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    // Son iguales, reiniciar el movimiento sin aumentar los intentos
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    // Son diferentes, aumenta el contador de intentos
                    currentAttempts++;
                    document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';
                    
                    // Voltear las cartas nuevamente después de un corto periodo
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

const resetGame = () => {
   // Reiniciar variables
   selectedCards = [];
   valuesUsed = [];
   currentMove = 0;
   currentAttempts = 0;
   document.querySelector('#stats').innerHTML = '0 intentos';

   // Reorganizar el orden de las cartas
   let gameContainer = document.querySelector('#game');
   while (gameContainer.firstChild) {
       gameContainer.removeChild(gameContainer.firstChild);
   }
   cards = [];
   for (let i = 0; i < totalCards; i++) {
       let div = document.createElement('div');
       div.innerHTML = cardTemplate;
       cards.push(div);
       randomValue();
       cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
       gameContainer.appendChild(cards[i]);
       cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
   }
}

const randomValue = () => {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

const getFaceValue = (value) => {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

// Agregar un oyente de eventos al botón de reinicio
document.getElementById('resetButton').addEventListener('click', resetGame);
cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);


const redireccionar = () => {
    window.location.href = "https://desarrollowebjaviermedina.netlify.app/";
}
