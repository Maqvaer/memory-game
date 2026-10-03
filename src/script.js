  const icon = [
    '🍇',
    '🍉',
    '🍋',
    '🍌',
    '🍍',
    '🍏',
    '🍒',
    '🍓',
  ];

  
  const header = document.createElement('header');
  header.setAttribute("class", "header");
  document.body.appendChild(header);
  const buttonNewGame = document.createElement("button");
  buttonNewGame.setAttribute("class", "button-new-game");
  buttonNewGame.setAttribute("id", "new-game");
  buttonNewGame.appendChild(document.createTextNode('New Game'));
  header.appendChild(buttonNewGame);
 

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

  
function createCards() {
  const cardsContainer = document.createElement("div");
     cardsContainer.setAttribute("class", "cards-container");
     document.body.appendChild(cardsContainer);
     const card = [];
     const cardIcon = shuffle(icon);
     console.log(cardIcon);
    for(let j = 0; j < icon.length*2; j++){
         card[j] = document.createElement("div");
         card[j].setAttribute("class", "card");
         card[j].appendChild(document.createTextNode('?'));
         cardsContainer.appendChild(card[j]);
        }
      card.forEach((card, index) => {
        card.addEventListener('click', function() {
          card.textContent = cardIcon[index % icon.length];
        });
      });
}

  document.getElementById('new-game').addEventListener('click', function() {
    const containerIs = document.querySelector('.cards-container');
     if(containerIs){
      containerIs.remove();
      createCards();
     } else{
      createCards();
     }
    });