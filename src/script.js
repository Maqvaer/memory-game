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
  buttonNewGame.setAttribute("class", "button-game");
  buttonNewGame.setAttribute("id", "new-game");
  buttonNewGame.appendChild(document.createTextNode('Новая игра'));
  header.appendChild(buttonNewGame);
  const buttonWIns = document.createElement("button");
  buttonWIns.setAttribute("class", "button-game");
  buttonWIns.setAttribute("id", "wins");
  buttonWIns.appendChild(document.createTextNode('Таблица лидеров'));
  header.appendChild(buttonWIns);
  let countStorage = JSON.parse(localStorage.getItem('count')) || [];
  let timeStorage = JSON.parse(localStorage.getItem('time')) || [];
   const dialogWins = document.createElement('dialog');
   dialogWins.setAttribute('id','dialogWins');
   dialogWins.setAttribute('closedBy', 'any');
   const dialogWinsTxt = document.createElement('p');
   dialogWinsTxt.textContent = `ТОП-10`;
   dialogWins.appendChild(dialogWinsTxt);
   const dialogWinsTable = document.createElement('table');
   dialogWins.appendChild(dialogWinsTable);
   const dialogWinsDiv = document.createElement('div');
   dialogWins.appendChild(dialogWinsDiv);
   const dialogWinsButtonClose = document.createElement('button');
   dialogWinsButtonClose.textContent = 'Закрыть';
   dialogWinsButtonClose.addEventListener('click', () => {
     dialogWins.close();
   });
   dialogWinsDiv.appendChild(dialogWinsButtonClose);
   document.body.appendChild(dialogWins);

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

                const MAX_LENGTH = 10;
                if(countStorage.length > MAX_LENGTH){
                  countStorage.shift();
                  timeStorage.shift();
                }
                countStorage.push(moveCounter);
                const now = new Date();
                timeStorage.push(now);
                // console.log(countStorage,timeStorage);
                localStorage.setItem('count', JSON.stringify(countStorage));
                localStorage.setItem('time', JSON.stringify(timeStorage));

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
                dialogButton.textContent = 'Играть заново';
                buttonContainer.appendChild(dialogButton);
                const dialogButtonClose = document.createElement('button');
                dialogButtonClose.setAttribute('autofocus', 'autofocus');
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


   document.getElementById('wins').addEventListener('click', function() {
   document.getElementById('dialogWins').showModal();
   let count = JSON.parse(localStorage.getItem("count"));
   const time = JSON.parse(localStorage.getItem("time"));
   let timeDate = [];
   time.forEach((t) => {
     timeDate.push(new Date(t));
   });
    const tableValue = count.map((count, index) => ({
      key: count,
      value: timeDate[index]
   }));
   tableValue.sort((a,b) => a.key - b.key);
   if(count.length > 0 && document.getElementsByTagName('tr').length === 0){
    const trHeader = document.createElement('tr');
    const thWin = document.createElement('th');
    const thCount = document.createElement('th');
    const thTime = document.createElement('th');
    thWin.textContent = 'Место';
    thCount.textContent = 'Сделано ходов';
    thTime.textContent = 'Дата';
    trHeader.appendChild(thWin);
    trHeader.appendChild(thCount);
    trHeader.appendChild(thTime);
    dialogWinsTable.appendChild(trHeader);
        for(let i = 0; i < tableValue.length; i++){
          const row = document.createElement('tr');
          const cellWin = document.createElement('td');
          const cellCount = document.createElement('td');
          const cellTime = document.createElement('td');
          cellWin.textContent = i + 1;
          cellCount.textContent = tableValue[i].key;
          cellTime.textContent = `${tableValue[i].value.getDate()}.${tableValue[i].value.getMonth()}.${tableValue[i].value.getFullYear()}`;
          row.appendChild(cellWin);
          row.appendChild(cellCount);
          row.appendChild(cellTime);
          dialogWinsTable.appendChild(row);
          // console.log(`Count: ${tableValue[i].key}, timeDate: ${tableValue[i].value.getDate()}.${tableValue[i].value.getMonth()}.${tableValue[i].value.getFullYear()}`);
        }
   } else if(count.length === 0){
     const noDataRow = document.createElement('tr');
     const noDataCell = document.createElement('td');
     noDataCell.setAttribute('colspan', '3');
     noDataCell.textContent = 'Пока нет данных';
     noDataRow.appendChild(noDataCell);
     dialogWinsTable.appendChild(noDataRow);
   } 
   });
    