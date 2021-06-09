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
  const [directionState, setDirectionState] = useState("Hit to add card, stay to pass to dealer");
  function getCard() {
    var getCardIndex = Math.floor(Math.random() * possibleCardArray.current.length);
    var cardToAdd = possibleCardArray.current.splice(getCardIndex, 1)[0];
    console.log(possibleCardArray.current);
    console.log(cardToAdd);
    // setDirectionState("just added a " + cardToAdd);
    return cardToAdd;
  }
  const [dealerCardState, setDealerCardState] = useState([]);
  const [playerCardState, setPlayerCardState] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

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

  function getDeckValue(cards, tryNumWithA1 = 0) {
    let sum = 0;
    let numA1s = 0;
    cards.forEach((card) => {
      if (card.card.charAt(0) == "A") {
        numA1s++;
      }
      sum += getCardValue(card.card, numA1s <= tryNumWithA1);
    });
    console.log(numA1s);
    if (sum > 21 && numA1s > tryNumWithA1) return getDeckValue(cards, tryNumWithA1 + 1);
    return sum;
  }

  useEffect(() => {
    const initialDealerDeck = [
      { card: getCard(), flipped: true },
      { card: getCard(), flipped: false },
    ];
    const initialPlayerDeck = [
      { card: getCard(), flipped: false },
      { card: getCard(), flipped: false },
      // { card: 'AH', flipped: false },
      // { card: 'AD', flipped: false },
    ];
    setPlayerCardState(initialPlayerDeck);
    setDealerCardState(initialDealerDeck);
    console.log(getDeckValue(initialDealerDeck));
  }, []);

  useEffect(() => {
    var deckVal = getDeckValue(playerCardState);
    console.log(deckVal);
    if (deckVal > 21) {
      setDirectionState("Player bust! Dealer wins!");
      updateScore("losses");
      setPlayerChoice(false);
    }
  }, [playerCardState]);

  function updateScore(condition) {
    window.localStorage.setItem(condition, (parseInt(window.localStorage.getItem(condition)) || 0) + 1);
  }

  const playerStayed = useRef(false);

  // useEffect(() => {
  //   if(playerStayed.current){

  //   }
  // }, [dealerCardState]);

  function dealerPlays() {
    var dealerTempDeck = dealerCardState;
    console.log(getDeckValue(dealerCardState));
    while (true) {
      var dealerDeckVal = getDeckValue(dealerTempDeck);
      console.log(dealerDeckVal);
      if (dealerDeckVal > 21) {
        setDirectionState("Dealer bust! Player wins!");
        updateScore("wins");
        break;
      } else if (dealerDeckVal >= 17) {
        if (dealerDeckVal > getDeckValue(playerCardState)) {
          setDirectionState("Dealer wins!");
          updateScore("losses");
        } else if (dealerDeckVal === getDeckValue(playerCardState)) {
          setDirectionState("Draw!");
        } else {
          setDirectionState("Dealer loses!");
          updateScore("wins");
        }
        break;
      } else {
        dealerTempDeck = [
          ...dealerCardState,
          {
            card: getCard(),
            flipped: false,
          },
        ];
      }
    }
    setDealerCardState(
      dealerTempDeck.map((elem) => {
        elem.flipped = false;
        return elem;
      })
    );
    setPlayerChoice(false);
  }

  // function hideDealerCards(){
  //   if(isHidden){
  //     return ""
  //   }
  // }

  return (
    <div className={pageStyle.container}>
      <div className={pageStyle.header}>
        <h1>React Blackjack</h1>

        <div className="buttonPanel">
          <button
            onClick={() => {
              window.localStorage.setItem("lightTheme", !document.body.classList.contains("theme-light"));
              document.querySelector("body").classList.toggle("theme-light");
            }}
          >
            Switch Theme
          </button>
        </div>
        <div className={pageStyle.scorePanel}>
          <p>Wins: {window.localStorage.getItem("wins") || 0}</p>
          <p>Losses: {window.localStorage.getItem("losses") || 0}</p>
          <button
            onClick={() => {
              window.localStorage.removeItem("wins");
              window.localStorage.removeItem("losses");
              window.location.reload();
            }}
          >
            reset
          </button>
        </div>
      </div>
      <div className={pageStyle.content}>
        <div className={pageStyle.dealerCards}>
          {/* <div> */}
          {dealerCardState.map((element) => (
            <Card type={element.card} flipped={element.flipped} />
          ))}
          {/* </div> */}
          {/* {<div>{placeDealerCard}</div>} */}
        </div>
        <div className={pageStyle.cardValueMonitor}>
          <p>
            Dealer's deck value: <span>{!isHidden ? "? + " + getDeckValue(dealerCardState.filter((elem) => !elem.flipped)) : getDeckValue(dealerCardState)}</span>
          </p>
          <p>
            Player's deck value: <span>{getDeckValue(playerCardState)}</span>
          </p>
        </div>
        <div className={pageStyle.actionsPanel}>
          <p>{directionState}</p>
          {
            <div style={{ display: "flex", gap: "8px" }}>
              {playerChoice && (
                <>
                  <button
                    className={pageStyle.hoversGreen}
                    onClick={() => {
                      placeCard();
                    }}
                  >
                    Hit
                  </button>
                  <button
                    className={pageStyle.hoversRed}
                    onClick={() => {
                      dealerPlays();
                      setIsHidden(true);
                    }}
                  >
                    Stay
                  </button>
                </>
              )}
              <button onClick={() => window.location.reload()}>Reset</button>
            </div>
          }
        </div>
        <div className={pageStyle.playerCards}>
          {playerCardState.map((element) => (
            <Card type={element.card} flipped={element.flipped} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
