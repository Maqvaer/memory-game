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
  
  const cardsContainer = document.createElement("div");
  cardsContainer.setAttribute("class", "cards-container");
  document.body.appendChild(cardsContainer);
  const card = [];
  for(let i = 0; i < icon.length*2; i++){
         card[i] = document.createElement("div");
         card[i].setAttribute("class", "card");
         card[i].appendChild(document.createTextNode('?'));
         cardsContainer.appendChild(card[i]);
  }
        