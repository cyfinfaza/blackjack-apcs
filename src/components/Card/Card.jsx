import React from "react";
import * as componentStyle from "./card.module.css";
import { ReactSVG } from "react-svg";

export default function Card({ type }) {
  const face = type.charAt(1);
  const colorClass = face == "D" || face == "H" ? "card-red" : "card-black";
  return (
    <div className={componentStyle.cardContainer}>
      <ReactSVG src={"/cards/" + type + ".svg"} className={colorClass} />
    </div>
  );
}
