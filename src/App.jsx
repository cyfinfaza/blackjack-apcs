import React from "react";
import * as pageStyle from "./App.module.css";
import Card from "./components/Card/Card";

function App() {
  return (
    <div className={pageStyle.container}>
      <div className={pageStyle.header}>
        <h1>React Blackjack</h1>
        <div className="buttonPanel">
          <button>Switch Theme</button>
          <button>Reset</button>
        </div>
      </div>
      <div className={pageStyle.content}>
        <Card type="JH" />
        <Card type="KH" />
      </div>
      <div className={pageStyle.actionsPanel}>
        <button
          onClick={() => {
            document.querySelector("body").classList.toggle("theme-light");
          }}
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;
