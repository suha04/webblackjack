//Eltüntetni a search bart telefonon
window.addEventListener("load", function() { window.scrollTo(0, 1); });

// Játék


// szelektorok
let hitGomb = document.getElementById('hit');
let standGomb = document.getElementById('stand');
let dealerCounter = document.querySelector('#dealer');
let playerCounter = document.querySelector('#player');

// modal
var modal = document.getElementsByClassName("modal");
var WinModal = document.getElementById("Win");
var LoseModal = document.getElementById("Lose");
var TieModal = document.getElementById("Tie");
var restartGomb = document.getElementsByClassName("restart");


// Player Deck
let playerter = document.querySelector('#playerter .deck');

// Dealer Deck
let dealerter = document.querySelector('#dealerter .deck');

// Lehetséges kártyák
let cards = [];

// Típusok és értékek
let suits = ['H', 'D', 'C', 'S'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'A', 'Q', 'K'];

// Típus és érték kombinálás
for (let suit of suits) {
  for (let value of values) {
    cards.push({ suit: suit, value: value });
  }
}

// Kártyahúzás és counterfrissítés
function drawCardAndUpdateCounter(counter, deck) {
  let card = document.createElement('div');
  card.classList.add('kartya');
  let randomCard = cards[Math.floor(Math.random() * cards.length)];
  card.style.backgroundImage = 'url(assets/img/kartyak/fronts/'+randomCard.suit + randomCard.value +'.jpg)';
  deck.appendChild(card);

  // Kártya értékek
  let cardValue = randomCard.value;
  switch (cardValue) {
    case 'A':
      if (counter.textContent <= 10) {
        cardValue = 11;
      } else {
        cardValue = 1;
      }
      break;
    case 'J':
    case 'Q':
    case 'K':
      cardValue = 10;
      break;
    default:
      cardValue = parseInt(cardValue);
  }

  counter.textContent = parseInt(counter.textContent) + cardValue;

  console.log(randomCard);
}

//Bust

function bust(counter) {
  if (counter.textContent > 21) {
    console.log('Busted!');
    return true;
  }
  return false;
}


//Player Side

// Kártya hozzáadás
hitGomb.addEventListener('click', function() {
  drawCardAndUpdateCounter(playerCounter, playerter);

  //Bust - Játék veszítve
  bust(playerCounter);

  if (bust(playerCounter)) {
    LoseModal.style.display = "block";
  }


  console.log('A player húz: ' + playerCounter.textContent);
});

//Dealer Side

// Kártya hozzáadás
standGomb.addEventListener('click', function() {
  
    //hidden card törlődik
    let hiddenCard = document.querySelector('#dealerter .deck .kartya#rejtettKartya');
    if (hiddenCard) {
      hiddenCard.remove();
    }

    // Dealer addig húz, amíg 17, vagy az felett nem lesz az érték
  while (parseInt(dealerCounter.textContent) < 17) {
    drawCardAndUpdateCounter(dealerCounter, dealerter);
    


  }

  //Bust - Játék megnyerve
    bust(dealerCounter);

    if (bust(dealerCounter)) {
      WinModal.style.display = "block";
    }


  console.log('A dealer húz: ' + dealerCounter.textContent);
});

// Kezdőkártyák kiosztása
function initializeGame() {
  
  for (let i = 0; i < modal.length; i++) {
    modal[i].style.display = "none";
  }

  // Előzőek törlése
  playerter.innerHTML = '';
  dealerter.innerHTML = '';
  playerCounter.textContent = '0';
  dealerCounter.textContent = '0';

  // Player: Két kártya
  drawCardAndUpdateCounter(playerCounter, playerter);
  drawCardAndUpdateCounter(playerCounter, playerter);

  // Dealer: Két kártya
  drawCardAndUpdateCounter(dealerCounter, dealerter);
  // Rejtett kártya
  let hiddenCard = document.createElement('div');
  hiddenCard.classList.add('kartya');
  hiddenCard.setAttribute('id','rejtettKartya')
  dealerter.appendChild(hiddenCard);
  
}

//Játék vége
function endGame(){
  standGomb.addEventListener('click', function() {
  
    //befejezések
   if(parseInt(playerCounter.textContent) > parseInt(dealerCounter.textContent) && parseInt(playerCounter.textContent) < 22)
   {
    WinModal.style.display = "block";
   }
   if(parseInt(playerCounter.textContent) < parseInt(dealerCounter.textContent) && parseInt(dealerCounter.textContent) < 22)
   {
    LoseModal.style.display = "block";
   }
   if(parseInt(playerCounter.textContent) == parseInt(dealerCounter.textContent) && parseInt(dealerCounter.textContent) < 22)
   {
    TieModal.style.display = "block";
   }
})
};

//Újrakezdés

function restartGame() {
  for (let i = 0; i < restartGomb.length; i++) {
    restartGomb[i].addEventListener('click', initializeGame);
  }
}


initializeGame();
endGame();
restartGame();

