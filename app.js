//
//Blackjack game in Javascript
//

//Cards
let values = ["Ace","Two","Three","Four","Five","Six","Seven",
            "Eight","Nine","Ten","Jack","Queen","King"];
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"];

//DOM variables
let textArea = document.getElementById('text-area');
let newGamebutton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//Deck Creation
function createDeck(){
    let deck = []
    for (let i = 0 ; i < suits.length;i++){
        for(let p = 0; p<values.length ;p++){
            let card = {
                suit : suits[i],
                value : values[p]
            }
            deck.push(card);
        }
    }
    return deck;
}


//Get Cards
function getNextCard (){
    return deck.shift();
}
function getCardString(card){
    return card.value + ' of ' + card.suit;
}



hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGamebutton.addEventListener("click",function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    //Deck creation and shuffeling
    deck = createDeck();
    // console.table(deck);
    shuffleDeck(deck);
    // console.table(deck);


    playerCards = [ getNextCard() , getNextCard() ];
    dealerCards = [ getNextCard() , getNextCard() ];

    // console.table(deck)

    textArea.innerText='Started...';
    newGamebutton.style.display='none'
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
    
},false);

hitButton.addEventListener('click',function(){
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus()
},false);
stayButton.addEventListener('click',function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus()
},false);


function showStatus(){
    if(!gameStarted){
        textArea.innerText='Welcome to blackjack';
        return;
    }
    let dealerCardString = '';
    for(let i = 0; i < dealerCards.length ; i++){
        dealerCardString += getCardString(dealerCards[i])+'\n' ;  
    }
    let playerCardString = '';
    for(let i = 0; i < playerCards.length ; i++){
        playerCardString += getCardString(playerCards[i])+'\n' ;  
    }

    updateScores();

    checkBlackJack();

    textArea.innerText = 
    'Dealer\'s hand: \n' + 
    dealerCardString + 
    'score: ('+ dealerScore +')\n\n' +
    'Player\'s hand: \n' + 
    playerCardString + 
    'score: ('+ playerScore +')\n\n';

    if(gameOver){
    if(playerWon){
        textArea.innerText += 'PLAYER WINS';
    }else{
        textArea.innerText += 'DEALER WINS'
        }
        newGamebutton.style.display='inline'
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }

}

function shuffleDeck(deck){
    for (let i = 0 ; i<deck.length; i++){
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }
}

function updateScores(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for (let i = 0; i<cardArray.length;i++){
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace'){
            hasAce = true;
        }
    }
    if(hasAce && score+10 <= 21){
        return score+=10;
    }
    return score;
}

function getCardNumericValue(card){
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function checkForEndOfGame(){
   updateScores();

   if(gameOver){
       while (dealerScore <= 21 && playerScore<=21 && dealerScore < playerScore) {
           dealerCards.push(getNextCard());
           updateScores();
       }
   }

   if(playerScore > 21){
       playerWon = false;
       gameOver = true;
   }
   else if(dealerScore > 21){
       playerWon = true;
       gameOver=true;
   }
   else if (gameOver){
       if (playerScore > dealerScore){
           playerWon = true;
       }else{
           playerWon = false;
       }
   }
}

function checkBlackJack(){
    if(playerScore === 21){
        gameOver = true;
        playerWon = true;
    }
}