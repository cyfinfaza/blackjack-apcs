import React from "react";
import * as componentStyle from "./card.module.css";
import { ReactSVG } from "react-svg";

export default function Card({ type, flipped=false }) {
  const face = type.charAt(1);
  const colorClass = face === "D" || face === "H" ? "card-red" : "card-black";
  if(flipped) type = "1B";
  return (
    <div className={componentStyle.cardContainer}>
      <ReactSVG src={"/cards/" + type + ".svg"} className={colorClass} />
    </div>
  );
}
