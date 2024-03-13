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

            if(++currentMove ==2) {
                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = [];
                }
                else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[0].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}



for (let i=0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
}

