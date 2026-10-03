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
     const cards = [];
     let cardsIcon = [];
     let cardsShow = [];
     let moveCounter = 0;
     let indexFirstCard = null;
     let indexSecondCard = null;
    for(let j = 0; j < icon.length*2; j++){
         cards[j] = document.createElement("div");
         cards[j].setAttribute("class", "card");
         cards[j].appendChild(document.createTextNode('?'));
         cardsContainer.appendChild(cards[j]);
        }
      cards.forEach((card, index) => {
        cardsIcon[index] = icon[index % icon.length];
      });
      cardsIcon = shuffle(cardsIcon);
      console.log(cardsIcon);
      let cardsCounter = 0;
      cards.forEach((card, index) => {
        cardsShow.forEach((elem) => {
          cards[elem].textContent = cardsIcon[elem];
        });
        card.addEventListener('click', function() {
          card.textContent = cardsIcon[index];
          cardsCounter++;
          if(cardsCounter === 1){
            indexFirstCard = index;
            console.log('номер первой карточки: ' + indexFirstCard);
          }
          if(cardsCounter === 2){
            indexSecondCard = index;
            console.log('номер второй карточки: ' + indexSecondCard);
            moveCounter++;
            console.log('сделано ходов: ' + moveCounter);
            if (cardsCounter === 2) {
              if(cards[indexFirstCard].textContent === cards[indexSecondCard].textContent){
              console.log('совпадение');
              cardsCounter = 0;
              cardsShow.push(indexFirstCard, indexSecondCard);
            } else if(cards[indexFirstCard].textContent !== cards[indexSecondCard].textContent) {
              console.log('не совпадение');
              setTimeout(function() {
                cards[indexFirstCard].textContent = '?';
                cards[indexSecondCard].textContent = '?';
              }, 1400);
              cardsCounter = 0;
            };
            }
           
          }
         }); 
      }); 
            
}

  document.addEventListener('DOMContentLoaded', createCards());

  document.getElementById('new-game').addEventListener('click', function() {
    const containerIs = document.querySelector('.cards-container');
     if(containerIs){
      containerIs.remove();
      createCards();
     } else{
      createCards();
     }
    });


    