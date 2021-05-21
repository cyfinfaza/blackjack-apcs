import React from "react";
import * as pageStyle from "./App.module.css";
import Card from "./components/Card/Card";
import {useState} from 'react';

// [
//   {
//     card:"3H",
//     flipped:false,
//   }
// ]

function App() {
  const [dealerCardState, setDealerCardState] = useState([])
  const [playerCardState, setPlayerCardState] = useState([])
  const [directionState, setDirectionState] = useState("no state atm")
  function placeCard(){
    setPlayerCardState([...playerCardState, {
      card:"3H",
      flipped:false,
    }])
    setDirectionState("just added a 3 of hearts");
  }
  return (
    <div className={pageStyle.container}>
      <div className={pageStyle.header}>
        <h1>React Blackjack</h1>
        <div className="buttonPanel">
          <button onClick={() => {
            document.querySelector("body").classList.toggle("theme-light");
          }}>Switch Theme</button>
          <button onClick={()=>setDirectionState("just reset")}>Reset</button>
        </div>
      </div>
      <div className={pageStyle.content}>
        <div className={pageStyle.dealerCards}>
          <div>
            {dealerCardState.map(element=><Card type={element.card} flipped={element.flipped} />)}
          </div>
          {/* <div>
            <Card type="8C" flipped />
          </div> */}
        </div>
        <div className={pageStyle.playerCards}>
          {playerCardState.map(element=><Card type={element.card} flipped={element.flipped} />)}
        </div>
      </div>
      <div className={pageStyle.actionsPanel}>
        <button onClick={placeCard}>
          Click me
        </button>
        <p >
          {directionState}
        </p>
      </div>
    </div>
  );
}

export default App;
