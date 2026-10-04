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
     let pairCounter = 0;
     let indexFirstCard = null;
     let indexSecondCard = null;
    for(let j = 0; j < icon.length*2; j++){
         cards[j] = document.createElement("div");
         cards[j].setAttribute("class", "card");
         cards[j].appendChild(document.createTextNode('?'));
         cardsContainer.appendChild(cards[j]);
        }
   if(document.querySelector('.footer')) {
     document.querySelector('.footer').remove();
   }
  const footer = document.createElement('footer');
  footer.setAttribute("class", "footer");
  document.body.appendChild(footer);
  const moves = document.createElement('div');
  moves.setAttribute("class", "statistics");
  footer.appendChild(moves);
  const pairs = document.createElement('div');
  pairs.setAttribute("class", "statistics");
  footer.appendChild(pairs);
  const moveText = document.createElement('p');
  moves.appendChild(moveText);
  moveText.textContent = `Число ходов:`;
  const moveCount = document.createElement('p');
  moves.appendChild(moveCount);
  moveCount.textContent = `0`;
  const pairText = document.createElement('p');
  pairs.appendChild(pairText);
  pairText.textContent = `Число пар:`;
  const pairCount = document.createElement('p');
  pairs.appendChild(pairCount);
  pairCount.textContent = `0`;

      cards.forEach((card, index) => {
        cardsIcon[index] = icon[index % icon.length];
      });
      cardsIcon = shuffle(cardsIcon);
      console.log(cardsIcon);
      let cardsCounter = 0;
      cards.forEach((card, index) => {
        cardsShow.forEach((elem) => {
          cards[elem].textContent = cardsIcon[elem];
          cards[elem].classList.add('card-disabled');
        });
         card.addEventListener('click', function() {
          card.classList.add('card-disabled');
          card.textContent = cardsIcon[index];
          cardsCounter++;
          if(cardsCounter === 1){
            indexFirstCard = index;
            // console.log('номер первой карточки: ' + indexFirstCard);
          }
          if(cardsCounter === 2){
            indexSecondCard = index;
            // console.log('номер второй карточки: ' + indexSecondCard);
            moveCounter++;
            moveCount.textContent = `${moveCounter}`;
            // console.log('сделано ходов: ' + moveCounter);
            if (cardsCounter === 2) {
              if(cards[indexFirstCard].textContent === cards[indexSecondCard].textContent){
              pairCounter++;
              if(pairCounter === icon.length){
                // console.log('Все пары найдены!');
                const dialog = document.createElement('dialog');
                dialog.setAttribute('id', 'dialogWin');
                dialog.setAttribute('closedBy', 'any');
                const dialogText = document.createElement('p');
                dialogText.textContent = `Поздравляем! Вы нашли все пары!Сделано ходов: ${moveCounter}`;
                dialog.appendChild(dialogText);
                const buttonContainer = document.createElement('div');
                dialog.appendChild(buttonContainer);
                const dialogButton = document.createElement('button');
                dialogButton.setAttribute('onclick','location.reload()');
                dialogButton.textContent = 'Новая игра';
                buttonContainer.appendChild(dialogButton);
                const dialogButtonClose = document.createElement('button');
                dialogButtonClose.setAttribute('commandfor', 'dialogWin');
                dialogButtonClose.addEventListener('click', () => {
                  dialog.remove();
                });
                dialogButtonClose.textContent = 'Закрыть';
                buttonContainer.appendChild(dialogButtonClose);
                document.body.appendChild(dialog);
                dialog.showModal();
                dialog.addEventListener('keydown', (event) => {
                  if(event.key === 'Escape'){
                    dialog.remove();
                  }
                });
              }
              pairCount.textContent = `${pairCounter}`;
              // console.log(`совпадение, найдено пар: ${pairCounter}`);
              cardsCounter = 0;
              cardsShow.push(indexFirstCard, indexSecondCard);
              cardsShow.forEach((elem) => {
                if(!cards[elem].classList.contains('card-disabled')){
                  cards[elem].classList.add('card-disabled');
                }
               });
            } else if(cards[indexFirstCard].textContent !== cards[indexSecondCard].textContent) {
              // console.log('не совпадение');
              cards.forEach((elmtn) => {
                if(!elmtn.classList.contains('card-disabled')){
                  elmtn.classList.add('card-disabled');
                }
             });
              setTimeout(function() {
                cards[indexFirstCard].textContent = '?';
                cards[indexSecondCard].textContent = '?';
                cards.forEach((elmtn) => {
                  elmtn.classList.remove('card-disabled');
                });
              }, 700);
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


    