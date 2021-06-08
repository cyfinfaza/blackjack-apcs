import React, { useEffect, useRef, useState } from "react";
import * as pageStyle from "./App.module.css";
import Card from "./components/Card/Card";

// [
//   {
//     card:"3H",
//     flipped:false,
//   }
// ]
const allCards = [
  "AH",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "TH",
  "JH",
  "QH",
  "KH",
  "AC",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "TC",
  "JC",
  "QC",
  "KC",
  "AS",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "TS",
  "JS",
  "QS",
  "KS",
  "AD",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "TD",
  "JD",
  "QD",
  "KD",
];

function App() {
  const possibleCardArray = useRef(allCards);
  const [directionState, setDirectionState] = useState("no state atm");
  const [dealerPlay, setDealerPlay] = useState(0);
  function getCard() {
    var getCardIndex = Math.floor(
      Math.random() * possibleCardArray.current.length
    );
    var cardToAdd = possibleCardArray.current.splice(getCardIndex, 1)[0];
    console.log(possibleCardArray.current);
    console.log(cardToAdd);
    // setDirectionState("just added a " + cardToAdd);
    return cardToAdd;
  }
  /*
  function getFlipped(){
    if(possibleCardArray.length == 52){
      return true;
    }
    return false;
    
  }
  */
  const [dealerCardState, setDealerCardState] = useState([]);
  const [playerCardState, setPlayerCardState] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(true);

  function placeDealerCard(isFlipped = false) {
    setDealerCardState([
      ...dealerCardState,
      {
        card: getCard(),
        flipped: isFlipped,
      },
    ]);
  }

  function placeCard(isFlipped = false) {
    setPlayerCardState([
      ...playerCardState,
      {
        card: getCard(),
        flipped: isFlipped,
      },
    ]);
  }

  function getCardValue(cardType, tryWithA1 = false) {
    const mapping = {
      A: tryWithA1 ? 1 : 11,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      T: 10,
      J: 10,
      Q: 10,
      K: 10,
    };
    return mapping[cardType.charAt(0)];
  }

  function getDeckValue(cards) {
    let sum = 0;
    cards.forEach((card) => (sum += getCardValue(card.card)));
    return sum;
  }

  useEffect(() => {
    const initialDealerDeck = [
      { card: getCard(), flipped: true },
      { card: getCard(), flipped: false },
    ];
    const initialPlayerDeck = [
      { card: getCard(), flipped: false},
      { card: getCard(), flipped: false}
    ]
    setPlayerCardState(initialPlayerDeck);
    setDealerCardState(initialDealerDeck);
    console.log(getDeckValue(initialDealerDeck));
  }, []);

  useEffect(() => {
    var deckVal = getDeckValue(playerCardState);
    console.log(deckVal);
    if (deckVal > 21) {
      setDirectionState("Player bust! Dealer wins!");
      setPlayerChoice(false)
    }
  }, [playerCardState]);

  useEffect(() => {
    var dealerDeckVal = getDeckValue(dealerCardState);
    var gameOver = false;
    console.log(getDeckValue(dealerCardState));
    dealerDeckVal = getDeckValue(dealerCardState);
    //while(gameOver==false){
    if(dealerDeckVal > 21){
      setDirectionState("Dealer bust! Player wins!");
      gameOver=true;
    } else if(dealerDeckVal>getDeckValue(playerCardState)){
      setDirectionState("Dealer wins!");
      gameOver=true;
    } else{
      placeDealerCard(false);
    }
  //ssszxsazWDXQsazWDXQsdfzxsazDXWf sdfxcv } 
  } , [dealerPlay]);


  return (
    <div className={pageStyle.container}>
      <div className={pageStyle.header}>
        <h1>React Blackjack</h1>
        <div className="buttonPanel">
          <button
            onClick={() => {
              document.querySelector("body").classList.toggle("theme-light");
            }}
          >
            Switch Theme
          </button>
          <button onClick={() => window.location.reload()}>Reset</button>
        </div>
      </div>
      <div className={pageStyle.content}>
        <div className={pageStyle.dealerCards}>
          <div>
            {dealerCardState.map((element) => (
              <Card type={element.card} flipped={element.flipped} />
            ))}
          </div>
          {<div>{placeDealerCard}</div>}
        </div>
        <div className={pageStyle.playerCards}>
          {playerCardState.map((element) => (
            <Card type={element.card} flipped={element.flipped} />
          ))}
        </div>
      </div>
      <div className={pageStyle.actionsPanel}>
        <div style={{ display: "flex", gap: "8px" }}>
          {playerChoice &&
            <>
              <button
                onClick={() => {
                  placeCard();
                }}
              >
                Hit
              </button>
              <button
                onClick={() => {
                  setDealerPlay(dealerPlay+1);
                }}
              >
                Stay
              </button>
            </>
          }
        </div>
        <p>{directionState}</p>
      </div>
    </div>
  );
}

export default App;
